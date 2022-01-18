import React from 'react';
import { func, shape, string } from 'prop-types';

import { useAddToListButton } from '@magento/peregrine/lib/talons/Wishlist/AddToListButton/useAddToListButton';

import { HeartIcon } from '@vitissimo/theme/lib/components/Icons';
import { useCommonToasts } from './useCommonToasts';

import classes from './wishlistButton.css';

const heartIcon = <HeartIcon color="#EC0008" size={18} />;
const heartFilledIcon = <HeartIcon fill="#EC0008" color="#EC0008" size={18} />;

const WishlistButton = props => {
    const talonProps = useAddToListButton(props);

    const {
        buttonProps,
        buttonText,
        errorToastProps,
        isSelected,
        loginToastProps,
        successToastProps
    } = talonProps;

    useCommonToasts({ errorToastProps, loginToastProps, successToastProps });

    const buttonClass = isSelected ? classes.root_selected : classes.root;
    const icon = isSelected ? heartFilledIcon : heartIcon;

    return (
        <button className={buttonClass} {...buttonProps}>
            {icon} <span>{buttonText}</span>
        </button>
    );
};

export default WishlistButton;

WishlistButton.propTypes = {
    afterAdd: func,
    beforeAdd: func,
    classes: shape({
        root: string,
        root_selected: string
    })
};
