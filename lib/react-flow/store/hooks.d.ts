import { StoreModel } from './index';
export declare const useStoreActions: <Result>(mapActions: (actions: import("easy-peasy").Actions<StoreModel>) => Result) => Result;
export declare const useStoreDispatch: () => import("easy-peasy").Dispatch<StoreModel, import("redux").AnyAction>;
export declare const useStoreState: <Result>(mapState: (state: import("easy-peasy").StateMapper<import("ts-toolbelt/out/Object/Pick")._Pick<StoreModel, import("ts-toolbelt/out/Object/FilterKeys")._FilterKeys<StoreModel, import("easy-peasy").ActionTypes, "default">>>) => Result, equalityFn?: (prev: Result, next: Result) => boolean) => Result;
export declare const useStore: () => import("easy-peasy").Store<StoreModel, import("easy-peasy").EasyPeasyConfig<undefined, {}>>;
