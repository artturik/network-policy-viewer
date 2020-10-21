import * as yaml from 'js-yaml';

export function parse(manifest) : object {
    try {
        const doc = yaml.safeLoad(manifest);
        console.log(doc);
    } catch (e) {
        console.log(e);
    }
    return {};
}