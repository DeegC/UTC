import { Headers, Http, RequestOptions } from '@angular/http';
import { OpaqueToken } from '@angular/core';
import { Injectable, Inject }    from '@angular/core';
import { Observable } from 'rxjs/Observable';

let configurationInstance: ZeidonConfiguration = undefined;

/**
 * Keeps track of the current EI fingerprint.  The fingerprint is used to differentiate between
 * EIs that don't (yet) have a key.
 */
let entityInstanceFingerprintCount = 0;

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
    public getDomain( name: string ): Domain { throw "getDomain() must be overriden" };

    public getDomainFunctions( name: string ): any {
        // Can be overwritten but not necessary.
        return undefined;
    }

    // Saves the options used to activate this OI.
    private activateOptions: any;

    public toJSON( options : ZeidonToJsonOptions = {} ): Object {
        let jarray = [];
        for ( let root of this.roots.allEntities() ) {
            // TODO: can't use forCommit yet because the OI that comes back doesn't have
            // the missing entities.  We can't use forCommit until we implement a merge.
            // If forCommit is true, only write updated entities.
            // if ( ! options.forCommit || root.childUpdated )
                jarray.push( root.toJSON( options ) );
        };

        let json = {};
        json[ this.rootEntityName() ] = jarray;
        return json;
    }

    get root(): EntityArray<EntityInstance> {
        return this.roots as EntityArray<EntityInstance>;
    }

    public logOi() {
        console.log( JSON.stringify( this, null, 2) );
    }

    /**
     * Wrap the JSON for this object with Zeidon OI meta.  Used for committing.
     */
    toZeidonMeta( options? : CommitOptions ) : Object {
        options = options || { meta: true, forCommit: true };

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
        let oi = this.toJSON( options );
        let root = oi[this.getLodDef().name ];
        wrapper.OIs[0][ this.getLodDef().name ] = root;

        return wrapper;
    }

    public static activateOi<T extends ObjectInstance>( oi: T, options?: any ): Observable<T> {
        let config = configurationInstance;
        if ( ! config )
            error( "ZeidonConfiguration not properly initiated.")

        oi.activateOptions = options;
        return config.getActivator().activateOi( oi, options );
    }

    public commit( options?: CommitOptions ): Observable<this> {
        let config = configurationInstance;
        if ( ! config )
            error( "ZeidonConfiguration not properly initiated.")

        return config.getCommitter().commitOi( this, options ) as Observable<this>;
    }

    /**
     * Reset this OI so that's empty.
     */
    public reset() {
        this.roots = new EntityArray<EntityInstance>( this.rootEntityName(), this, undefined );
        this.isUpdated = false;
    }

    public reload(): Observable<this> {
        this.reset();
        let obs = ObjectInstance.activateOi( this, this.activateOptions );
        obs.toPromise();
        return obs;
    }

    public get isEmpty(): boolean {
        return this.roots.length === 0;
    }

    createFromJson( initialize, options: CreateOptions = DEFAULT_CREATE_OPTIONS ): this {
        if ( typeof initialize == "string" ) {
            initialize = JSON.parse( initialize );
        }

        this.reset();
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
                 if ( options.incrementalsSpecified === undefined ) {
                     // We're going to change the options so create a new one so we
                     // don't override the original one.
                     options = Object.assign( {}, options );
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
        } else
        if ( initialize[ this.rootEntityName() ] && initialize[ this.rootEntityName() ].constructor === Array ) {
            for ( let i of initialize[ this.rootEntityName() ] ) {
                this.roots.create( i, options );
            }
        } else
        if ( initialize != {} ) {
            // Ignore version for now.
            delete initialize.version;
            this.roots.create( initialize, options );
        }

        return this;
    }

    handleActivateError( e ) {
        console.log("There was an error: " + e );
    }
}

class Incrementals {
    created = false;
    included = false;
    deleted = false;
    excluded = false;
    updated = false;
}

export class EntityInstance {
    public oi: ObjectInstance; // Parent OI.
    private incrementals = new Incrementals();
    public childUpdated = false;  // True if this entity or one of its children is updated.

    public get created() { return this.incrementals.created };
    public get deleted() { return this.incrementals.deleted };
    public get included() { return this.incrementals.included };
    public get excluded() { return this.incrementals.excluded };
    public get updated() { return this.incrementals.updated };

