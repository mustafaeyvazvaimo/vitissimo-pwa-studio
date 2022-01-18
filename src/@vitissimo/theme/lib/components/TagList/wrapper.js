import useTagList from './useTagList';

export default original => {
    return function useProductFullDetails(props, ...restArgs) {
        const { product } = props;

        // Run the data fetch hook
        const tagListData = useTagList({
            urlKey: product.url_key
        });

        // Run the original, wrapped function
        const { productDetails, ...defaultReturnData } = original(
            props,
            ...restArgs
        );

        // Add the new data to the data returned by the original function
        return {
            ...defaultReturnData,
            productDetails: {
                ...productDetails,
                tagListData: tagListData
            }
        };
    };
};
