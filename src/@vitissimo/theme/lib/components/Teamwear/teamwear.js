import React from 'react';
import { shape, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import { Link } from '@vitissimo/theme/lib/drivers';

import { useTeamwear } from './useTeamwear';
import { useUserContext } from '@magento/peregrine/lib/context/user';

import TeamwearItem from './teamwearItem';

import classes from './teamwear.css';
import MyClub from '../MyClub';

const Teamwear = props => {
    const [{ isSignedIn }] = useUserContext();
    const { formatMessage } = useIntl();
    const { teamwearData } = useTeamwear();

    const teams =
        teamwearData && teamwearData.children ? (
            teamwearData.children.map(category => (
                <div className={classes.category_container} key={category.id}>
                    <h1 className={classes.category_title}>{category.name}</h1>
                    <ul className={classes.teams_container}>
                        {category.children.map(team => (
                            <TeamwearItem key={team.id} team={team} />
                        ))}
                    </ul>
                </div>
            ))
        ) : (
            <div>
                <FormattedMessage
                    id={'teamwear.noTeams'}
                    defaultMessage={
                        'Sorry! We hebben geen teams kunnen vinden.'
                    }
                />
            </div>
        );

    const mijnClub = isSignedIn && <MyClub />;

    const aanmelden = (
        <Link to="/aanmelden">
            <FormattedMessage
                id={'teamwear.teamLoginLink'}
                defaultMessage={'Meld u aan'}
            />
        </Link>
    );

    const teamMember = isSignedIn ? (
        <p className={classes.signin}>
            {formatMessage(
                {
                    id: 'teamwear.teamName',
                    defaultMessage: 'Ga naar {team} om producten te bestellen.'
                },
                {
                    team: mijnClub
                }
            )}
        </p>
    ) : (
        <p className={classes.signin}>
            {formatMessage(
                {
                    id: 'teamwear.teamLogin',
                    defaultMessage:
                        '{login} om producten van uw club te bestellen.'
                },
                {
                    login: aanmelden
                }
            )}
        </p>
    );

    return (
        <div className={classes.root}>
            {teamMember}
            {teams}
        </div>
    );
};

Teamwear.propTypes = {
    classes: shape({
        root: string,
        category_container: string,
        category_title: string,
        teams_container: string,
        signin: string
    })
};

export default Teamwear;
