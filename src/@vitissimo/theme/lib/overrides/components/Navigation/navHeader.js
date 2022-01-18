import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';
import { bool, func, shape, string } from 'prop-types';

import { useNavigationHeader } from '@magento/peregrine/lib/talons/Navigation/useNavigationHeader';

import Trigger from '@magento/venia-ui/lib/components/Trigger';

import {
    ArrowLeftIcon,
    CloseIcon
} from '@vitissimo/theme/lib/components/Icons';

import classes from './navHeader.css';

const leftArrow = <ArrowLeftIcon color="#ffffff" />;
const close = <CloseIcon color="#ffffff" />;

const NavHeader = props => {
    const { isTopLevel, onBack, view } = props;
    const { formatMessage } = useIntl();

    const talonProps = useNavigationHeader({
        isTopLevel,
        onBack,
        view
    });

    const { handleBack, isTopLevelMenu } = talonProps;

    const titles = {
        MENU: formatMessage({
            id: 'navHeader.mainMenuText',
            defaultMessage: 'Main Menu'
        })
    };

    let titleElement;
    const title = titles[view] || titles.MENU;
    titleElement = <span>{title}</span>;

    const backIcon = isTopLevelMenu ? close : leftArrow;

    return (
        <Fragment>
            <Trigger key="backButton" action={handleBack}>
                {backIcon}
            </Trigger>
            <h2 key="title" className={classes.title}>
                {titleElement}
            </h2>
        </Fragment>
    );
};

export default NavHeader;

NavHeader.propTypes = {
    classes: shape({
        title: string
    }),
    isTopLevel: bool,
    onBack: func.isRequired,
    view: string.isRequired
};
