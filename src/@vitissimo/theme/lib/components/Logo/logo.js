import React from 'react';
import { shape, string } from 'prop-types';
import classes from './logo.css';
import sportLogo from '../../../assets/images/Sport_2000_logo.png';

const Logo = props => {
    const { logo } = props;
    return (
        <div className={classes.root}>
            <img
                className={classes.sportlogo}
                src={sportLogo}
                alt="Logo Sport 2000"
            />
            <img className={classes.logo} src={logo} alt="Logo Vitissimo" />
        </div>
    );
};

Logo.propTypes = {
    classes: shape({
        root: string,
        logo: string
    })
};

export default Logo;
