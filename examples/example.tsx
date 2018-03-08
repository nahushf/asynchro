import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Async } from '../src/index';
import { store } from "./store";

export class Test extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <h1>TESTTETEST</h1>
                <Async
                    identifier="test"
                    promise={() => {
                        return new Promise(res => {
                            setTimeout(() => res(100), 4000)
                        })
                    }}
                    content={resp => <h1>{resp}</h1>}
                    loader={<span>....</span>}
                    error={<span>Could not resolve promise</span>}
                />
            </div>
        );
    }
}

render(
    <Provider store={store}>
        <Test />
    </Provider>,
    document.getElementsByClassName('main-container')[0])
