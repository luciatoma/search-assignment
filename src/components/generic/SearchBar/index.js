import React, { Component } from 'react';
import styled from 'styled-components';
import theme from '../../../themes/default';
import magnifyingGlassIcon from '../../../images/magnifying-glass.svg';

const Wrapper = styled.div`
    max-width: 512px;
    position: relative;
    width: 100%;
`;

const StyledInput = styled.input`
    border-radius: 8px;
    background: ${theme.color.gray1};
    font-family: ${theme.typeFamily.sans};
    font-size: 18px;
    line-height: 18px;
    padding: 15px 15px 15px 52px;
    width: 100%;

    &:focus {
        background: ${theme.color.white};
        box-shadow: 0 1px 2px 0 rgba(0, 19, 25, 0.16), 0 4px 12px 0 rgba(0, 19, 25, 0.08);
        outline: none;
    }
`;

const Icon = styled.img`
    height: 22px;
    left: 15px;
    opacity: ${props => (props.focus ? '1' : '0.4')};
    position: absolute;
    top: 16px;
    width: 22px;
`;

class SearchBar extends Component {
    constructor() {
        super();

        this.state = {
            focus: false,
        };
    }

    onFocus = () => {
        this.setState({ focus: true });
    };

    onBlur = () => {
        this.setState({ focus: false });
    };

    render() {
        const { focus } = this.state;
        return (
            <Wrapper>
                <StyledInput
                    type="text"
                    placeholder="Search by artist, gallery, style, theme, tag, etc."
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />
                <Icon src={magnifyingGlassIcon} alt="Search" focus={focus} />
            </Wrapper>
        );
    }
}

export default SearchBar;
