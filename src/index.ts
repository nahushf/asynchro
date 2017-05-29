import { IAsyncState } from './interfaces';
import * as React from 'react';

export abstract class Asynchro<T> {
    constructor(public store) {
        if (!store) {

        }
    }

    // tslint:disable-next-line:variable-name
    Component = class <P extends IAsyncState, S> extends React.Component<P, S> {
        constructor(props) {
            super(props);
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
}
