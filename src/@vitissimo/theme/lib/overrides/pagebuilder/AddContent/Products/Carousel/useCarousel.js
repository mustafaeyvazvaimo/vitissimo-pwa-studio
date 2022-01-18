import { useQuery } from '@apollo/client';

import { useCustomerWishlistSkus } from '@magento/peregrine/lib/hooks/useCustomerWishlistSkus/useCustomerWishlistSkus';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import defaultOperations from '@magento/pagebuilder/lib/ContentTypes/Products/Carousel/carousel.gql.ce';

/**
 * This is a duplicate of @magento/peregrine/lib/talons/Gallery/useGallery.js
 */
export const useCarousel = (props = {}) => {
    const operations = mergeOperations(defaultOperations, props.operations);

    useCustomerWishlistSkus();

    const { data: wishlistConfigData } = useQuery(
        operations.getWishlistConfigQuery,
        { fetchPolicy: 'cache-and-network' }
    );

    const storeConfig = wishlistConfigData
        ? wishlistConfigData.storeConfig
        : null;

    return {
        storeConfig
    };
};
