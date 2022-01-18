import React from 'react';
import { shape, string } from 'prop-types';
import { Link } from '@vitissimo/theme/lib/drivers';

import { useMegaMenu } from '@magento/peregrine/lib/talons/MegaMenu/useMegaMenu';

import classes from './siteMap.css';

const SiteMap = () => {
    const { megaMenuData } = useMegaMenu();

    const siteMapItems =
        megaMenuData.children && megaMenuData.children.length
            ? megaMenuData.children.map(item => {
                  return (
                      <li key={item.id}>
                          <Link to={'/' + item.url_path + item.url_suffix}>
                              {item.name}
                          </Link>
                      </li>
                  );
              })
            : null;

    return (
        <div className={classes.root}>
            <h3>Sitemap</h3>
            <ul>{siteMapItems}</ul>
        </div>
    );
};

SiteMap.propTypes = {
    classes: shape({
        root: string
    })
};

export default SiteMap;
