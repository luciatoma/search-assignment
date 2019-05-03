import React from 'react';
import styled from 'styled-components';
import SearchBar from '../../generic/SearchBar';

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 64px 20px;
`;

const Home = () => {
    return (
        <StyledWrapper>
            <SearchBar />
        </StyledWrapper>
    );
};

export default Home;
