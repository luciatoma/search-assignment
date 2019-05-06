import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from '../../../themes/default';
import Item from './Item';

const Wrapper = styled.div`
    width: 100%;
`;

const EmptyResults = styled.div`
    font-family: font-family: ${theme.typeFamily.sans};
    margin-top: 30px;
`;

// Component displaying list with all search results
// Using index because there's nothing to uniquely identify the result in the response
/* eslint-disable react/no-array-index-key */
const SearchResults = ({ filters, results }) => {
    if (results.length === 0) {
        return <EmptyResults>No results found</EmptyResults>;
    }

    return (
        <Wrapper>
            {results.map((item, index) => {
                const result = item.node;
                return (
                    <Item key={index} label={result.displayLabel} filters={filters} image={result.imageUrl} link={result.href} />
                );
            })}
        </Wrapper>
    );
};

SearchResults.propTypes = {
    filters: PropTypes.array,
    results: PropTypes.array.isRequired,
};

export default SearchResults;
