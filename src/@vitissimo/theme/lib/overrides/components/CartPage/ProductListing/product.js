import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';

import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useProduct } from '@magento/peregrine/lib/talons/CartPage/ProductListing/useProduct';
import { AvailableShippingMethodsCartFragment } from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/ShippingMethods/shippingMethodsFragments.gql';

import Price from '@magento/venia-ui/lib/components/Price';
import Image from '@magento/venia-ui/lib/components/Image';
import ProductOptions from '@magento/venia-ui/lib/components/LegacyMiniCart/productOptions';
import Kebab from '@magento/venia-ui/lib/components/LegacyMiniCart/kebab';
import WishlistButton from '@vitissimo/theme/lib/components/WishlistButton';

import { CartPageFragment } from '../cartPageFragments.gql';

import Quantity from './quantity';
import ProductPrice from '@vitissimo/theme/lib/components/ProductPrice';

import { TrashIcon, EditIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './product.css';

const IMAGE_SIZE = 100;

const Product = props => {
    const { item } = props;
    const { formatMessage } = useIntl();
    const [{ isSignedIn }] = useUserContext();

    const talonProps = useProduct({
        operations: {
            removeItemMutation: REMOVE_ITEM_MUTATION,
            updateItemQuantityMutation: UPDATE_QUANTITY_MUTATION
        },
        ...props
    });

    const {
        addToWishlistProps,
        errorMessage,
        handleEditItem,
        handleRemoveFromCart,
        handleUpdateItemQuantity,
        isEditable,
        product,
        isProductUpdating
    } = talonProps;

    const {
        image,
        name,
        options,
        quantity,
        stockStatus,
        // unitPrice,
        urlKey,
        urlSuffix
    } = product;

    const itemClassName = isProductUpdating
        ? classes.item_disabled
        : classes.item;

    const itemLink = useMemo(
        () => resourceUrl(`/${urlKey}${urlSuffix || ''}`),
        [urlKey, urlSuffix]
    );

    const stockStatusMessage =
        stockStatus === 'OUT_OF_STOCK'
            ? formatMessage({
                  id: 'product.outOfStock',
                  defaultMessage: 'Out-of-stock'
              })
            : '';

    const editButton = isEditable ? (
        <button onClick={handleEditItem} type="button">
            <EditIcon color="#EC0008" size={20} />
            <span>
                <FormattedMessage
                    id="product.editItem"
                    defaultMessage="Edit item"
                />
            </span>
        </button>
    ) : null;

    const wishlistBtn = isSignedIn ? (
        <WishlistButton {...addToWishlistProps} />
    ) : null;

    const showWishButton = {
        display: isSignedIn ? 'block' : 'none'
    };

    const showEditButton = {
        display: isEditable ? 'block' : 'none'
    };

    return (
        <li className={classes.root}>
            <span className={classes.errorText}>{errorMessage}</span>
            <div className={itemClassName}>
                <Link to={itemLink} className={classes.imageContainer}>
                    <Image
                        alt={name}
                        classes={{
                            root: classes.imageRoot,
                            image: classes.image
                        }}
                        width={IMAGE_SIZE}
                        resource={image}
                    />
                </Link>
                <div className={classes.details}>
                    <div className={classes.name}>
                        <Link to={itemLink}>{name}</Link>
                    </div>
                    <ProductOptions
                        options={options}
                        classes={{
                            options: classes.options,
                            optionLabel: classes.optionLabel
                        }}
                    />
                    <span className={classes.price}>
                        <ProductPrice sku={item.product.sku} />
                        {/* <Price value={unitPrice} /> */}
                        <FormattedMessage
                            id={'product.price'}
                            defaultMessage={' ea.'}
                        />
                    </span>
                    <span className={classes.stockStatusMessage}>
                        {stockStatusMessage}
                    </span>
                    <div className={classes.quantity}>
                        <Quantity
                            itemId={item.id}
                            initialValue={quantity}
                            onChange={handleUpdateItemQuantity}
                        />
                    </div>
                </div>
                <Kebab
                    classes={{
                        root: classes.kebab
                    }}
                    disabled={true}
                >
                    <li className={classes.deleteButton}>
                        <button onClick={handleRemoveFromCart} type="button">
                            <TrashIcon color="#EC0008" size={20} />
                            <span>
                                <FormattedMessage
                                    id="product.removeFromCart"
                                    defaultMessage="Remove from cart"
                                />
                            </span>
                        </button>
                    </li>
                    <li className={classes.editButton} style={showEditButton}>
                        {editButton}
                    </li>
                    <li
                        className={classes.wishlistButton}
                        style={showWishButton}
                    >
                        {wishlistBtn}
                    </li>
                </Kebab>
            </div>
        </li>
    );
};

export default Product;

export const REMOVE_ITEM_MUTATION = gql`
    mutation removeItem($cartId: String!, $itemId: Int!) {
        removeItemFromCart(input: { cart_id: $cartId, cart_item_id: $itemId })
            @connection(key: "removeItemFromCart") {
            cart {
                id
                ...CartPageFragment
                ...AvailableShippingMethodsCartFragment
            }
        }
    }
    ${CartPageFragment}
    ${AvailableShippingMethodsCartFragment}
`;

export const UPDATE_QUANTITY_MUTATION = gql`
    mutation updateItemQuantity(
        $cartId: String!
        $itemId: Int!
        $quantity: Float!
    ) {
        updateCartItems(
            input: {
                cart_id: $cartId
                cart_items: [{ cart_item_id: $itemId, quantity: $quantity }]
            }
        ) @connection(key: "updateCartItems") {
            cart {
                id
                ...CartPageFragment
                ...AvailableShippingMethodsCartFragment
            }
        }
    }
    ${CartPageFragment}
    ${AvailableShippingMethodsCartFragment}
`;
