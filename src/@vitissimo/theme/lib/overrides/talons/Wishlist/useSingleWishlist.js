import { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useMutation, useQuery } from '@apollo/client';

import { useUserContext } from '@magento/peregrine/lib/context/user';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import defaultOperations from '@magento/peregrine/lib/talons/Wishlist/AddToListButton/addToListButton.gql';
import { REMOVE_PRODUCTS_FROM_WISHLIST } from '@magento/peregrine/lib/talons/WishlistPage/wishlistItem.gql';

export const useSingleWishlist = props => {
    let wishlistId = '0';
    const { afterAdd, beforeAdd, item } = props;
    const operations = mergeOperations(defaultOperations, props.operations);

    const [
        addProductToWishlist,
        {
            data: addProductData,
            error: errorAddingProduct,
            loading: isAddingToWishlist
        }
    ] = useMutation(operations.addProductToWishlistMutation);

    const {
        client,
        data: { customerWishlistProducts }
    } = useQuery(operations.getProductsInWishlistsQuery);

    const isSelected = useMemo(() => {
        return (
            customerWishlistProducts.includes(item.sku) || isAddingToWishlist
        );
    }, [customerWishlistProducts, isAddingToWishlist, item.sku]);

    const [showLoginToast, setShowLoginToast] = useState(0);

    const { formatMessage } = useIntl();
    const [{ isSignedIn }] = useUserContext();

    const handleClick = useCallback(async () => {
        if (!isSignedIn) {
            setShowLoginToast(current => ++current);
        } else {
            try {
                if (beforeAdd) {
                    await beforeAdd();
                }

                await addProductToWishlist({
                    variables: { wishlistId: wishlistId, itemOptions: item }
                });
                client.writeQuery({
                    query: operations.getProductsInWishlistsQuery,
                    data: {
                        customerWishlistProducts: [
                            ...customerWishlistProducts,
                            item.sku
                        ]
                    }
                });

                if (afterAdd) {
                    afterAdd();
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, [
        addProductToWishlist,
        afterAdd,
        beforeAdd,
        client,
        customerWishlistProducts,
        isSignedIn,
        item,
        operations.getProductsInWishlistsQuery
    ]);

    //  -----------------------------------------------------
    // remove product from wishlist on category page and
    // product full detail page doesn't work yet
    // only fix when client wants to have this implemented.
    const [removeProductsFromWishlist] = useMutation(
        REMOVE_PRODUCTS_FROM_WISHLIST,
        {
            update: cache => {
                cache.modify({
                    id: 'ROOT_QUERY',
                    fields: {
                        customerWishlistProducts: cachedProducts =>
                            cachedProducts.filter(
                                productSku => productSku !== item.sku
                            )
                    }
                });
                cache.modify({
                    id: `CustomerWishlist:${wishlistId}`,
                    fields: {
                        items_v2: (cachedItems, { readField, Remove }) => {
                            for (let i = 0; i < cachedItems.items.length; i++) {
                                if (readField('id', item) === item.id)
                                    return Remove;
                            }
                            return cachedItems;
                        }
                    }
                });
            },
            variables: {
                wishlistId: wishlistId,
                wishlistItemsId: [item.id]
            }
        }
    );

    const handleRemoveWishlistItem = useCallback(async () => {
        try {
            await removeProductsFromWishlist();
        } catch (error) {
            console.error(error);
        }
    }, [removeProductsFromWishlist]);
    //  -----------------------------------------------------

    const loginToastProps = useMemo(() => {
        if (showLoginToast) {
            return {
                type: 'info',
                message: formatMessage({
                    id: 'wishlist.galleryButton.loginMessage',
                    defaultMessage:
                        'Please sign-in to your Account to save items for later.'
                }),
                timeout: 5000
            };
        }

        return null;
    }, [formatMessage, showLoginToast]);

    const successToastProps = useMemo(() => {
        if (addProductData) {
            return {
                type: 'success',
                message: formatMessage({
                    id: 'wishlist.galleryButton.successMessageGeneral',
                    defaultMessage:
                        'Item successfully added to your favorites list.'
                }),
                timeout: 5000
            };
        }

        return null;
    }, [addProductData, formatMessage]);

    const errorToastProps = useMemo(() => {
        if (errorAddingProduct) {
            return {
                type: 'error',
                message: formatMessage({
                    id: 'wishlist.galleryButton.addError',
                    defaultMessage:
                        'Something went wrong adding the product to your wishlist.'
                }),
                timeout: 5000
            };
        }

        return null;
    }, [errorAddingProduct, formatMessage]);

    // const handleOnClick = isSelected ? handleRemoveWishlistItem : handleClick;

    const buttonProps = useMemo(
        () => ({
            'aria-label': formatMessage({
                id: 'wishlistButton.addText',
                defaultMessage: 'Add to Favorites'
            }),
            disabled: isSelected,
            onClick: handleClick,
            type: 'button'
        }),
        [formatMessage, handleClick, isSelected]
    );

    return {
        buttonProps,
        buttonText: props.buttonText && props.buttonText(isSelected),
        customerWishlistProducts,
        errorToastProps,
        handleClick,
        handleRemoveWishlistItem,
        isSelected,
        loginToastProps,
        successToastProps
    };
};
