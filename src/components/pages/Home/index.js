import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { ApolloConsumer } from 'react-apollo';

import theme from '../../../themes/default';
import SearchBar from '../../generic/SearchBar';
import FiltersList from '../../generic/FiltersList';
import SearchResults from '../../generic/SearchResults';
import { SEARCH_ITEMS } from './queries/search';

const MainWrapper = styled.div`
    overflow: scroll;
    height: 100vh;
`;

const Container = styled.div`
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

// Home page component
class Home extends Component {
    constructor() {
        super();

        this.state = {
            error: null,
            filters: [],
            loading: false,
            query: null,
            pageInfo: null,
            results: null,
        };

        this.client = null;
        this.resultsWrapper = React.createRef();
    }

    // Handle search input value
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

    // Get search results
    getData = async () => {
        const { filters, query, pageInfo, results } = this.state;
        if (query && this.client) {
            this.setState({ loading: true, error: null });
            try {
                const variables = { query, entities: filters };

                // Handle pagination if needed
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

    // Handle infinite scroll on page results
    handleScroll = () => {
        const { loading, pageInfo } = this.state;

        // If we're less than 150px from the bottom, trigger the pagination
        if (this.resultsWrapper.current) {
            const { scrollTop, clientHeight, scrollHeight } = this.resultsWrapper.current;
            if (scrollTop + clientHeight >= scrollHeight - 150 && !loading && pageInfo.hasNextPage) {
                this.getData();
            }
        }
    };

    // Handle selected filters
    onFiltersChange = filters => this.setState({ filters, pageInfo: null }, this.getData);

    render() {
        const { error, filters, loading, results } = this.state;

        return (
            <ApolloConsumer>
                {client => {
                    this.client = client;
                    return (
                        <MainWrapper ref={this.resultsWrapper} onScroll={this.handleScroll}>
                            <Container>
                                <SearchBar onQueryChange={this.onQueryChange} loading={loading} />
                                {error && <StyledError>{error}</StyledError>}
                                {results && (
                                    <Fragment>
                                        <FiltersList filters={filters} onFiltersChange={this.onFiltersChange} />
                                        <SearchResults filters={filters} results={results} />
                                    </Fragment>
                                )}
                            </Container>
                        </MainWrapper>
                    );
                }}
            </ApolloConsumer>
        );
    }
}

export default Home;
