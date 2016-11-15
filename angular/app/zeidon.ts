import { Headers, Http, RequestOptions } from '@angular/http';
import { OpaqueToken } from '@angular/core';
import { Injectable, Inject }    from '@angular/core';
import { Observable } from 'rxjs/Observable';

let configurationInstance: ZeidonConfiguration = undefined;

export class Application {
    lodDefs : Object;

    constructor( lodDefs: Object ) {
        this.lodDefs = lodDefs;
    }
}

export class ObjectInstance {
    protected roots : EntityArray<EntityInstance>;
    public isUpdated = false;

    constructor( initialize = undefined, options: CreateOptions = DEFAULT_CREATE_OPTIONS ) {
        this.createFromJson( initialize, options );
    }

    protected rootEntityName(): string { throw "rootEntityName must be overridden" };
    public getPrototype( entityName: string ): any { throw "getPrototype must be overriden" };
    public getLodDef(): any { throw "getLodDef must be overridden" };
    public getApplicationName(): String { throw "getApplicationName must be overriden" };

    public toJSON(): Object {
        console.log("JSON for Configuration OI" );

        let jarray = []; 
        for ( let root of this.roots.allEntities() ) {
            jarray.push( root.toJSON() );
        };

        let json = {};
        json[ this.rootEntityName() ] = jarray;
        return json;
    }

    /**
     * Wrap the JSON for this object with Zeidon OI meta.  Used for committing.
     */
    toZeidonMeta() : Object {
        let wrapper = {
            ".meta": { version: "1" },
            OIs : [ {
                ".oimeta": {
                    application: this.getApplicationName(),
                    odName: this.getLodDef().name,
                    incremental: true,
                    readOnlyOi: false
                }
            }]

        };

        // Add the OI.
        wrapper.OIs[0][ this.getLodDef().name ] = this.toJSON()[this.getLodDef().name ];

        return wrapper;
    }

    public static activateOi<T extends ObjectInstance>( oi: T, options?: ActivateOptions ): Observable<T> {
        let config = configurationInstance;
        if ( ! config )
            error( "ZeidonConfiguration not properly initiated.")

        return config.getActivator().activateOi( oi, options );
    }

    public commit( options?: CommitOptions ): Observable<this> {
        let config = configurationInstance;
        if ( ! config )
            error( "ZeidonConfiguration not properly initiated.")

        return config.getCommitter().commitOi( this, options ) as Observable<this>;
    }

    public get isEmpty(): boolean {
        return this.roots.length == 0;
    }

    createFromJson( initialize, options: CreateOptions = DEFAULT_CREATE_OPTIONS ): this {
        if ( typeof initialize == "string" ) {
            initialize = JSON.parse( initialize );
        }

        this.roots = new EntityArray<EntityInstance>( this.rootEntityName(), this, undefined );
        if ( ! initialize ) {
            return this;
        }
        else
        if ( initialize.OIs ) {
            // TODO: Someday we should handle multiple return OIs for for now
            // we'll assume just one and hardcode '[0]'.
             let oimeta = initialize.OIs[0][ ".oimeta" ];

             // If incrementals are set then set the constructor option to 
             // not set the update flag when the attribute value is set.  The
             // flags will be set by the incrementals.
             if ( oimeta && oimeta.incremental ) {
                 if ( options.incrementalsSpecified == undefined ) {
                     // We're going to change the options so create a new one so we
                     // don't override the original one.
                     options = options.clone();
                     options.incrementalsSpecified = true;
                 }
             }

            let root = initialize.OIs[0][ this.rootEntityName() ];
            if ( root ) {
                for ( let i of initialize.OIs[0][ this.rootEntityName() ] ) {
                    this.roots.create( i, options );
                }
            }
        } else
        if ( initialize.constructor === Array ) {
            for ( let i of initialize ) {
                this.roots.create( i, options );
            }
        } else {
            this.roots.create( initialize, options );
        }

        return this;
    }
    
    handleActivateError( e ) {
        console.log("There was an error: " + e );
    }
}

class EiMetaFlags {
    incomplete?: boolean;
}

export class EntityInstance {
    public oi: ObjectInstance; // Parent OI.
    public created = false;
    public included = false;
    public deleted = false;
    public excluded = false;
    public updated = false;

    public attributes: any = {};
    public workAttributes: any = {};

    public metaFlags: EiMetaFlags = {};

    // If incomplete = true then this entity did not have all its children
    // loaded and so cannot be deleted.
    private incomplete = false;

    // Map of child entities and the array associated with each one.
    // Key: entityName
    // Value: EntityArray.
    private childEntityInstances = {};

