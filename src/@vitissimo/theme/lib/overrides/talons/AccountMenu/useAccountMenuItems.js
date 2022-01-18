import { useCallback } from 'react';
import { resourceUrl } from '@vitissimo/theme/lib/drivers';
import { useCustomerGroup } from '@vitissimo/theme/lib/hooks/CustomerGroup/useCustomerGroup';
import { useHistory } from '@vitissimo/theme/lib/drivers';

export const useAccountMenuItems = props => {
    const history = useHistory();
    const { onSignOut } = props;
    const { customerData } = useCustomerGroup();

    const urlData = customerData
        ? customerData.url_path + customerData.url_suffix
        : '';
    const mijnClubUrl = resourceUrl(`/${urlData}`);

    const handleSignOut = useCallback(() => {
        onSignOut();
        history.push('/');
    }, [onSignOut, history]);

    const MENU_ITEMS = [
        {
            name: 'Account Information',
            id: 'accountMenu.accountInfoLink',
            url: '/account-information'
        },
        // {
        //     name: 'Mijn Club',
        //     id: 'my_club',
        //     url: mijnClubUrl
        // },
        {
            name: 'Favorites Lists',
            id: 'accountMenu.favoritesListsLink',
            url: '/wishlist'
        }
        // {
        //     name: 'Address Book',
        //     id: 'accountMenu.addressBookLink',
        //     url: '/address-book'
        // },
        // {
        //     name: 'Communications',
        //     id: 'accountMenu.communicationsLink',
        //     url: '/communications'
        // }
        // {
        //     name: 'Order History',
        //     id: 'accountMenu.orderHistoryLink',
        //     url: '/order-history'
        // },
        // Hide links until features are completed
        // {
        //     name: 'Store Credit & Gift Cards',
        //     id: 'accountMenu.storeCreditLink',
        //     url: ''
        // },
        // {
        //     name: 'Saved Payments',
        //     id: 'accountMenu.savedPaymentsLink',
        //     url: '/saved-payments'
        // },
    ];

    return {
        handleSignOut,
        menuItems: MENU_ITEMS
    };
};
