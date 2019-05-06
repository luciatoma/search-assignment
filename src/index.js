import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import config from './config';
import './index.css';
import App from './App';

/* global document */

const client = new ApolloClient({
    uri: config.apiUrl,
});

const ApolloApp = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

ReactDOM.render(<ApolloApp />, document.getElementById('root'));
