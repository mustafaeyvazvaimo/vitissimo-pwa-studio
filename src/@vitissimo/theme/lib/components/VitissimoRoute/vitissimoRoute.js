import React from 'react';
import { shape, string } from 'prop-types';

import { ExternalLinkIcon } from '../Icons';

import classes from './vitissimoRoute.css';

const VitissimoRoute = props => {
    const { link, linkText } = props;

    return (
        <a className={classes.root} href={link} target="_blank">
            {linkText} <ExternalLinkIcon size={10} />
        </a>
    );
};

VitissimoRoute.propTypes = {
    classes: shape({
        root: string
    })
};

export default VitissimoRoute;
