import React from 'react';
import { string, number, shape } from 'prop-types';

import { Link, resourceUrl } from '@vitissimo/theme/lib/drivers';

import { UNCONSTRAINED_SIZE_KEY } from '@magento/peregrine/lib/talons/Image/useImage';
import { useGalleryItem } from '@magento/peregrine/lib/talons/Gallery/useGalleryItem';
import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import { useUserContext } from '@magento/peregrine/lib/context/user';

import Image from '@magento/venia-ui/lib/components/Image';

import WishlistButton from '@vitissimo/theme/lib/components/WishlistButton';
import ProductPrice from '@vitissimo/theme/lib/components/ProductPrice';

import classes from './item.css';

// The placeholder image is 4:5, so we should make sure to size our product
// images appropriately.
const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 375;

// Gallery switches from two columns to three at 640px.
const IMAGE_WIDTHS = new Map()
    .set(640, IMAGE_WIDTH)
    .set(UNCONSTRAINED_SIZE_KEY, 840);

const ItemPlaceholder = ({ classes }) => (
    <div className={classes.root_pending}>
        <div className={classes.images_pending}>
            <Image
                alt="Placeholder for gallery item image"
                classes={{
                    image: classes.image_pending,
                    root: classes.imageContainer
                }}
                src={transparentPlaceholder}
            />
        </div>
        <div className={classes.name_pending} />
        <div className={classes.price_pending} />
    </div>
);

const GalleryItem = props => {
    const { handleLinkClick, item, wishlistButtonProps } = useGalleryItem(
        props
    );

    if (!item) {
        return <ItemPlaceholder classes={classes} />;
    }

    const { name, small_image, url_key, url_suffix, sku } = item;
    const { url: smallImageURL } = small_image;
    const productLink = resourceUrl(`/${url_key}${url_suffix || ''}`);

    const [{ isSignedIn }] = useUserContext();

    const wishlistButton =
        isSignedIn && wishlistButtonProps ? (
            <WishlistButton {...wishlistButtonProps} />
        ) : null;

    return (
        <div className={classes.root}>
            <div className={classes.price}>
                <ProductPrice sku={sku} />
            </div>
            <Link
                onClick={handleLinkClick}
                to={productLink}
                className={classes.images}
            >
                <Image
                    alt={name}
                    classes={{
                        image: classes.image,
                        root: classes.imageContainer
                    }}
                    height={IMAGE_HEIGHT}
                    resource={smallImageURL}
                    widths={IMAGE_WIDTHS}
                />
            </Link>
            <div className={classes.description}>
                <div className={classes.name}>
                    <Link onClick={handleLinkClick} to={productLink}>
                        <span>{name}</span>
                    </Link>
                </div>
                <div className={classes.fav}>{wishlistButton}</div>
            </div>
        </div>
    );
};

GalleryItem.propTypes = {
    classes: shape({
        image: string,
        imageContainer: string,
        imagePlaceholder: string,
        image_pending: string,
        images: string,
        images_pending: string,
        name: string,
        name_pending: string,
        price: string,
        price_pending: string,
        root: string,
        root_pending: string
    }),
    item: shape({
        id: number.isRequired,
        name: string.isRequired,
        small_image: shape({
            url: string.isRequired
        }),
        url_key: string.isRequired,
        sku: string.isRequired
    }),
    storeConfig: shape({
        magento_wishlist_general_is_enabled: string.isRequired
    })
};

export default GalleryItem;
