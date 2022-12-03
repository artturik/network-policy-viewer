import { ObjectMeta } from "./NetworkPolicy";
export declare class Resource {
    kind: string;
    apiVersion: string;
    metadata: ObjectMeta;
    static createFrom(source?: any): Resource;
    constructor(source?: any);
    convertValues(a: any, classs: any, asMap?: boolean): any;
}
