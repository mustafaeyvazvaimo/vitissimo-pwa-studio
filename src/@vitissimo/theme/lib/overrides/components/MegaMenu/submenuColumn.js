import React from 'react';
import PropTypes from 'prop-types';

import { Link, resourceUrl } from '@vitissimo/theme/lib/drivers';

import classes from './submenuColumn.css';

const SubmenuColumn = props => {
    const { category } = props;

    const categoryUrl = resourceUrl(
        `/${category.url_path}${category.url_suffix || ''}`
    );
    let children = null;

    if (category.children.length) {
        const childrenItems = category.children.map((category, index) => {
            const { url_path, url_suffix, isActive, name } = category;
            const categoryUrl = resourceUrl(`/${url_path}${url_suffix || ''}`);

            return (
                <li key={index} className={classes.subMenuItem}>
                    <Link
                        className={isActive ? classes.active : classes.link}
                        to={categoryUrl}
                    >
                        {name}
                    </Link>
                </li>
            );
        });

        children = <ul className={classes.subMenu}>{childrenItems}</ul>;
    }

    return (
        <div className={classes.root}>
            <Link className={classes.link} to={categoryUrl}>
                <h3 className={classes.heading}>{category.name}</h3>
            </Link>
            <div className={classes.subMenuWrap}>{children}</div>
        </div>
    );
};

export default SubmenuColumn;

SubmenuColumn.propTypes = {
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
    }).isRequired
};
