import React from 'react';
import { shape, string } from 'prop-types';
import { Link } from '@vitissimo/theme/lib/drivers';

import classes from './infoBlock.css';

const InfoBlock = () => {
    return (
        <div className={classes.root}>
            <h3>Info</h3>
            <ul>
                <li>
                    <Link to="/over-ons">Over Vitissimo</Link>
                </li>
                <li>
                    <Link to="/teamwear">Teamwear</Link>
                </li>
                <li>
                    <Link to="/contacteer-ons">Contacteer Ons</Link>
                </li>
            </ul>
        </div>
    );
};

InfoBlock.propTypes = {
    classes: shape({
        root: string
    })
};

export default InfoBlock;
