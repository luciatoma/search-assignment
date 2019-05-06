import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import windowSize from 'react-window-size';

import theme from '../../../themes/default';
import magnifyingGlassIcon from '../../../images/magnifying-glass.svg';
import loadingIcon from '../../../images/loading-indicator.svg';
import clearIcon from '../../../images/clear.svg';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
`;

const StyledInput = styled.input`
    background: ${props => (props.focus ? theme.color.white : theme.color.gray1)};
    border-radius: 8px;
    -webkit-box-shadow: ${props =>
        props.focus ? '0 1px 2px 0 rgba(0, 19, 25, 0.16), 0 4px 12px 0 rgba(0, 19, 25, 0.08)' : 'none'};
    -moz-box-shadow: ${props => (props.focus ? '0 1px 2px 0 rgba(0, 19, 25, 0.16), 0 4px 12px 0 rgba(0, 19, 25, 0.08)' : 'none')};
    box-shadow: ${props => (props.focus ? '0 1px 2px 0 rgba(0, 19, 25, 0.16), 0 4px 12px 0 rgba(0, 19, 25, 0.08)' : 'none')};
    color: ${theme.color.black};
    font-family: ${theme.typeFamily.sans};
    font-size: 18px;
    line-height: 18px;
    padding: 15px 15px 15px 52px;
    width: 100%;

    &:focus {
        outline: none;
    }
`;

const Icon = styled.img`
    position: absolute;

    @keyframes spinner {
        to {transform: rotate(360deg);}
    }

    ${props =>
        props.magnify &&
        css`
            cursor: pointer;
            height: 22px;
            left: 15px;
            opacity: ${props.focus ? '1' : '0.4'};
            top: 16px;
            width: 22px;
        `}

        ${props =>
            props.loading &&
            css`
                animation: spinner 0.8s linear infinite;
                height: 18px;
                right: 16px;
                top: 17px;
                width: 18px;
            `}

    ${props =>
        props.clear &&
        css`
            cursor: pointer;
            height: 18px;
            opacity: 0.4;
            right: 16px;
            top: 17px;
            width: 18px;

            &:hover {
                opacity: 1;
            }
        `}
`;

class SearchBar extends Component {
    constructor() {
        super();

        this.state = {
            focus: false,
            value: '',
        };

        this.input = React.createRef();
    }

    onFocus = () => {
        this.setState({ focus: true });
    };

    onBlur = () => {
        const { value } = this.state;
        if (!value) return this.setState({ focus: false });
        return null;
    };

    handleKeyPressEnter = target => {
        if (target.keyCode === 13) {
            if (target.target.value) this.handleSearch();
        }
    };

    handleChange = value => {
        this.setState({ value });
    };

    handleSearch = () => {
        const { onQueryChange } = this.props;
        const { value } = this.state;
        onQueryChange && onQueryChange(value);
    };

    handleClear = () => {
        // Clear the value and refocus the field
        this.setState({ value: '' }, () => {
            this.input.current.focus();
            this.handleSearch();
        });
    };

    render() {
        const { loading, windowWidth } = this.props;
        const { focus, value } = this.state;

        return (
            <Wrapper>
                <StyledInput
                    ref={this.input}
                    type="text"
                    placeholder={windowWidth > 480 ? 'Search by artist, gallery, style, theme, tag, etc.' : 'Search...'}
                    value={value}
                    focus={focus}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChange={e => this.handleChange(e.target.value)}
                    onKeyDown={this.handleKeyPressEnter}
                />
                <Icon magnify src={magnifyingGlassIcon} alt="Search" focus={focus} onClick={this.handleSearch} />
                {loading && <Icon loading src={loadingIcon} alt="Loading" />}
                {value && !loading && <Icon clear className="clearIcon" src={clearIcon} alt="Clear" onClick={this.handleClear} />}
            </Wrapper>
        );
    }
}

SearchBar.propTypes = {
    loading: PropTypes.bool,
    onQueryChange: PropTypes.func.isRequired,
    windowWidth: PropTypes.number,
};

export default windowSize(SearchBar);
