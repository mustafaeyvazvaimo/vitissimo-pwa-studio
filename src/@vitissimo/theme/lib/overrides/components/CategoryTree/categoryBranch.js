import React from 'react';
import { func, number, shape, string } from 'prop-types';

import { useCategoryBranch } from '@magento/peregrine/lib/talons/CategoryTree';

import { ChevronRightIcon } from '../../../components/Icons';

import classes from './categoryBranch.css';

const Branch = props => {
    const { category, setCategoryId } = props;
    const { name } = category;

    const talonProps = useCategoryBranch({ category, setCategoryId });
    const { exclude, handleClick } = talonProps;

    if (exclude) {
        return null;
    }

    return (
        <li className={classes.root}>
            <button
                className={classes.target}
                type="button"
                onClick={handleClick}
            >
                <span className={classes.text}>{name}</span>
                <span>
                    <ChevronRightIcon />
                </span>
            </button>
        </li>
    );
};

export default Branch;

Branch.propTypes = {
    category: shape({
        id: number.isRequired,
        include_in_menu: number,
        name: string.isRequired
    }).isRequired,
    classes: shape({
        root: string,
        target: string,
        text: string
    }),
    setCategoryId: func.isRequired
};
