import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import config from '../../../config';
import theme from '../../../themes/default';

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
    scrollbar-width: none;

    ::-webkit-scrollbar {
        display: none;
    }
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
            background-image: linear-gradient(0deg, ${theme.color.blue1} 3%, ${theme.color.blue2} 100%);
            color: ${theme.color.white};
            font-weight: bold;
            letter-spacing: 0.4px;
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

// Component displaying available filters
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

    // Handle filters list margin shadows when filter elements are outside of its container.
    handleScroll = () => {
        const scrollLeft = this.wrapper && this.wrapper.current && this.wrapper.current.scrollLeft;
        const listWidth = this.list && this.list.current && this.list.current.offsetWidth;
        const wrapperWidth = this.wrapper && this.wrapper.current && this.wrapper.current.offsetWidth;
        const listScrollOutsideWrapper = wrapperWidth + scrollLeft;
        const rightScroll = listWidth - listScrollOutsideWrapper;

        // If filter list has scrolled to left with a value smaller than 25px,
        // then use value to increase left shadow of the list.
        if (scrollLeft < 25) this.setState({ shadowLeft: scrollLeft });

        // If filter list end is with more than 25px outside of its container, then show right shadow to the list.
        // If filter list end is with less than 25px outside of its container,
        // use the value to decrease right shadow of the list.
        if (listScrollOutsideWrapper >= wrapperWidth && rightScroll > 25) {
            this.setState({ shadowRight: 25 });
        } else if (listScrollOutsideWrapper >= wrapperWidth && rightScroll <= 25) {
            this.setState({ shadowRight: rightScroll });
        }

        return null;
    };

    // Handle selected filters
    handleFilter = (item, e) => {
        const { onFiltersChange, filters } = this.props;

        // Scroll selected filter into view
        e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

        // Create array with selected filters
        let activeFiltersClone = [...filters];
        if (!activeFiltersClone.includes(item)) {
            activeFiltersClone.push(item);
        } else if (activeFiltersClone.includes(item)) {
            activeFiltersClone = activeFiltersClone.filter(elem => elem !== item);
        }
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
                        {config.availableFilters.map(item => (
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
