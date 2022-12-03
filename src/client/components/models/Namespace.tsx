import { Resource } from "./Resource";

export class Namespace extends Resource {
  static createFrom(source: any = {}) {
    return new Namespace(source);
  }
}
