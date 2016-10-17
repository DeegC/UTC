import { ZeidonEntityInstance } from './zeidon.entity.instance';

export class ZeidonObjectInstance {
    protected roots = [];

    constructor( initialize: Object ) {
        let root = this.createEntity( this.rootEntityName(), initialize );
        this.roots.push(root);
    }

    createEntity( entityName: string, initialize: Object ): ZeidonEntityInstance {
        let proto = this.getPrototype( entityName );
        let ei = Object.create(proto);
        ei.constructor.apply(ei, [initialize, this]);
        return ei;
    }

    protected oiName(): string { throw "oiName must be overridden" };
    protected rootEntityName(): string { throw "rootEntityName must be overridden" };
    protected getPrototype( entityName: string ): any { throw "getPrototype must be overriden" };
}
