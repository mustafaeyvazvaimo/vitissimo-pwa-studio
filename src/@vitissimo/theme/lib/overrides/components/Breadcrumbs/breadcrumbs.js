import React, { Fragment, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { number, string } from 'prop-types';
import { Link, resourceUrl } from '@vitissimo/theme/lib/drivers';

import { useBreadcrumbs } from '@magento/peregrine/lib/talons/Breadcrumbs/useBreadcrumbs';

import classes from './breadcrumbs.css';

const DELIMITER = '>';

const Breadcrumbs = props => {
    const { categoryId, currentProduct } = props;

    const talonProps = useBreadcrumbs({ categoryId });

    const {
        currentCategory,
        currentCategoryPath,
        hasError,
        isLoading,
        normalizedData
    } = talonProps;

    // For all links generate a fragment like "/ Text"
    const links = useMemo(() => {
        return normalizedData.map(({ text, path }) => {
            return (
                <Fragment key={text}>
                    <span className={classes.divider}>{DELIMITER}</span>
                    <Link className={classes.link} to={resourceUrl(path)}>
                        {text}
                    </Link>
                </Fragment>
            );
        });
    }, [classes.divider, classes.link, normalizedData]);

    // Don't display anything but the empty, static height div when loading or
    // if there was an error.
    if (isLoading || hasError) {
        return <div className={classes.root} />;
    }

    // If we have a "currentProduct" it means we're on a PDP so we want the last
    // category text to be a link. If we don't have a "currentProduct" we're on
    // a category page so it should be regular text.
    const currentCategoryLink = currentProduct ? (
        <Link className={classes.link} to={resourceUrl(currentCategoryPath)}>
            {currentCategory}
        </Link>
    ) : (
        <span className={classes.currentCategory}>{currentCategory}</span>
    );

    const currentProductNode = currentProduct ? (
        <Fragment>
            <span className={classes.divider}>{DELIMITER}</span>
            <span className={classes.text}>{currentProduct}</span>
        </Fragment>
    ) : null;

    return (
        <div className={classes.root}>
            <Link className={classes.link} to="/">
                <FormattedMessage id={'global.home'} defaultMessage={'Home'} />
            </Link>
            {links}
            <span className={classes.divider}>{DELIMITER}</span>
            {currentCategoryLink}
            {currentProductNode}
        </div>
    );
};

export default Breadcrumbs;

Breadcrumbs.propTypes = {
    categoryId: number.isRequired,
    currentProduct: string
};