    // This is the EntityArray of the parent EI that stores 'this'.
    private parentArray: EntityArray<EntityInstance>;

    public get entityName(): string { throw "entityName() but be overridden" };
    public get entityDef(): any { return this.oi.getLodDef().entities[ this.entityName ];}
    public get attributeDefs(): Object { return this.entityDef.attributes; }

    constructor( initialize:  Object, 
                 oi:          ObjectInstance, 
                 parentArray: EntityArray<EntityInstance>, 
                 options:     CreateOptions = DEFAULT_CREATE_OPTIONS ) {                     
        this.oi = oi;
        this.parentArray = parentArray;

        for ( let attr in initialize ) {
            if ( this.attributeDefs[attr] ) {
                this.setAttribute( attr, initialize[attr], options);
                continue;
            }

            if ( this.entityDef.childEntities[attr] ) {
                let init = initialize[attr];
                if ( ! ( init.constructor === Array ) ) {
                    init = [ init ];  // If it's not an array, wrap it.
                }
                for ( let o of init ) {
                    let array = this.getChildEntityArray( attr );
                    array.create( o, options );
                }
                continue;
            }

            if ( attr == ".meta" ) {
                this.metaFlags = initialize[attr];
                continue;
            }

            if ( attr.startsWith(".") ) {
                let metaName = attr.substr(1); // Remove leading "."
                if ( this.attributeDefs[metaName] ) {
                    let attribs = this.getAttribHash( metaName );
                    attribs[ attr ] = initialize[ attr ];
                    continue;
                }
            }

            error( `Unknown attribute ${attr} for entity ${this.entityName}` );
        }

        if ( ! options.incrementalsSpecified )
            this.setDefaultAttributeValues();
    }

    private setDefaultAttributeValues() {
        let entityDef = this.entityDef;
        if ( ! entityDef.hasInit )
            return;

        for ( let attributeDef of entityDef.attributes ) {
            if ( ! attributeDef.initialValue )
                continue;

            // If the attribute is already set, skip it.
            if ( this.getAttribute( attributeDef.name ) != undefined )
                continue;

            this.setAttribute( attributeDef.name, attributeDef.initialValue );
        }

    }

    protected setAttribute( attr: string, value: any, options: CreateOptions = DEFAULT_CREATE_OPTIONS ) {
    //    console.log( `Setting attribute ${attr}`)
        let attributeDef = this.attributeDefs[ attr ];

        if ( ! attributeDef )
            error( `Attribute ${attr} is unknown for entity ${this.entityDef.name}` );

        // Perform some validations unless incrementals are specified.
        if ( ! options.incrementalsSpecified ) {
            if ( ! attributeDef.update )
                error( `Attribute ${this.entityDef.name}.${attr} is read only` );

            if ( this.deleted || this.excluded )
                error( `Can't set attribute for hidden EntityInstance: ${this.entityDef.name}.${attr}` );
        }

        let attribs = this.getAttribHash( attr );

        if ( attribs[ attr ] == value )
            return;

        attribs[ attr ] = value;

        if ( options.incrementalsSpecified )
            return;

        let metaAttr = "." + attr;
        if ( ! attribs[ metaAttr ] )
            attribs[ metaAttr ] = {} as any;

        attribs[ metaAttr ].updated = true;
        this.oi.isUpdated = true;
        this.updated = true;
    }

    protected getAttribute( attr: string ): any {
        let attribs = this.getAttribHash( attr );
        return attribs[attr];
    }

    public isAttributeUpdated( attr: string ): boolean {
        let attribs = this.getAttribHash( attr );
        let metaName = "." + attr;
        return ( attribs[metaName ] && attribs[metaName].updated );
    }

    private getAttribHash( attr: string ): any {
        // TODO: This should return attributes or workAttributes.
        let attributeDef = this.attributeDefs[ attr ];
        if ( attributeDef.persistent )
            return this.attributes;
        else
            return this.workAttributes;
    }

    getChildEntityArray( entityName: string): EntityArray<this> {
        let entities = this.childEntityInstances[ entityName ];
        if ( entities == undefined ) {
            entities = new EntityArray<EntityInstance>( entityName, this.oi, this );
            this.childEntityInstances[ entityName ] = entities;
        }

        return entities;
    }

    public delete() {
        let idx = this.parentArray.findIndex( ei => ei === this );
        this.parentArray.delete( idx );
    }

    public drop() {
        let idx = this.parentArray.findIndex( ei => ei === this );
        this.parentArray.drop( idx );
    }

    public parentEntityInstance(): EntityInstance {
        return this.parentArray.parentEi;
    }

