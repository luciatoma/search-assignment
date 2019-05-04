import React from 'react';
import styled from 'styled-components';
import SearchBar from '../../generic/SearchBar';
import FiltersList from '../../generic/FiltersList';

const StyledWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 64px 20px;
`;

const Home = () => {
    const searchValue = value => {
        console.log('search', value);
    };

    const filterValues = filters => {
        console.log('filters', filters);
    };

    return (
        <StyledWrapper>
            <SearchBar searchValue={value => searchValue(value)} />
            <FiltersList filterValues={filters => filterValues(filters)} />
        </StyledWrapper>
    );
};

export default Home;
