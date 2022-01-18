import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';
import { number, shape, string } from 'prop-types';

import { useCmsPage } from '@magento/peregrine/lib/talons/Cms/useCmsPage';

import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import { Meta, StoreTitle } from '@magento/venia-ui/lib/components/Head';
import RichContent from '@magento/venia-ui/lib/components/RichContent';
import CategoryList from '@magento/venia-ui/lib/components/CategoryList';

import classes from './cms.css';

const CMSPage = props => {
    const { id } = props;

    const talonProps = useCmsPage({ id });
    const {
        cmsPage,
        hasContent,
        rootCategoryId,
        shouldShowLoadingIndicator
    } = talonProps;
    const { formatMessage } = useIntl();

    if (shouldShowLoadingIndicator) {
        return fullPageLoadingIndicator;
    }

    if (hasContent) {
        const {
            content_heading,
            title,
            meta_title,
            meta_description,
            content
        } = cmsPage;

        const headingElement =
            content_heading !== '' ? (
                <h1 className={classes.heading}>{content_heading}</h1>
            ) : null;

        const pageTitle = meta_title || title;

        return (
            <Fragment>
                <StoreTitle>{pageTitle}</StoreTitle>
                <Meta name="title" content={pageTitle} />
                <Meta name="description" content={meta_description} />
                {headingElement}
                <RichContent html={content} />
            </Fragment>
        );
    }

    // Fallback to a category list if there is no cms content.
    return (
        <CategoryList
            title={formatMessage({
                id: 'cms.shopByCategory',
                defaultMessage: 'Shop by category'
            })}
            id={rootCategoryId}
        />
    );
};

CMSPage.propTypes = {
    id: number,
    classes: shape({
        heading: string
    })
};

export default CMSPage;
