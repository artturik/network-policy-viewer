export declare class ObjectMeta {
    name?: string;
    generateName?: string;
    namespace?: string;
    selfLink?: string;
    uid?: string;
    resourceVersion?: string;
    generation?: number;
    creationTimestamp?: Time;
    deletionTimestamp?: Time;
    deletionGracePeriodSeconds?: number;
    labels?: {
        [key: string]: string;
    };
    annotations?: {
        [key: string]: string;
    };
    ownerReferences?: OwnerReference[];
    finalizers?: string[];
    clusterName?: string;
    managedFields?: ManagedFieldsEntry[];
    static createFrom(source?: any): ObjectMeta;
    constructor(source?: any);
    convertValues(a: any, classs: any, asMap?: boolean): any;
}
export declare class NetworkPolicyEgressRule {
    ports?: NetworkPolicyPort[];
    to?: NetworkPolicyPeer[];
    static createFrom(source?: any): NetworkPolicyEgressRule;
    constructor(source?: any);
    convertValues(a: any, classs: any, asMap?: boolean): any;
}
export declare class IPBlock {
    cidr: string;
    except?: string[];
    static createFrom(source?: any): IPBlock;
    constructor(source?: any);
}
export declare class NetworkPolicyPeer {
    podSelector?: LabelSelector;
    namespaceSelector?: LabelSelector;
    ipBlock?: IPBlock;
    static createFrom(source?: any): NetworkPolicyPeer;
    constructor(source?: any);
    convertValues(a: any, classs: any, asMap?: boolean): any;
}
export declare class IntOrString {
    static createFrom(source?: any): IntOrString;
    constructor(source?: any);
}
export declare class NetworkPolicyPort {
    protocol?: string;
    port?: IntOrString;
    static createFrom(source?: any): NetworkPolicyPort;
    constructor(source?: any);
    convertValues(a: any, classs: any, asMap?: boolean): any;
}
export declare class NetworkPolicyIngressRule {
    ports?: NetworkPolicyPort[];
    from?: NetworkPolicyPeer[];
    static createFrom(source?: any): NetworkPolicyIngressRule;
    constructor(source?: any);
    convertValues(a: any, classs: any, asMap?: boolean): any;
}
export declare class LabelSelectorRequirement {
    key: string;
    operator: string;
    values?: string[];
    static createFrom(source?: any): LabelSelectorRequirement;
    constructor(source?: any);
}
export declare class LabelSelector {
    matchLabels?: {
        [key: string]: string;
    };
    matchExpressions?: LabelSelectorRequirement[];
    static createFrom(source?: any): LabelSelector;
    constructor(source?: any);
    convertValues(a: any, classs: any, asMap?: boolean): any;
}
export declare class NetworkPolicySpec {
    podSelector: LabelSelector;
    ingress?: NetworkPolicyIngressRule[];
    egress?: NetworkPolicyEgressRule[];
    policyTypes?: string[];
    static createFrom(source?: any): NetworkPolicySpec;
    constructor(source?: any);
    convertValues(a: any, classs: any, asMap?: boolean): any;
}
export declare class FieldsV1 {
    static createFrom(source?: any): FieldsV1;
    constructor(source?: any);
}
export declare class ManagedFieldsEntry {
    manager?: string;
    operation?: string;
    apiVersion?: string;
    time?: Time;
    fieldsType?: string;
    fieldsV1?: FieldsV1;
    static createFrom(source?: any): ManagedFieldsEntry;
    constructor(source?: any);
    convertValues(a: any, classs: any, asMap?: boolean): any;
}
export declare class OwnerReference {
    apiVersion: string;
    kind: string;
    name: string;
    uid: string;
    controller?: boolean;
    blockOwnerDeletion?: boolean;
    static createFrom(source?: any): OwnerReference;
    constructor(source?: any);
}
export declare class Time {
    static createFrom(source?: any): Time;
    constructor(source?: any);
}
export declare class NetworkPolicy {
    kind?: string;
    apiVersion?: string;
    metadata: ObjectMeta;
    ownerReferences?: OwnerReference[];
    managedFields?: ManagedFieldsEntry[];
    spec?: NetworkPolicySpec;
    static createFrom(source?: any): NetworkPolicy;
    constructor(source?: any);
    convertValues(a: any, classs: any, asMap?: boolean): any;
}
export declare class NetworkPolicyList {
    kind?: string;
    apiVersion?: string;
    selfLink?: string;
    resourceVersion?: string;
    continue?: string;
    remainingItemCount?: number;
    items: NetworkPolicy[];
    static createFrom(source?: any): NetworkPolicyList;
    constructor(source?: any);
    convertValues(a: any, classs: any, asMap?: boolean): any;
}
