import React from 'react';
import CmsBlockGroup from '@magento/venia-ui/lib/components/CmsBlock';

const CustomCmsBlock = props => {
    const { identifier } = props;

    return <CmsBlockGroup identifiers={identifier} />;
};

export default CustomCmsBlock;
