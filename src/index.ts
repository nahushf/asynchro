import * as React from 'react';
import { connect } from 'react-redux';
import { executePromiseAction, unsetReload, reload } from "./loadingActions";
import { isEmpty } from "./utils";

export interface IAsyncProps {
    /** The promise to be fired to fetch the data for the content of the component. */
    promise: (...args: any[]) => (PromiseLike<any> | null);
    /** 
     * Identifier of the current instance to save the loading state of the data 
     * being displayed in the current instance 
     */
    identifier: string;
    /** The JSX to be displayed if the promise resolves successfully. */
    content: JSX.Element | ((resp) => JSX.Element);
    /** The JSX to be displayed when the promise is in the pending state. */
    loader?: JSX.Element | (() => JSX.Element);
    /** The JSX to be displayed if the promise fails. */
    error?: JSX.Element | ((error) => JSX.Element);
    /** The initialState to be set in the store. */
    initialState?: IAsyncState;
    dispatch?: (...args: any[]) => void;
}

export interface IAsyncMSP {
    /** The loading state as reflected by the store. */
    loadingState: IAsyncState;
    reload: boolean;
}

export interface IAsyncMDP {
    unsetReload: (identifier: string) => void;
}

export interface IAsyncState {
    /** If true specifies that the promise is pending. */
    isLoading?: boolean;
    /** If true specifies that the promise failed. */
    hasError?: boolean;
}

export class AsyncImpl extends React.PureComponent<IAsyncProps & IAsyncMSP & IAsyncMDP, {}> {

    Loader: IAsyncProps['loader'];
    Error: IAsyncProps['error'];
    Content: IAsyncProps['content'];
    resp: Object;

    /** Initializes the Loader, Error and Content JSX. */
    parseProps = ({ content, error, loader } = this.props) => {
        this.Content = content;
        this.Error = error;
        this.Loader = loader;
    }

    responseHandler = resp => {
        this.resp = resp;
        return resp;
    }

    /** Executes the promise in the format required by redux promise middleware. */
    executePromise = (promiseFunction) => {
        const { identifier, dispatch } = this.props;
        let promise = promiseFunction instanceof Function ? promiseFunction() : promiseFunction;
        if (promise && promise.then) {
            promise = promise.then(
                this.responseHandler,
                (e) => { this.responseHandler(e); throw e; }
            );
        }

        executePromiseAction(
            promise,
            identifier,
            dispatch
        );
    }

    componentWillMount() {
        this.executePromise(this.props.promise);
        this.parseProps();
    }

    refresh = (promise = this.props.promise) => {
        this.executePromise(promise);
    }

    unsetReload = (identifier: string) => {
        unsetReload(identifier)

    }

    componentWillReceiveProps(nextProps: IAsyncProps & IAsyncMSP) {
        this.parseProps(nextProps as any);
        if (nextProps.reload) {
            this.unsetReload(nextProps.identifier);
            this.executePromise(
                nextProps.promise,
            );
        }
    }

    renderData = data => {
        if (data instanceof Function) {
            return data(this.resp);
        }
        return React.Children.only(data);
    }

    /** Renders JSX according to the loading state in the store. */
    render() {
        let {
            props: {
                loadingState,
            identifier
            },
            Loader,
            Error,
            Content,
            renderData
        } = this;

        let { isLoading, hasError } = loadingState;
        try {
            if ((isEmpty(loadingState) || isLoading) && Loader) {
                return renderData(Loader);
            }

            if (!isLoading && !hasError) {
                return renderData(Content);
            }

            if (hasError && Error) {
                return renderData(Error);
            }
        } catch (e) {
            throw 'Error while rendering Async component with identifier '
            + identifier +
            ':\n' + e;
        }

    }

}

export function mapStateToProps(state, { identifier, initialState }: IAsyncProps): IAsyncMSP {
    return {
        loadingState: state.loading.get(identifier) || initialState || {},
        reload: state.loading.get('$reload', []).includes(identifier)
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        unsetReload(identifier: string) {
            dispatch(unsetReload​​(identifier))
        },
        dispatch
    }
}

export let Async = connect<IAsyncMSP, IAsyncMDP, IAsyncProps>(
    mapStateToProps, mapDispatchToProps, null, { withRef: true }
)(AsyncImpl);

// import { INVALID_IMPLEMENTATION_ASYNC, MISSING_STORE } from './constants';
// import { IAsyncState } from './interfaces';
// import {setLoading, setError, setSuccess} from './redux/storeUtils/asyncActions';
// import {connect} from 'react-redux';
// import * as React from 'react';

// let self;

// export class Asynchro<T> {
//     self: any
//     constructor(public store) {
//         if (!store) {
//             throw new Error(MISSING_STORE);
//         }
//         this.self = this;
//     }

//     Component = connect(
//         (state) => {}
//     )(class <P extends IAsyncState, S> extends React.Component<P, S> {
//         isPromiseString: boolean;
//         static identifier: string;
//         constructor(props) {
//             super(props);
//         }

//         promise: () => Promise<any> | {url: string, headers: any, params: any, method: string}; 

//         static setLoading() {
//             self.store.dispatch(setLoading(this.identifier));                          
//         }

//         static setError() {
//             self.store.dispatch(setError(this.identifier));
//         }

//         static setSuccess() {
//             self.store.dispatch(setSuccess(this.identifier));
//         }

//         componentWillMount() {
//             const {promise} = this;
//             if (promise instanceof Function) {
//                 promise
//             }
//         }

//         renderError = () => {
//             return <span className="async-error-placeholder"/>;
//         }

//         renderLoading = () => {
//             return <span className="async-loading-placeholder"/>;
//         }

//         renderSuccess = () => {
//             return <span className="async-success-placeholder"/>;
//         }

//         render() {
//             const {renderError, renderLoading, renderSuccess, props: {isLoading, hasError}} = this;

//             if (!renderError || !renderLoading || !renderSuccess) {
//                 throw new Error(INVALID_IMPLEMENTATION_ASYNC);
//             }

//             if (this.props.isLoading) {
//                 return renderLoading();
//             }

//             if (this.props.hasError) {
//                 return renderError();
//             }

//             return renderSuccess();
//         }
//     })
// }

