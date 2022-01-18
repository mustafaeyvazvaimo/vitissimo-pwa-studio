import { gql } from '@apollo/client';

export const GET_CUSTOMER_GROUP = gql`
    query getTeamwearCategory($token: String!) {
        teamwearCategory(token: $token) {
            id
            name
            customer_groups
            url_path
            url_suffix
            description
        }
    }
`;

export default {
    getTeamwearCategoryQuery: GET_CUSTOMER_GROUP
};
