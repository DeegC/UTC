//import { ZeidonEntityInstance } from './zeidon.entity.instance';

export class ZeidonObjectInstance {
    protected roots = [];

    constructor( initialize: Object ) {
        let rootEntityName = this.oiName() + "_" + this.rootEntityName();
        let proto = this.getPrototype( this.rootEntityName() );
        let root = Object.create(proto);
        root.constructor.apply(root, [initialize]);
        this.roots.push(root);
    }

    protected oiName(): string { throw "oiName must be overridden" };
    protected rootEntityName(): string { throw "rootEntityName must be overridden" };
    protected getPrototype( entityName: string ): any { throw "getPrototype must be overriden" };
}
