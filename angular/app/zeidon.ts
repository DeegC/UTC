export class Application {
    lodDefs : Object;

    constructor( lodDefs: Object ) {
        this.lodDefs = lodDefs;
    }
}

export class ObjectInstance {
    protected roots : EntityArray<EntityInstance>;
    public isUpdated = false;

    constructor( initialize = undefined, options: any = {} ) {
        if ( typeof initialize == "string" ) {
            initialize = JSON.parse( initialize );
        }

        this.roots = new EntityArray<EntityInstance>( this.rootEntityName(), this );
        if ( initialize.OIs ) {
            // TODO: Someday we should handle multiple return OIs for for now
            // we'll assume just one and hardcode '[0]'.
             let oimeta = initialize.OIs[0][ ".oimeta" ];

             // If incrementals are set then set the constructor option to 
             // not set the update flag when the attribute value is set.  The
             // flags will be set by the incrementals.
             if ( oimeta && oimeta.incremental ) {
                 if ( options.dontSetUpdate == undefined )
                    options.dontSetUpdate = true;
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
    }

    protected rootEntityName(): string { throw "rootEntityName must be overridden" };
    public getPrototype( entityName: string ): any { throw "getPrototype must be overriden" };
    public getLodDef(): any { throw "getLodDef must be overridden" };
    public getApplicationName(): String { throw "getApplicationName must be overriden" };

    public getEntityAttributes( entityName: string ): any { 
        this.getLodDef().entities[ entityName ].attributes;
    };

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
     * Wrap the JSON for this object with Zeidon OI meta.
     */
    public toZeidonMeta() : Object {
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

    constructor( initialize: Object, oi: ObjectInstance, options: any = {} ) {
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
                    options.includesIncremntal  = true;
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

            throw `Unknown attribute ${attr} for entity ${this.entityName}`;
        }
    }

    protected setAttribute( attr: string, value: any, options: any = {} ) {
        let attribs = this.getAttribHash( attr );

        if ( attribs[ attr ] == value )
            return;

        attribs[ attr ] = value;

        if ( options.dontSetUpdate )
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
    create( initialize : Object = {}, options: any = {} ): EntityInstance {
        console.log("Creating entity " + this.entityName );
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
    }

    selected(): EntityInstance {
        return this[this.currentlySelected];
    }
}
