export class ObjectInstance {
    protected roots : EntityArray<EntityInstance>;
    public isUpdated = false;

    constructor( initialize = undefined, options: Object = {} ) {
        if ( typeof initialize == "string" ) {
            initialize = JSON.parse( initialize );
        }

        this.roots = new EntityArray<EntityInstance>( this.rootEntityName(), this );
        if ( initialize.constructor === Array ) {
            for ( let i of initialize ) {
                this.roots.create( i );
            }
        } else {
            this.roots.create( initialize );
        }
    }

    protected rootEntityName(): string { throw "rootEntityName must be overridden" };
    public getPrototype( entityName: string ): any { throw "getPrototype must be overriden" };
    public getEntityAttributes( entityName: string ): any { throw "getEntityAttributes must be overriden" };

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
}

export class EntityInstance {
    protected oi: ObjectInstance;
    private childEntityInstances = {};

    protected get childEntities(): Object { throw "childEntities() but be overridden" };
    protected get entityName(): string { throw "entityName() but be overridden" };

    get attributes(): Object {
        return this.oi.getEntityAttributes( this.entityName );   
    }

    constructor( initialize: Object, oi: ObjectInstance, options: Object = {} ) {
        this.oi = oi;
        for ( let attr in initialize ) {
            if ( this.attributes[attr] )
                this.setAttribute( attr, initialize[attr], options);
            else
            if ( this.childEntities[attr] ) {
                let init = initialize[attr];
                if ( ! ( init.constructor === Array ) ) {
                    init = [ init ];  // If it's not an array, wrap it.
                }
                for ( let o of init ) {
                    let array = this.getChildEntities( attr );
                    array.create( o );
                }
            }
            else
                throw "Unknown initial value " + attr;
        }
    }

    protected setAttribute( attr: string, value: any, options: Object = {} ) {
        let internalName = "_" + attr;
        if ( this[ internalName ] == value )
            return;

        this[ "." + attr ] = true;
        this[ internalName ] = value;
    }

    protected getAttribute( attr: string ): any {
        return this["_" + attr];
    }

    protected getChildEntities( entityName: string): EntityArray<EntityInstance> {
        let entities = this.childEntityInstances[ entityName ];
        if ( entities == undefined ) {
            entities = new EntityArray<EntityInstance>( entityName, this.oi );
            this.childEntityInstances[ entityName ] = entities;
        }

        return entities;
    }

    public toJSON(): Object {
        console.log("json attributes = " + this.attributes);

        let json = {};
        for ( let fieldName in this.attributes ) {
            if (this["_" + fieldName] || this["." + fieldName]) {
                json[fieldName] = this["_" + fieldName];
                if (this["." + fieldName]) {
                    json["." + fieldName] = this["." + fieldName];
                }
            }
        };

        for ( let entityName in this.childEntities ) {
            console.log("json entity = " + entityName );
            let entities = this.getChildEntities( entityName ); 
            if ( entities.length == 0 )
                continue;

            let entityInfo = this.childEntities[ entityName ];
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
    create( initialize : Object = {} ): EntityInstance {
        console.log("Creating entity " + this.entityName );
        let ei = Object.create( this.entityPrototype );
        ei.constructor.apply(ei, [ initialize, this.oi] );
        this.push(ei);
        this.currentlySelected = this.length - 1;
        return ei;
    }

    selected(): EntityInstance {
        return this[this.currentlySelected];
    }
}
