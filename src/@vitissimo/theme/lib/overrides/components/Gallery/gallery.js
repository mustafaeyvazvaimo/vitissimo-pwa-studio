import React, { useMemo } from 'react';
import { string, shape, array } from 'prop-types';

import { useGallery } from '@magento/peregrine/lib/talons/Gallery/useGallery';
import GalleryItem from './item';

import classes from './gallery.css';

const Gallery = props => {
    const { items } = props;
    const talonProps = useGallery();
    const { storeConfig } = talonProps;

    const galleryItems = useMemo(
        () =>
            items.map((item, index) => {
                if (item === null) {
                    return <GalleryItem key={index} />;
                }
                return (
                    <GalleryItem
                        key={item.id}
                        item={item}
                        storeConfig={storeConfig}
                    />
                );
            }),
        [items, storeConfig]
    );

    return (
        <div className={classes.root}>
            <div className={classes.items}>{galleryItems}</div>
        </div>
    );
};

Gallery.propTypes = {
    classes: shape({
        filters: string,
        items: string,
        pagination: string,
        root: string
    }),
    items: array.isRequired
};

export default Gallery;
