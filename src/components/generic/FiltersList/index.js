import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import theme from '../../../themes/default';

const availableFilters = [
    'ARTIST',
    'ARTWORK',
    'ARTICLE',
    'CITY',
    'COLLECTION',
    'FAIR',
    'FEATURE',
    'GALLERY',
    'GENE',
    'INSTITUTION',
    'PROFILE',
    'SALE',
    'SHOW',
    'TAG',
];

const StyledFilterWrapper = styled.div`
    align-items: center;
    display: flex;
    margin-top: 16px;
    position: relative;
    width: 100%;
`;

const Wrapper = styled.div`
    display: flex;
    overflow: auto;

    ::-webkit-scrollbar {
        display: none;
    }

    scrollbar-width: none;
`;

const StyledList = styled.div`
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
`;

const StyledFilter = styled.span`
    background: ${theme.color.gray1};
    border-radius: 8px;
    color: ${theme.color.black};
    cursor: pointer;
    display: flex;
    flex: 0 0 auto;
    font-family: ${theme.typeFamily.sans};
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 22px;
    margin-right: 16px;
    padding: 11px 17px;
    text-transform: capitalize;

    &:last-of-type {
        margin-right: 0;
    }

    ${props =>
        props.active &&
        css`
            color: ${theme.color.white};
            font-weight: bold;
            letter-spacing: 0.4px;
            background-image: linear-gradient(0deg, ${theme.color.blue1} 3%, ${theme.color.blue2} 100%);
            text-shadow: 0 1px 0 rgba(0, 19, 25, 0.08);
        `}
`;

const ShadowSpan = styled.span`
    background: ${theme.color.white};
    height: 100%;
    position: absolute;

    ${props =>
        props.shadowLeft &&
        css`
            border-top-right-radius: 50%;
            border-bottom-right-radius: 50%;
            box-shadow: ${props.shadowLeft ? `5px 0 13px 12px ${theme.color.white}` : 'none'};
            left: 0;
            width: ${props.shadowLeft / 2}px;
        `}

    ${props =>
        props.shadowRight &&
        css`
            border-top-left-radius: 50%;
            border-bottom-left-radius: 50%;
            box-shadow: ${props.shadowRight ? `-5px 0 13px 12px ${theme.color.white}` : 'none'};
            right: 0;
            width: ${props.shadowRight / 2}px;
        `}
`;

class FiltersList extends Component {
    constructor() {
        super();

        this.state = {
            shadowLeft: 0,
            shadowRight: 0,
        };

        this.wrapper = React.createRef();
        this.list = React.createRef();
        this.activeItem = React.createRef();
    }

    componentDidMount() {
        this.handleScroll();
    }

    handleScroll = () => {
        const scrollLeft = this.wrapper && this.wrapper.current && this.wrapper.current.scrollLeft;
        const listWidth = this.list && this.list.current && this.list.current.offsetWidth;
        const wrapperWidth = this.wrapper && this.wrapper.current && this.wrapper.current.offsetWidth;
        const listScrollOutsideWrapper = wrapperWidth + scrollLeft;
        const rightScroll = listWidth - listScrollOutsideWrapper;

        if (scrollLeft < 25) this.setState({ shadowLeft: scrollLeft });

        if (listScrollOutsideWrapper >= wrapperWidth && rightScroll > 25) {
            this.setState({ shadowRight: 25 });
        } else if (listScrollOutsideWrapper >= wrapperWidth && rightScroll <= 25) {
            this.setState({ shadowRight: rightScroll });
        }

        return null;
    };

    handleFilter = (item, e) => {
        const { onFiltersChange, filters } = this.props;

        // Scroll the filter into view
        e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        let activeFiltersClone = [...filters];
        if (!activeFiltersClone.includes(item)) {
            activeFiltersClone.push(item);
        } else if (activeFiltersClone.includes(item)) {
            activeFiltersClone = activeFiltersClone.filter(elem => elem !== item);
        }
        this.setState({ activeFilters: activeFiltersClone });
        onFiltersChange && onFiltersChange(activeFiltersClone);
    };

    render() {
        const { shadowLeft, shadowRight } = this.state;
        const { filters } = this.props;

        return (
            <StyledFilterWrapper>
                <ShadowSpan shadowLeft={shadowLeft} />
                <Wrapper ref={this.wrapper} onScroll={this.handleScroll}>
                    <StyledList ref={this.list}>
                        {availableFilters.map(item => (
                            <StyledFilter
                                title={item.toLowerCase()}
                                active={filters && filters.includes(item)}
                                key={item}
                                onClick={e => this.handleFilter(item, e)}
                            >
                                {item.toLowerCase()}
                            </StyledFilter>
                        ))}
                    </StyledList>
                </Wrapper>
                <ShadowSpan shadowRight={shadowRight} />
            </StyledFilterWrapper>
        );
    }
}

FiltersList.propTypes = {
    onFiltersChange: PropTypes.func.isRequired,
    filters: PropTypes.array,
};

export default FiltersList;