    private buildIncrementalStr(): string {
        let str = "";

        if ( this.updated )
            str += 'U';

        if ( this.created )
            str += 'C';

        if ( this.deleted )
            str += 'D';

        if ( this.included )
            str += 'I';

        if ( this.excluded )
            str += 'X';

        return str;
    }

    public toJSON(): Object {
        let json = {};

        let meta = {} as any;
        let incrementals = this.buildIncrementalStr();
        if ( incrementals != "" )
            meta.incrementals = incrementals;

        if ( Object.keys( meta ).length > 0 )
            json[ ".meta" ] = meta;

        for ( let attrName in this.attributeDefs ) {
            if ( this.getAttribute( attrName ) != undefined || this.isAttributeUpdated( attrName ) ) {
                json[attrName] = this.getAttribute( attrName );
                if (this.isAttributeUpdated( attrName ) ) {
                    json["." + attrName] = { updated: true };
                }
            }
        };

        for ( let entityName in this.entityDef.childEntities ) {
            console.log("json entity = " + entityName );
            let entities = this.getChildEntityArray( entityName ).allEntities(); 
            if ( entities.length == 0 )
                continue;

            let entityInfo = this.entityDef.childEntities[ entityName ];
            if ( entityInfo.cardMax == 1 ) {
                json[ entityName ] =  entities[0].toJSON();
            } else {
                json[ entityName ] = entities.map( ei => ei.toJSON() );
            }
        }

        return json;
    }
};

/**
 * Array<T> is one of the few classes we can't directly extend so we have to create
 * a delegate class that handles all the real work.  We'll set the appropriate function
 * names when we construct EntityArray<T>.
 * 
 * See https://github.com/Microsoft/TypeScript/issues/12013 for more.
 */
class ArrayDelegate<T extends EntityInstance> {
    hiddenEntities : Array<T>;
    entityName: string;
    oi : ObjectInstance;
    currentlySelected;
    parentEi: EntityInstance;
    array: Array<T>;

    constructor( array: Array<T>, entityName: string, oi: ObjectInstance, parentEi: EntityInstance ) {
        this.entityName = entityName;
        this.oi = oi;
        this.parentEi = parentEi;
        this.array = array;
        this.currentlySelected = 0;
    }
    
    private get entityDef() { return this.oi.getLodDef().entities[ this.entityName ]; }

    create( initialize : Object = {}, options: CreateOptions = DEFAULT_CREATE_OPTIONS ): EntityInstance {
    //    console.log("Creating entity " + this.entityName );
        let ei = Object.create( this.oi.getPrototype( this.entityName ) );
        ei.constructor.apply(ei, [ initialize, this.oi, this.array, options] );
        this.array.push(ei);
        this.currentlySelected = this.array.length - 1;
        return ei;
    }

    private validateExclude( index? : number ) {
        if ( ! this.entityDef.excludable )
            error( `Entity ${this.entityDef.name} does not have exclude authority.` );

    }

    excludeAll() {
        this.validateExclude();
        if ( this.array.length == 0 )
            return;

        this.hiddenEntities = this.hiddenEntities.concat( this.array );
        for ( let ei of this.array )
            (<any>ei).excluded = true;

        this.oi.isUpdated = true;
        this.array.length = 0;
    }

    private validateDelete( index? : number ) {
        if ( ! this.entityDef.deletable )
            error( `Entity ${this.entityDef.name} does not have delete authority.` );

        let list = index ? [ this.array[index] ] : this.array;
        for ( let ei of list ) {
            if ( ei.metaFlags.incomplete )
                error( `Entity ${this.entityDef.name} is incomplete and cannot be deleted.` )
        }        
    }

    deleteAll() {
        this.validateDelete();
        if ( this.array.length == 0 )
            return;

        this.hiddenEntities = this.hiddenEntities.concat( this.array );
        for ( let ei of this.array )
            this.deleteEntity( ei );

        this.array.length = 0;
    }

    delete( index? : number ) {
        if ( index == undefined )
            index = this.currentlySelected;

        this.validateDelete( index );

        if ( ! this.hiddenEntities )
            this.hiddenEntities = new Array<T>();

        let ei = this.array.splice( index, 1 )[0];
        this.hiddenEntities.push( ei );

        this.deleteEntity( ei as any );
    }

    drop( index? : number ) {
        if ( index == undefined )
            index = this.currentlySelected;

        let ei = this.array.splice( index, 1 )[0];
        ei.deleted = true;
        while( ei = ei.parentEntityInstance() as T ) {
            ei.metaFlags.incomplete = true;
        }
    }

