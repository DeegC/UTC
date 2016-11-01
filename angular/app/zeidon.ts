import { Headers, Http, RequestOptions } from '@angular/http';
import { OpaqueToken } from '@angular/core';
import { Injectable, Inject }    from '@angular/core';

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
        for ( let root of this.roots ) {
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

    public static activateOi( oi: ObjectInstance, options?: ActivateOptions ): Promise<ObjectInstance> {
        let config = configurationInstance;
        if ( ! config )
            error( "ZeidonConfiguration not properly initiated.")

        return config.getActivator().activateOi( oi, options );
    }

    public commit( options?: CommitOptions ): Promise<this> {
        let config = configurationInstance;
        if ( ! config )
            error( "ZeidonConfiguration not properly initiated.")

        return config.getCommitter().commitOi( this, options );
    }

    createFromJson( initialize, options: CreateOptions ): this {
        if ( typeof initialize == "string" ) {
            initialize = JSON.parse( initialize );
        }

        this.roots = new EntityArray<EntityInstance>( this.rootEntityName(), this );
        if ( ! initialize ) {
            this.roots.create( initialize, options );
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

            for ( let i of initialize.OIs[0][ this.rootEntityName() ] ) {
                this.roots.create( i, options );
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

export class EntityInstance {
    public oi: ObjectInstance;
    public created = false;
    public included = false;
    public deleted = false;
    public excluded = false;
    public updated = false;

    public attributes: any = {};
    public workAttributes: any = {};

    // If incomplete = true then this entity did not have all its children
    // loaded and so cannot be deleted.
    private incomplete = false;

    private childEntityInstances = {};

    public get entityName(): string { throw "entityName() but be overridden" };

    public get entityDef(): any {
        return this.oi.getLodDef().entities[ this.entityName ];
    }

    public get attributeDefs(): Object {
        return this.entityDef.attributes;
    }

    constructor( initialize: Object, oi: ObjectInstance, options: CreateOptions = DEFAULT_CREATE_OPTIONS ) {
        this.oi = oi;
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
                let meta = initialize[attr];
                if ( meta.incremntal )
                    options.incrementalsSpecified  = true;
                if ( meta.readOnlyOi )
                    options.readOnlyOi = true;

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
    }

    protected setAttribute( attr: string, value: any, options: CreateOptions = DEFAULT_CREATE_OPTIONS ) {
    //    console.log( `Setting attribute ${attr}`)
        let attributeDef = this.attributeDefs[ attr ];

        if ( ! attributeDef )
            error( `Attribute ${attr} is unknown for entity ${this.entityDef.name}` );

        if ( ! attributeDef.update && ! options.incrementalsSpecified )
            error( `Attribute ${this.entityDef.name}.${attr} is read only` );

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
        return this.attributes;
    }

    protected getChildEntityArray( entityName: string): EntityArray<EntityInstance> {
        let entities = this.childEntityInstances[ entityName ];
        if ( entities == undefined ) {
            entities = new EntityArray<EntityInstance>( entityName, this.oi );
            this.childEntityInstances[ entityName ] = entities;
        }

        return entities;
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
            if ( this.getAttribute( attrName ) || this.isAttributeUpdated( attrName ) ) {
                json[attrName] = this.getAttribute( attrName );
                if (this.isAttributeUpdated( attrName ) ) {
                    json["." + attrName] = { updated: true };
                }
            }
        };

        for ( let entityName in this.entityDef.childEntities ) {
            console.log("json entity = " + entityName );
            let entities = this.getChildEntityArray( entityName ); 
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

export class EntityArray<EntityInstance> extends Array<EntityInstance> {
    hiddenEntities : Array<EntityInstance>;
    entityPrototype : any;
    entityName: string;
    oi : ObjectInstance;
    currentlySelected = 0;

    constructor( entityName: string, oi: ObjectInstance ) {
        super()
        this.entityName = entityName;
        this.entityPrototype = oi.getPrototype( entityName );
        this.oi = oi;
    }

    /** 
     * Create an entity at the end of the current entity list.
     */
    create( initialize : Object = {}, options: CreateOptions = DEFAULT_CREATE_OPTIONS ): EntityInstance {
    //    console.log("Creating entity " + this.entityName );
        let ei = Object.create( this.entityPrototype );
        ei.constructor.apply(ei, [ initialize, this.oi, options] );
        this.push(ei);
        this.currentlySelected = this.length - 1;
        return ei;
    }

    delete( index? : number ) {
        let entityDef = this.oi.getLodDef().entities[ this.entityName ];

        if ( index == undefined )
            index = this.currentlySelected;

        if ( ! this.hiddenEntities )
            this.hiddenEntities = new Array<EntityInstance>();

        this.hiddenEntities.push( this[ index ] );
        throw "Still needs implemnting";
    }

    selected(): EntityInstance {
        return this[this.currentlySelected];
    }
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
    activateOi( oi: ObjectInstance, options?: ActivateOptions ): Promise<ObjectInstance> {
        throw "activateOi has not been implemented"
    }

    // Error handler called if there is an error.
    errorHandler?: (error:any) => void;
}

@Injectable()
export class RestActivator {
    constructor( private restUrl: string, private http: Http ) {}

    activateOi( oi: ObjectInstance, options?: ActivateOptions ): Promise<ObjectInstance> {
        if ( options == undefined )
            options = new ActivateOptions();

        let lodName = oi.getLodDef().name;
        let errorHandler = oi.handleActivateError;
        let url = `${this.restUrl}/${lodName}`;

        if ( options.id ) {
            url = `${url}/${options.id}`; // Add the id to the URL.
            return this.http.get( url )
                    .toPromise()
                    .then(response => oi.createFromJson( response.json(), DEFAULT_CREATE_OPTIONS ) )
                    .catch( errorHandler );
        }

        // If we get here there's no qualification.  Set rootOnly if it's not.
        if ( options.rootOnly == undefined ) {
            options = options.clone();
            options.rootOnly = true;
        }

        return this.http.get( url )
                .toPromise()
                .then(response => oi.createFromJson( response.json(), DEFAULT_CREATE_OPTIONS ) )
                .catch( errorHandler );
    }
}

@Injectable()
export class Committer {
    commitOi( oi: ObjectInstance, options?: CommitOptions ): Promise<ObjectInstance>{
        throw "commitOi has not been implemented"
    }

    // Error handler called if there is an error.
    errorHandler?: (error:any) => void;
}

@Injectable()
export class RestCommitter implements Committer {
    constructor( private restUrl: string, private http: Http ) {}

    commitOi( oi: ObjectInstance, options?: CommitOptions ): Promise<ObjectInstance> {
        let lodName = oi.getLodDef().name;
        let body = JSON.stringify( oi.toZeidonMeta() );
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let reqOptions = new RequestOptions({ headers: headers });
        let errorHandler = oi.handleActivateError ;
        let url = `${this.restUrl}/${lodName}`;

        return this.http.post( url, body, reqOptions)
            .toPromise()
            .then(response => this.parseCommitResponse( oi, response ) )
            .catch( errorHandler );
    }

    parseCommitResponse( oi: ObjectInstance, response ): ObjectInstance {
        if ( response == "{}" )
            return oi.createFromJson( undefined, DEFAULT_CREATE_OPTIONS );

        let data = response.json();
        return oi.createFromJson( data, DEFAULT_CREATE_OPTIONS );
    }

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

/**
 * These are the values for configuring Zeidon to use a REST server for activate/commits.
 */
@Injectable()
export class ZeidonRestValues {
    restUrl: string;
}

@Injectable()
export class ZeidonRestConfiguration extends ZeidonConfiguration {
    constructor( private values: ZeidonRestValues, private http: Http ) {
        super( new RestActivator( values.restUrl, http ), 
               new RestCommitter( values.restUrl, http ) );
        console.log("--- ZeidonRestConfiguration --- " + values.restUrl );
    }
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
