import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import config from '../../../config';
import theme from '../../../themes/default';
import imgPlaceholder from '../../../images/photo.svg';

const ItemWrapper = styled.a`
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-top: 30px;
    position: relative;
    width: 100%;
`;

const ItemDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 92px);
`;

const StyledLabel = styled.span`
    color: ${theme.color.black};
    font-family: ${theme.typeFamily.sans};
    font-size: 18px;
    line-height: 24px;

    @media (min-width: 992px) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const StyledInfo = styled.span`
    color: ${theme.color.gray2};
    font-family: ${theme.typeFamily.sans};
    font-size: 16px;
    letter-spacing: 0;
    line-height: 22px;
    text-transform: capitalize;
`;

const ImgPlaceholder = styled.span`
    background: ${theme.color.gray1} url(${imgPlaceholder}) no-repeat center;
    border-radius: 50%;
    height: 48px;
    margin-left: auto;
    margin-right: 16px;
    width: 48px;
`;

const StyledAvatar = styled.img`
    border-radius: 50%;
    height: 48px;
    margin-left: auto;
    margin-right: 16px;
    width: 48px;
`;

const Item = props => {
    const { image, filters, label, link } = props;

    return (
        <ItemWrapper href={`${config.baseUrl}${link}`} target="_blank" title={label}>
            <ItemDetails>
                <StyledLabel>{label}</StyledLabel>
                <StyledInfo>{filters.join(', ').toLowerCase()}</StyledInfo>
            </ItemDetails>
            {image ? <StyledAvatar src={image} alt="result" /> : <ImgPlaceholder />}
        </ItemWrapper>
    );
};

Item.propTypes = {
    image: PropTypes.string,
    filters: PropTypes.array,
    label: PropTypes.string,
    link: PropTypes.string,
};

export default Item;
