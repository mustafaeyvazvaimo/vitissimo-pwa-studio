import React from 'react';
import PropTypes from 'prop-types';

import { Link, resourceUrl } from '@vitissimo/theme/lib/drivers';

import Submenu from './submenu';

import classes from './megaMenuItem.css';

const MegaMenuItem = props => {
    const { activeCategoryId, category } = props;
    const categoryUrl = resourceUrl(
        `/${category.url_path}${category.url_suffix || ''}`
    );

    const children = category.children.length ? (
        <Submenu items={category.children} />
    ) : null;
    const isActive = category.id === activeCategoryId;

    return (
        <div className={classes.root}>
            <Link
                className={isActive ? classes.active : classes.link}
                to={categoryUrl}
            >
                {category.name}
            </Link>
            {children}
        </div>
    );
};

export default MegaMenuItem;

MegaMenuItem.propTypes = {
    category: PropTypes.shape({
        children: PropTypes.array,
        id: PropTypes.number.isRequired,
        include_in_menu: PropTypes.number,
        isActive: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        path: PropTypes.array.isRequired,
        position: PropTypes.number.isRequired,
        url_path: PropTypes.string.isRequired,
        url_suffix: PropTypes.string
    }).isRequired,
    activeCategoryId: PropTypes.number
};