    private setIncremental( v: boolean, flag: string ) {
        if ( v && ! this.incrementals[ flag ] ) {
            this.oi.isUpdated = true;
            this.childUpdated = true;
            for ( let parent = this.parentEntityInstance(); parent; parent = parent.parentEntityInstance() ) {
                parent.childUpdated = true;
            }
        }

        this.incrementals[ flag ] = v;
    }

    public set created( v: boolean ) { this.setIncremental( v, "created" ) }
    public set deleted( v: boolean ) { this.setIncremental( v, "deleted" ) }
    public set included( v: boolean ) { this.setIncremental( v, "included" ) }
    public set excluded( v: boolean ) { this.setIncremental( v, "excluded" ) }
    public set updated( v: boolean ) { this.setIncremental( v, "updated" ) }

    public attributes: any = {};
    public workAttributes: any = {};

    public validateErrors: any = {};

    // If incomplete = true then this entity did not have all its children
    // loaded and so cannot be deleted.
    public incomplete = false;

    // A value that can be used to compare EIs that don't have a key.
    public readonly fingerprint = String( entityInstanceFingerprintCount++ );

    // Map of child entities and the array associated with each one.
    // Key: entityName
    // Value: EntityArray.
    private childEntityInstances = {};

    // This is the EntityArray of the parent EI that stores 'this'.
    private parentArray: EntityArray<EntityInstance>;

    public get entityName(): string { throw "entityName() but be overridden" };
    public get entityDef(): any { return this.oi.getLodDef().entities[ this.entityName ];}
    public getAttributeDef( attributeName: string ): any {
        let attributeDef = this.entityDef.attributes[ attributeName ];
        if ( ! attributeDef )
            return undefined;

        if ( ! attributeDef.domain ) {
            let domain = this.oi.getDomain( attributeDef.domainName );
            if ( domain ) {
                attributeDef.domain = domain;
                if ( ! domain.domainFunctions )
                    domain.domainFunctions = this.oi.getDomainFunctions( domain.class );
            }
            else {
                console.log( `Couldn't find domain '${attributeDef.domain}'` );
            }

        }
        return attributeDef;
    }

    get keyAttributeDef(): any {
        let attributeDefs = this.entityDef.attributes;
        let keyDefs = [];
        for ( let attrName in attributeDefs ) {
            if ( attributeDefs[ attrName ].key )
                keyDefs.push( attributeDefs[ attrName ] );
        }

        if ( keyDefs.length != 1 )
            error( `keyAttributeDef can only be called for entities with a single key. Entity = ${this.entityName}` );

        return keyDefs[0];
    };

    get key(): string {
        let key = this.keyAttributeDef;
        return this.getAttribute( key.name )
    };
    set key(value: string) { this.setAttribute(this.keyAttributeDef, value) };

