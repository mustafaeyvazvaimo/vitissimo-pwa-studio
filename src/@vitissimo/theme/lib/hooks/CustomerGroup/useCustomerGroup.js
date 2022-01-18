import { useQuery } from '@apollo/client';

import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

import DEFAULT_OPERATIONS from './customerGroup.gql';

export const useCustomerGroup = () => {
    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const { getTeamwearCategoryQuery } = operations;

    const storage = new BrowserPersistence();
    const customerToken = JSON.parse(storage.getRawItem('signin_token'));
    const token = customerToken.value.replaceAll('"', '');

    const {data} = useQuery(getTeamwearCategoryQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: { token: token }
    });

    const customerData = (data && data.teamwearCategory) ? data.teamwearCategory[0] : null

    return {
        customerData
    };
};
