export interface IAction {
    type: string;
}

export interface ILoadingAction extends IAction {
    meta: {
        identifier: string;
        successCb: (resp: any) => any;
        failureCb: (resp: any) => any;
    };
    payload: Object;
    identifier?: string;
}
