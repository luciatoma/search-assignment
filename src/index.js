import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import './index.css';
import config from './config';

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
