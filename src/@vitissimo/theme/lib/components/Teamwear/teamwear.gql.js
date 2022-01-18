import { gql } from '@apollo/client';

export const GET_TEAMWEAR_TREE = gql`
    query getTeamwearTree {
        teamwearCategoryTree {
            id
            name
            children {
                id
                name
                url_suffix
                url_path
                position
                children {
                    id
                    name
                    url_suffix
                    url_path
                    position
                    include_in_menu
                    children {
                        id
                        name
                        url_suffix
                        url_path
                        position
                        include_in_menu
                        description
                        image
                    }
                }
            }
        }
    }
`;

export default {
    getTeamwearTreeQuery: GET_TEAMWEAR_TREE
};