    private deleteEntity ( ei: EntityInstance ) {
        ei.deleted = true;
        ei.oi.isUpdated = true;
        let entityDef = ei.entityDef;
        for ( let child of entityDef.childEntities ) {
            if ( child.parentDelete )
                ei.getChildEntityArray( entityDef.name ).deleteAll();
            else
                ei.getChildEntityArray( entityDef.name ).excludeAll();
        }
    }

    selected(): EntityInstance {
        return this.array[this.currentlySelected];
    }

    /**
     * Returns all entity instances, including hidden ones.
     */
    allEntities(): Array<EntityInstance> {
        let ret = [];
        for ( let ei of this.array )
            ret.push( ei );
        if ( this.hiddenEntities ) {
            for ( let ei of this.hiddenEntities )
                ret.push( ei );
        }

        return ret;
    }
}

export class EntityArray<T extends EntityInstance> extends Array<T> {
    delegate: ArrayDelegate<T>;
    parentEi: EntityInstance;

    constructor( entityName: string, oi: ObjectInstance, parentEi: EntityInstance ) {
        const _arr: EntityArray<T> = <any>super();

        // See comment starting ArrayDelegate for why we do this.
        this.delegate = new ArrayDelegate( _arr, entityName, oi, parentEi );

        Object.defineProperty(_arr, 'parentEi', {
            get: () => parentEi,
            enumerable: true,
            configurable: true
        });

        // Add all the functions to EntityArray.
        _arr.create = function( initialize : Object = {}, options: CreateOptions = DEFAULT_CREATE_OPTIONS ): EntityInstance {
            return this.delegate.create( initialize, options );
        }
        _arr.excludeAll = function() { this.delegate.excludeAll(); };
        _arr.deleteAll = function() { this.delegate.deleteAll(); };
        _arr.drop = function() { this.delegate.drop(); };
        _arr.selected = function() { return this.delegate.selected(); };
        _arr.allEntities = function() { return this.delegate.allEntities(); };

        return _arr;
    }

    /** 
     * Create an entity at the end of the current entity list.
     */
    create: ( initialize : Object, options: CreateOptions ) => EntityInstance;
    excludeAll: () => void;
    deleteAll: () => void;
    delete: ( index? : number ) => void;
    drop: ( index? : number ) => void;
    selected: () => EntityInstance;

    /**
     * Returns all entity instances, including hidden ones.
     */
    allEntities: () => Array<EntityInstance>;
}

class OptionsConstructor {
    constructor( initialize = undefined ) {
        for ( let i in initialize ) {
            this[i] = initialize[i];
        }
    }

    public toString(): string {
        return JSON.stringify( this );
    }

    // Quick and easy way to create a new instance of options with same values.
    public clone() : this {
        let proto = Object.getPrototypeOf( this );
        let options = Object.create( proto );
        options.constructor.apply(options, [ this ] );
        return options;
    }
}

export class CreateOptions extends OptionsConstructor {
    incrementalsSpecified? : boolean = undefined;
    readOnlyOi? : boolean = false;
}
const DEFAULT_CREATE_OPTIONS = new CreateOptions( { incrementalsSpecified: false, readOnlyOi: false } );

@Injectable()
export class Activator {
    activateOi<T extends ObjectInstance>( oi: T, options?: ActivateOptions ): Observable<T> {
        throw "activateOi has not been implemented"
    }

    // Error handler called if there is an error.
    errorHandler?: (error:any) => void;
}

@Injectable()
export class Committer {
    commitOi( oi: ObjectInstance, options?: CommitOptions ): Observable<ObjectInstance>{
        throw "commitOi has not been implemented"
    }

    // Error handler called if there is an error.
    errorHandler?: (error:any) => void;
}

@Injectable()
export class ZeidonConfiguration {
    constructor( private activator: Activator, private committer: Committer ) {
        // Set the private global variable to this configuration.
        configurationInstance = this;
    }

    getActivator() : Activator { return this.activator; }
    getCommitter() : Committer { return this.committer; }
}

export class CommitOptions extends OptionsConstructor {
}

export class ActivateOptions extends OptionsConstructor {
    // If specified, then the OI will be activated using this root ID.
    id?: any;

    // If true then only load the roots.  If undefined then it assumed to be
    // true if there is no qualification.
    rootOnly? : boolean;
}

let error = function ( message: string ) {
   var e = new Error('dummy');
   var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
      .replace(/^\s+at\s+/gm, '')
      .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
      .split('\n');
    console.log(stack.join("\n"));

    console.log( message );
    //alert( message );
    throw message;
}
