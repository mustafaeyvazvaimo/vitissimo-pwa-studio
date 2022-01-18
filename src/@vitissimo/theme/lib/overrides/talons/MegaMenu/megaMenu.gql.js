import { gql } from '@apollo/client';

export const GET_MEGA_MENU = gql`
    query getMegaMenu {
        vitissimoMenu {
            id
            name
            children {
                id
                name
                include_in_menu
                position
                url_path
                url_suffix
                children {
                    id
                    name
                    include_in_menu
                    position
                    url_path
                    url_suffix
                    children {
                        id
                        name
                        include_in_menu
                        position
                        url_path
                        url_suffix
                        children {
                            id
                            name
                            include_in_menu
                            position
                            url_path
                            url_suffix
                        }
                    }
                }
            }
        }
    }
`;

export default {
    getMegaMenuQuery: GET_MEGA_MENU
};
