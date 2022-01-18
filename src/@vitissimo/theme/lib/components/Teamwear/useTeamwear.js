import { useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/client';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import DEFAULT_OPERATIONS from './teamwear.gql';

export const useTeamwear = props => {
    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const { getTeamwearTreeQuery } = operations;

    const { data } = useQuery(getTeamwearTreeQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const processData = useCallback((category, path = [], isRoot = true) => {
        if (!category) return;
        const teamwearCategory = Object.assign({}, category);
        if (!isRoot) teamwearCategory.path = [...path, category.id];

        if (teamwearCategory.children) {
            teamwearCategory.children = [...teamwearCategory.children]
                .sort((a, b) => (a.position > b.position ? 1 : -1))
                .map(child => processData(child, teamwearCategory.path, false));
        }
        return teamwearCategory;
    }, []);

    const teamwearData = useMemo(() => {
        return data
            ? processData(data.teamwearCategoryTree[0].children[0])
            : {};
    }, [data]);

    return {
        teamwearData
    };
};
