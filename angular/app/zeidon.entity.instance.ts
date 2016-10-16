export class ZeidonEntityInstance {
    // List of attributes
    protected attributes = {};

    constructor( initialize: Object ) {
        for ( let attr in initialize ) {
            this.setAttribute( attr, initialize[attr]);
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
