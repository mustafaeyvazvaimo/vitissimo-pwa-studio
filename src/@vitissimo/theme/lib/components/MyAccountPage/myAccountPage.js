import React from 'react';
import { shape, string } from 'prop-types';
import { useIntl } from 'react-intl';

import { Redirect } from '@vitissimo/theme/lib/drivers';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';

import AccountMenuItems from '@magento/venia-ui/lib/components/AccountMenu/accountMenuItems';
import { useMyAccountPage } from './useMyAccountPage';

import classes from './myAccountPage.css';

const MyAccountPage = () => {
    const { isSignedIn, handleSignOut } = useMyAccountPage();
    const { formatMessage } = useIntl();

    if (!isSignedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div className={classes.root}>
            <StoreTitle>
                {formatMessage({
                    id: 'myAccountPage.title',
                    defaultMessage: 'Mijn Account'
                })}
            </StoreTitle>
            <div className={classes.contentContainer}>
                <AccountMenuItems onSignOut={handleSignOut} />
            </div>
        </div>
    );
};

MyAccountPage.propTypes = {
    classes: shape({
        root: string,
        contentContainer: string
    })
};

export default MyAccountPage;
