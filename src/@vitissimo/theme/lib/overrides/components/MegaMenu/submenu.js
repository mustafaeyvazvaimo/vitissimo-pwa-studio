import React from 'react';
import PropTypes from 'prop-types';

import SubmenuColumn from './submenuColumn';

import classes from './submenu.css';

const SubMenu = props => {
    const { items } = props;

    const subMenus = items.map(category => {
        return <SubmenuColumn category={category} key={category.id} />;
    });

    return (
        <div className={classes.root}>
            <div className={classes.menuItems}>{subMenus}</div>
        </div>
    );
};

export default SubMenu;

SubMenu.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            children: PropTypes.array.isRequired,
            id: PropTypes.number.isRequired,
            include_in_menu: PropTypes.number.isRequired,
            isActive: PropTypes.bool.isRequired,
            name: PropTypes.string.isRequired,
            path: PropTypes.array.isRequired,
            position: PropTypes.number.isRequired,
            url_path: PropTypes.string.isRequired,
            url_suffix: PropTypes.string
        })
    ).isRequired
};
