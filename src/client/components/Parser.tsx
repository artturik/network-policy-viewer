import * as yaml from 'js-yaml';
import { NetworkPolicy } from "./model/NetworkPolicy";

export function parse(manifest: string) : NetworkPolicy {
    try {
        return new NetworkPolicy(JSON.stringify(yaml.safeLoad(manifest)));
    } catch (e) {
        console.log(e);
    }
}