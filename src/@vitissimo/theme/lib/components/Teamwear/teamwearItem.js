import React from 'react';
import { shape, string, number, array } from 'prop-types';

// import { Link, resourceUrl } from '@vitissimo/theme/lib/drivers';

import classes from './teamwearItem.css';

const TeamwearItem = props => {
    const { team } = props;

    // const teamUrl = resourceUrl(`/${team.url_path}${team.url_suffix || ''}`);

    return (
        <li className={classes.team}>
            {/* <Link to={teamUrl} className={classes.link}> */}
            <div className={classes.link}>
                <div
                    className={classes.team_logo}
                    style={{ backgroundImage: `url(${team.image})` }}
                />
                <div className={classes.team_description}>
                    <h3 className={classes.team_name}>{team.name}</h3>
                    <div
                        className={classes.team_address}
                        dangerouslySetInnerHTML={{ __html: team.description }}
                    />
                </div>
            </div>
            {/* </Link> */}
        </li>
    );
};

TeamwearItem.propTypes = {
    classes: shape({
        team: string,
        team_logo: string,
        team_description: string,
        team_name: string,
        team_address: string
    }),
    team: shape({
        name: string.isRequired,
        path: array.isRequired,
        position: number.isRequired,
        url_path: string.isRequired,
        url_suffix: string.isRequired,
        image: string.isRequired,
        description: string.isRequired
    }).isRequired
};

export default TeamwearItem;
