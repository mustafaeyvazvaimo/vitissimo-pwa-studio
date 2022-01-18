import React from 'react';
import { shape, string } from 'prop-types';
import classes from './bar.css';

const BarImage = props => {
    const { img } = props;
    return (
        <div className={classes.root}>
            <img src={img} alt="Sport 2000 bar" />
        </div>
    );
};

BarImage.propTypes = {
    classes: shape({
        root: string
    })
};

export default BarImage;
