import { ZeidonObjectInstance } from './zeidon.object.instance';

export class ZeidonEntityInstance {
    protected oi: ZeidonObjectInstance;
    private childEntityInstances = {};

    get attributes(): Object { throw "attributes() but be overridden" };
    get childEntities(): Object { throw "childEntities() but be overridden" };
    protected createEmptyEntityArray() : EntityArray<ZeidonEntityInstance> {
        throw "createEmptyEntityArray must be overridden"
    }

    constructor( initialize: Object, oi: ZeidonObjectInstance ) {
        this.oi = oi;
        for ( let attr in initialize ) {
            if ( this.attributes[attr] )
                this.setAttribute( attr, initialize[attr]);
            else
            if ( this.childEntities[attr] ) {
                let init = initialize[attr];
                if ( ! ( init.constructor === Array ) ) {
                    init = [ init ];  // If it's not an arry, wrap it.
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

    protected setAttribute( attr: string, value: any, setIncrementals = true ) {
        console.log("----setting " + attr + " to " + value);
        this[ "." + attr ] = true;
        this[ "_" + attr ] = value;
    }

    protected getAttribute( attr: string ): any {
        return this["_" + attr];
    }

    protected getChildEntities( entityName: string): EntityArray<ZeidonEntityInstance> {
        let entities = this.childEntityInstances[ entityName ];
        if ( entities == undefined ) {
            entities = this.createEmptyEntityArray();
            entities.oi = this.oi;
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

        return json;
    }
};

export class EntityArray<T> extends Array<T> {
    entityPrototype : any;
    entityName: string;
    oi : ZeidonObjectInstance;

    create( initialize : Object = {} ): T {
        console.log("Creating entity " + this.entityName );
        let ei = Object.create( this.entityPrototype );
        ei.constructor.apply(ei, [ initialize] );
        this.push(ei);
        return ei;
    }
}
