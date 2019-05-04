import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import theme from '../../../themes/default';
import magnifyingGlassIcon from '../../../images/magnifying-glass.svg';
import clearIcon from '../../../images/clear.svg';

const Wrapper = styled.div`
    max-width: 512px;
    position: relative;
    width: 100%;
`;

const StyledInput = styled.input`
    background: ${props => (props.focus ? theme.color.white : theme.color.gray1)};
    border-radius: 8px;
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
    cursor: pointer;
    position: absolute;

    ${props =>
        props.magnify &&
        css`
            height: 22px;
            left: 15px;
            opacity: ${props.focus ? '1' : '0.4'};
            top: 16px;
            width: 22px;
        `}

    ${props =>
        props.clear &&
        css`
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

    handleChange = value => {
        this.setState({ value });
    };

    handleSearch = () => {
        const { searchValue } = this.props;
        const { value } = this.state;
        searchValue && searchValue(value);
    };

    handleClear = () => {
        this.setState({ value: '' }, () => {
            this.input.current.focus();
        });
    };

    render() {
        const { focus, value } = this.state;
        console.log('value', value, focus);
        return (
            <Wrapper>
                <StyledInput
                    ref={this.input}
                    type="text"
                    placeholder="Search by artist, gallery, style, theme, tag, etc."
                    value={value}
                    focus={focus}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChange={e => this.handleChange(e.target.value)}
                />
                <Icon magnify src={magnifyingGlassIcon} alt="Search" focus={focus} onClick={this.handleSearch} />
                {value && <Icon clear className="clearIcon" src={clearIcon} alt="Clear" onClick={this.handleClear} />}
            </Wrapper>
        );
    }
}

SearchBar.propTypes = {
    searchValue: PropTypes.func.isRequired,
};

export default SearchBar;
