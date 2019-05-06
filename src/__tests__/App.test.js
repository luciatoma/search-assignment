import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';

import App from '../App';

/* global document */

it('renders without crashing and matches snapshot', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MockedProvider>
            <App />
        </MockedProvider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
    const tree = renderer
        .create(
            <MockedProvider>
                <App />
            </MockedProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
