import { gql } from '@apollo/client';
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

const GET_TAGLIST_CATEGORIES = gql`
    query getTagListCategories($urlKey: String!) {
        products(filter: { url_key: { eq: $urlKey } }) {
            items {
                categories {
                    name
                    url_path
                }
            }
        }
    }
`;

const useTagList = props => {
    const { urlKey } = props;

    const { error, loading, data } = useQuery(GET_TAGLIST_CATEGORIES, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: {
            urlKey: urlKey
        }
    });

    const tags = useMemo(() => {
        if (data && data.products.items[0]) {
            return data.products.items[0].categories;
        }
        return null;
    }, [data]);

    return {
        error,
        isLoading: loading,
        tags
    };
};

export default useTagList;
