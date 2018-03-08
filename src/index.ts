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
    content: JSX.Element;
    /** The JSX to be displayed when the promise is in the pending state. */
    loader?: JSX.Element;
    /** The JSX to be displayed if the promise fails. */
    error?: JSX.Element;
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

    Loader: JSX.Element;
    Error: JSX.Element;
    Content: JSX.Element;
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
        }
    }
}

export let Async = connect<IAsyncMSP, IAsyncMDP, IAsyncProps>(
    mapStateToProps, mapDispatchToProps, null, { withRef: true }
)(AsyncImpl);

