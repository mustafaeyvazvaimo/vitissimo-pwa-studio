import React from 'react';
import { shape, string } from 'prop-types';

import { useMegaMenu } from '@magento/peregrine/lib/talons/MegaMenu/useMegaMenu';

import MegaMenuItem from '@magento/venia-ui/lib/components/MegaMenu/megaMenuItem';

import Menu from '../../../components/Menu';

import classes from './megaMenu.css';

const MegaMenu = () => {
    const { megaMenuData, activeCategoryId } = useMegaMenu();

    const items =
        megaMenuData.children && megaMenuData.children.length
            ? megaMenuData.children.map(category => {
                  return (
                      <MegaMenuItem
                          category={category}
                          activeCategoryId={activeCategoryId}
                          key={category.id}
                      />
                  );
              })
            : null;

    return (
        <nav className={classes.root} role="navigation">
            <div className={classes.megaMenu}>
                <ul className={classes.menuItemList}>{items}</ul>
            </div>
            <div className={classes.menu}>
                <Menu />
            </div>
        </nav>
    );
};

MegaMenu.propTypes = {
    classes: shape({
        root: string,
        megaMenu: string,
        menuItemList: string,
        menu: string
    })
};

export default MegaMenu;
