import { Resource } from "./Resource";

export class Pod extends Resource {
  static createFrom(source: any = {}) {
    return new Pod(source);
  }
}
