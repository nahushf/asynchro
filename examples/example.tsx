import * as React from 'react';
import {render} from 'react-dom';
import { Async } from "./index";

export class Test extends React.Component<{}, {}> {
    render() {
        return(
            <div>
                <h1>TESTTETEST</h1>
            <Async />
            </div>
        );
    }
}

render(<h1>HIIIII</h1>, document.getElementsByClassName('main-container')[0])
