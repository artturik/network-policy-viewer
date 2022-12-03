import { ObjectMeta } from "./NetworkPolicy";

export class Resource {
  kind: string;
  apiVersion: string;
  metadata: ObjectMeta;

  static createFrom(source: any = {}) {
    return new Resource(source);
  }

  constructor(source: any = {}) {
    if ("string" === typeof source) source = JSON.parse(source);
    this.kind = source["kind"];
    this.apiVersion = source["apiVersion"];
    this.metadata = this.convertValues(source["metadata"], ObjectMeta);
  }

  convertValues(a: any, classs: any, asMap: boolean = false): any {
    if (!a) {
      return a;
    }
    if (a.slice) {
      return (a as any[]).map((elem) => this.convertValues(elem, classs));
    } else if ("object" === typeof a) {
      if (asMap) {
        for (const key of Object.keys(a)) {
          a[key] = new classs(a[key]);
        }
        return a;
      }
      return new classs(a);
    }
    return a;
  }
}
