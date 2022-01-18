import React from 'react';

import { Link } from '@vitissimo/theme/lib/drivers';

import classes from './tag.css';

const tagUrlSuffix = '.html';

const Tag = props => {
    const { value } = props;

    const { name, url_path } = value;
    const url = `/${url_path}${tagUrlSuffix}`;

    return (
        <button className={classes.root} type="button">
            <Link className={classes.link} to={url}>
                {name}
            </Link>
        </button>
    );
};

export default Tag;
