import React from 'react';
import { shape, string } from 'prop-types';

import classes from './socialMediaIcon.css';

const SocialMediaIcon = props => {
    const { link, src } = props;

    return (
        <a className={classes.root} href={link} target="_blank">
            <img src={src} alt="Social Media Icon" />
        </a>
    );
};

SocialMediaIcon.propTypes = {
    classes: shape({
        root: string
    })
};

export default SocialMediaIcon;
