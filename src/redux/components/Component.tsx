import { MISSING_PROMISE } from '../../constants';
import { IAsyncState } from '../../interfaces';
import { connect } from 'react-redux';
import { INVALID_IMPLEMENTATION_ASYNC } from '../../constants/errorMessages';
import * as React from 'react';
import { Store } from 'redux';
import { setLoading, setError, setSuccess } from '../storeUtils/asyncActions';

export const Component = (store: Store<{}>) => (identifier: string) => {

    abstract class AsynchronousComponent<P extends IAsyncState, S> extends React.Component<P, S> {
        constructor(props) {
            super(props);
        }

        promise: () => Promise<any>;
        renderError: () => JSX.Element;
        renderLoading: () => JSX.Element;
        renderSuccess: () => JSX.Element;

        static setLoading = () => {
            store.dispatch(setLoading(identifier));                          
        }

        static setError = () => {
            store.dispatch(setError(identifier));
        }

        static setSuccess = () => {
            store.dispatch(setSuccess(identifier));
        }

        render() {
            const {renderError, renderLoading, renderSuccess, props: {isLoading, hasError}} = this;

            if (!this.promise) {
                throw new Error(MISSING_PROMISE);
            }

            if (!renderError || !renderLoading || !renderSuccess) {
                throw new Error(INVALID_IMPLEMENTATION_ASYNC);
            }

            if (this.props.isLoading) {
                return renderLoading();
            }

            if (this.props.hasError) {
                return renderError();
            }

            return renderSuccess();
        }
    }
    
    return connect(state => {
        return state.async.get('identifier');
    })(AsynchronousComponent as any);
};

/*export class ComponentImpl<P extends IAsyncState, S> extends React.Component<P, S> {

    constructor(props) {
        super(props)
    }

    static identifier: string;
    promise: () => Promise<any>;
    renderError: () => JSX.Element;
    renderLoading: () => JSX.Element;
    renderSuccess: () => JSX.Element;

    static setLoading = () => {

    }

    static setError = () => {

    }

    static setSuccess = () => {

    }

    mapStateToProps = (state) => {
        const {constructor: {identifier}} = this;
        return state.async.get(identifier);
    }

    render() {
        const {renderError, renderLoading, renderSuccess, props: {isLoading, hasError}} = this;

        if (!renderError || !renderLoading || !renderSuccess) {
            throw new Error(INVALID_IMPLEMENTATION_ASYNC);
        }

        if (this.props.isLoading) {
            return renderLoading();
        }

        if (this.props.hasError) {
            return renderError();
        }

        return renderSuccess();
    }
}

export const Component = connect()*/