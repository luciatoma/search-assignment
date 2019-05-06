import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { ApolloConsumer } from 'react-apollo';

import theme from '../../../themes/default';
import SearchBar from '../../generic/SearchBar';
import FiltersList from '../../generic/FiltersList';
import SearchResults from '../../generic/SearchResults';
import { SEARCH_ITEMS } from './queries/search';

const StyledWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 64px 20px;
    margin: auto;
    max-width: 512px;
    width: 100%;
`;

const StyledError = styled.span`
    color: ${theme.color.red};
    font-family: font-family: ${theme.typeFamily.sans};
    margin-top: 30px;
    text-align: center;
    width: 100%;
`;

class Home extends Component {
    constructor() {
        super();

        this.state = {
            filters: [],
            results: null,
            query: null,
            loading: false,
            error: null,
            pageInfo: null,
        };

        this.client = null;
        this.resultsWrapper = React.createRef();
    }

    onQueryChange = async query => {
        const newState = { query, pageInfo: null };

        // Clear the results and the filters if the cancel button was pressed
        if (!query) {
            newState.results = null;
            newState.filters = [];
            newState.error = null;
            newState.pageInfo = null;
        }
        this.setState(newState, this.getData);
    };

    getData = async () => {
        const { filters, query, pageInfo, results } = this.state;
        if (query && this.client) {
            this.setState({ loading: true, error: null });
            try {
                const variables = { query, entities: filters };
                if (pageInfo && pageInfo.hasNextPage) {
                    variables.cursor = pageInfo.endCursor;
                }
                const res = await this.client.query({
                    query: SEARCH_ITEMS,
                    variables,
                });
                const {
                    data: { search },
                } = res;

                const newState = { loading: false, results: search.edges, pageInfo: search.pageInfo };

                // If we already have results, merge them with the new ones, otherwise add them directly
                if (pageInfo && Array.isArray(results)) {
                    newState.results = [...results, ...search.edges];
                } else {
                    newState.results = search.edges;
                }

                this.setState(newState);
            } catch (error) {
                this.setState({ loading: false, error: error.message });
            }
        }
    };

    handleScroll = () => {
        const { loading, pageInfo } = this.state;

        if (this.resultsWrapper.current) {
            const { scrollTop, clientHeight, scrollHeight } = this.resultsWrapper.current;
            if (scrollTop + clientHeight >= scrollHeight - 150 && !loading && pageInfo.hasNextPage) {
                this.getData();
            }
        }
    };

    onFiltersChange = filters => this.setState({ filters, pageInfo: null }, this.getData);

    render() {
        const { results, loading, error, filters } = this.state;

        return (
            <ApolloConsumer>
                {client => {
                    this.client = client;
                    return (
                        <div
                            ref={this.resultsWrapper}
                            onScroll={this.handleScroll}
                            id="test"
                            style={{ height: '100vh', overflowY: 'scroll' }}
                        >
                            <StyledWrapper>
                                <SearchBar onQueryChange={this.onQueryChange} loading={loading} />
                                {error && <StyledError>{error}</StyledError>}
                                {results && (
                                    <Fragment>
                                        <FiltersList filters={filters} onFiltersChange={this.onFiltersChange} />
                                        <SearchResults filters={filters} results={results} />
                                    </Fragment>
                                )}
                            </StyledWrapper>
                        </div>
                    );
                }}
            </ApolloConsumer>
        );
    }
}

export default Home;