    constructor( initialize:  Object,
                 oi:          ObjectInstance,
                 parentArray: EntityArray<EntityInstance>,
                 options:     CreateOptions = DEFAULT_CREATE_OPTIONS ) {
        this.oi = oi;
        this.parentArray = parentArray;
        for ( let attr in initialize ) {
            if ( this.getAttributeDef(attr) ) {
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

            if ( attr === ".meta" ) {
                this.parseEntityMeta( initialize[attr] );
                continue;
            }

            if ( attr.startsWith(".") ) {
                let metaName = attr.substr(1); // Remove leading "."
                if ( this.getAttributeDef( metaName ) ) {
                    let attribs = this.getAttribHash( metaName );
                    attribs[ attr ] = initialize[ attr ];
                    continue;
                }
            }

            error( `Unknown attribute ${attr} for entity ${this.entityName}` );
        }

        if ( ! options.incrementalsSpecified ) {
            this.setDefaultAttributeValues();
            this.created = true;
            this.oi.isUpdated = true;
        }
    }

    private setDefaultAttributeValues() {
        let entityDef = this.entityDef;
        if ( ! entityDef.hasInit )
            return;

        for ( let attributeName in entityDef.attributes ) {
            let attributeDef = entityDef.attributes[ attributeName ];
            if ( ! attributeDef.initialValue )
                continue;

            // If the attribute is already set, skip it.
            if ( this.getAttribute( attributeName ) != undefined )
                continue;

            this.setAttribute( attributeName, attributeDef.initialValue );
        }

    }

    protected setAttribute( attr: string, value: any, options: CreateOptions = DEFAULT_CREATE_OPTIONS ) {
    //    console.log( `Setting attribute ${attr}`)
        let attributeDef = this.getAttributeDef( attr );

        if ( ! attributeDef )
            error( `Attribute ${attr} is unknown for entity ${this.entityDef.name}` );

        // Perform some validations unless incrementals are specified.
        if ( ! options.incrementalsSpecified ) {
            if ( ! attributeDef.update ) {
                error( `Attribute ${this.entityDef.name}.${attr} is read only` );
            }

            if ( this.deleted || this.excluded )
                error( `Can't set attribute for hidden EntityInstance: ${this.entityDef.name}.${attr}` );
        }

        if ( attributeDef.domain.domainFunctions ) {
            value = attributeDef.domain.domainFunctions.convertExternalValue( value, attributeDef );
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

        if ( attr == "Name" )
            this.oi.logOi();
    }

    public getAttribute( attr: string ): any {
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
        let attributeDef = this.getAttributeDef( attr );
        if ( attributeDef == undefined )
            console.log("here");

        if ( attributeDef.persistent )
            return this.attributes;
        else
            return this.workAttributes;
    }

    getChildEntityArray( entityName: string): EntityArray<EntityInstance> {
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

    public exclude() {
        let idx = this.parentArray.findIndex( ei => ei === this );
        this.parentArray.exclude( idx );
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

    private parseEntityMeta( meta: any ) {
        if ( meta.incrementals ) {
            this.created = meta.incrementals.indexOf( "C" ) > -1;
            this.deleted = meta.incrementals.indexOf( "D" ) > -1;
            this.included = meta.incrementals.indexOf( "I" ) > -1;
            this.excluded = meta.incrementals.indexOf( "X" ) > -1;
            this.updated = meta.incrementals.indexOf( "U" ) > -1;
        }

        this.incomplete = !!meta.incomplete;
    }

    private buildEntityMeta(): Object {
        let meta = {};
        let incrementals = this.buildIncrementalStr();
        if ( incrementals != "" )
            meta[ "incrementals" ] = incrementals;

        if ( this.incomplete )
            meta[ "incomplete" ] = true;

        return meta;
    }

    /**
     * Updates the attributes of this entity instance and any children that are specified
     * in 'values'.  The entity fingerprint is used to match up entities in 'value' to the
     * entities in the OI.
     *
     * Note: This will not create or re-order entities.  It is expected that every fingerprint
     * in 'values' exists in the OI.
     *
     * Sample input might look like:
     *      {
     *          fingerprint: 22,
     *          Attr1: 'new value',
     *          Attr2: 'another value',
     *          Attr3: true,
     *          Child1: [
     *              {
     *                  fingerprint: 49,
     *                  ChildAttr1: 10,
     *                  ChildAttr2: 'foo'
     *              }
     *          ]
     *      }
     */
    public update( values: any, options: UpdateOptions = {} ) {
        if ( typeof values !== 'object' )
            error( "Argument passed to update() must be an object" );

        for ( let key in values ) {
            // Ignore known non-attributes/entities like fingerprint
            if ( key === 'fingerprint' )
                continue;

            let attributeDef = this.getAttributeDef( key );
            if ( attributeDef ) {
                let value = values[ key ];
                this.setAttribute( key, value );
                continue;
            }

            let childDef = this.entityDef.childEntities[ key ];
            if ( ! childDef ) {
                if ( options.ignoreUnknownAttributeErrors )
                    continue;
                else
                    error( `Key '${key} in values does not match a known entity or attribute` );
            }

            let eiChildren = this.getChildEntityArray( key );
            let valueChildren = values[ key ];

            // Keep track of the fingerprints of the child entities.  We'll use
            // this to determine which children EIs need to be deleted.
            let childFingerprints = {};

            // Children of 1-to-1 relationships are not in an array.  Convert it to
            // an array to make it easier to process.
            if ( ! Array.isArray( valueChildren ) )
                valueChildren = [ valueChildren ];

            for ( let valueChild of valueChildren ) {
                let eiChild = eiChildren.find( eiChild => eiChild.fingerprint === valueChild.fingerprint )
                if ( ! eiChild )
                    error( "Couldn't find EI using fingerprint" );

                childFingerprints[ valueChild.fingerprint ] = true;
                eiChild.update( valueChild );
            }

            // Do we have a fingerprint for every child entity?
            if ( Object.keys( childFingerprints ).length < eiChildren.length ) {
                // No.  Delete all child entities that are missing from the list of fingerprints.
                eiChildren.deleteAll( (ei) => ! childFingerprints[ ei.fingerprint ] );
            }
        }
    }

    public toJSON( options : ZeidonToJsonOptions = {} ): Object {
        // TODO: can't use forCommit yet because the OI that comes back doesn't have
        // the missing entities.  We can't use forCommit until we implement a merge.
        // if ( options.forCommit && ! this.childUpdated )
        //     return undefined;

        let json = {};

        if ( options.meta ) {
            let meta = {} as any;
            let incrementals = this.buildIncrementalStr();
            if ( incrementals != "" )
                meta.incrementals = incrementals;

            if ( Object.keys( meta ).length > 0 )
                json[ ".meta" ] = meta;
        }

        for ( let attrName in this.entityDef.attributes ) {
            if ( this.getAttribute( attrName ) != undefined || this.isAttributeUpdated( attrName ) ) {
                json[attrName] = this.getAttribute( attrName );
                if ( options.meta && this.isAttributeUpdated( attrName ) ) {
                    json["." + attrName] = { updated: true };
                }
            }
        };

        for ( let entityName in this.entityDef.childEntities ) {
            if ( options.childEntities && options.childEntities.indexOf( entityName ) == -1 ) {
                continue;
            }

            let entities = this.getChildEntityArray( entityName ).allEntities();
            if ( entities.length == 0 )
                continue;

            let entityInfo = this.entityDef.childEntities[ entityName ];
            if ( entityInfo.cardMax == 1 ) {
                // TODO: can't use forCommit yet because the OI that comes back doesn't have
                // the missing entities.  We can't use forCommit until we implement a merge.
                //if ( ! options.forCommit || entities[0].childUpdated )
                if ( entities[0].childUpdated )
                    json[ entityName ] =  entities[0].toJSON( options );
            } else {
                // Filter is used to remove undefined values; these are returned if options.forCommit
                // is true and the ei wasn't updated.
                json[ entityName ] = entities.map( ei => ei.toJSON( options ) ).filter( ei => ei );
            }
        }

        return json;
    }
};

export interface UpdateOptions {
    ignoreUnknownAttributeErrors? : boolean
}

/**
 * Include logic can get pretty hairy.  This class tries to perform it.
 */
class Includer {
    constructor( private target: EntityInstance, private source: EntityInstance ) {}

    include() {
        this.target;
    }

}

/**
 * Array<T> is one of the few classes we can't directly extend so we have to create
 * a delegate class that handles all the real work.  We'll set the appropriate function
 * names when we construct EntityArray<T>.
 *
 * See https://github.com/Microsoft/TypeScript/issues/12013 for more.
 */
class ArrayDelegate<T extends EntityInstance> {
    hiddenEntities : Array<T>;
    currentlySelected;

    constructor( private array: Array<T>,
                 private entityName: string,
                 private oi: ObjectInstance,
                 private parentEi: EntityInstance ) {
        this.currentlySelected = 0;
    }

    private get entityDef() { return this.oi.getLodDef().entities[ this.entityName ]; }

    create( initialize : Object = {}, options: CreateOptions = DEFAULT_CREATE_OPTIONS ): EntityInstance {
    //    console.log("Creating entity " + this.entityName );
        let ei = Object.create( this.oi.getPrototype( this.entityName ) );
        ei.constructor.apply(ei, [ initialize, this.oi, this.array, options ] );

        // Figure out where to insert the new ei.
        let position = options.position;
        if ( position == undefined ) {
            // Default is to insert at the end.
            this.array.push( ei );
        } else
        if ( typeof position === "number" ) {
            this.array.splice( position, 0, ei );
        }
        else {
            if ( position === Position.Last )
                this.array.push( ei );
            else
            if ( position === Position.First )
                this.array.unshift( ei );
            else
            if ( position === Position.Next )
                this.array.splice( this.currentlySelected, 0, ei );
            else {
                // Must be Position.Prev.  If currentlySelected is 0, then put
                // at the beginning.
                if ( this.currentlySelected == 0 )
                    this.array.unshift( ei );
                else
                    this.array.splice( this.currentlySelected - 1, 0, ei );
            }
        }

        this.setSelected( ei );
        return ei;
    }

    include( sourceEi: EntityInstance, index: number = -1, options: any = {} ) {
        if ( ! this.entityDef.includable )
            error( `Entity ${this.entityDef.name} does not have include authority.` );
    }

    private validateExclude( index? : number ) {
        if ( ! this.entityDef.excludable )
            error( `Entity ${this.entityDef.name} does not have exclude authority.` );

        if ( ! this.hiddenEntities )
            this.hiddenEntities = new Array<T>();
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
            if ( ei.incomplete )
                error( `Entity ${this.entityDef.name} is incomplete and cannot be deleted.` )
        }

        if ( ! this.hiddenEntities )
            this.hiddenEntities = new Array<T>();
    }

    deleteAll( filter?: ( EntityInstance ) => boolean ) {
        this.validateDelete();
        if ( this.array.length == 0 )
            return;

        this.hiddenEntities = this.hiddenEntities.concat( this.array );
        for ( let ei of this.array ) {
            if ( filter == undefined || filter( ei ) === true )
                this.deleteEntity( ei );
        }

        this.array.length = 0;
    }

    delete( index? : number ) {
        if ( index == undefined )
            index = this.currentlySelected;

        this.validateDelete( index );

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
            ei.incomplete = true;
        }
    }

    exclude( index? : number ) {
        if ( index == undefined )
            index = this.currentlySelected;

        let ei = this.array.splice( index, 1 )[0];
        ei.excluded = true;
        this.oi.isUpdated = true;
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

    setSelected( value: number | EntityInstance ): EntityInstance {
        if ( value instanceof EntityInstance ) {
            this.currentlySelected = this.array.findIndex( ei => value === ei );
            return this.selected();
        }

        if ( typeof value == "number" ) {
            this.currentlySelected = value;
            return this.selected();
        }

        throw `Value must be number or EntityInstance.  Found ${typeof value}`
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
        _arr.deleteAll = function( filter?: ( EntityInstance ) => boolean ) { this.delegate.deleteAll(filter); };
        _arr.delete = function( index?: number) { this.delegate.delete( index ); };
        _arr.drop = function( index?: number) { this.delegate.drop( index ); };
        _arr.exclude = function( index?: number) { this.delegate.exclude( index ); };
        _arr.selected = function() { return this.delegate.selected(); };
        _arr.setSelected = function(value: number | EntityInstance) { return this.delegate.setSelected( value ); };
        _arr.allEntities = function() { return this.delegate.allEntities(); };

        return _arr;
    }

    /**
     * Create an entity at the end of the current entity list.
     */
    create: ( initialize? : Object, options?: CreateOptions ) => EntityInstance;
    excludeAll: () => void;
    deleteAll: ( filter?: ( EntityInstance ) => boolean ) => void;
    delete: ( index? : number ) => void;
    drop: ( index? : number ) => void;
    exclude: ( index? : number ) => void;
    selected: () => EntityInstance;
    setSelected: (value: number | EntityInstance ) => EntityInstance;

    /**
     * Returns all entity instances, including hidden ones.
     */
    allEntities: () => Array<EntityInstance>;
}

export enum Position {
    First, Prev, Next, Last
}

export interface CreateOptions {
    incrementalsSpecified? : boolean;
    readOnlyOi? : boolean;
    position? : Position | number;
}

const DEFAULT_CREATE_OPTIONS = {
    incrementalsSpecified: false,
    readOnlyOi: false,
    position: Position.Last
 };

@Injectable()
export class Activator {
    activateOi<T extends ObjectInstance>( oi: T, options?: any ): Observable<T> {
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

export interface ZeidonToJsonOptions {
    childEntities? : string[];  // If a non-empty array, only write childEntities listed in the array.
    meta? :          boolean;   // Write OI/entity meta (e.g. incrementals).
    forCommit? :     boolean;   // Only write entities need for update.
}

export interface CommitOptions {
}

/**
 * Defines what makes up a Domain.  Domains are generated by Zeidon from zeidon.xdm.
 */
export interface Domain {
    name: string,
    class: string,
    maxLength?: number,
    contexts?: any,
    domainFunctions?: any,
}

export class AttributeValueError extends Error {
    attributeDef: any;

    constructor( message: string, attributeDef: any ) {
        super( message + `   Attribute: ${attributeDef.name}`)
        this.attributeDef = attributeDef;
    }
}

let error = function ( message: string ) {
   var e = new Error('dummy');
   var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
      .replace(/^\s+at\s+/gm, '')
      .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
      .split('\n');
    console.log(stack.join("\n"));

    console.log( message );
    alert( message );
    throw message;
}
