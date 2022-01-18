import React, { useMemo } from 'react';
import { arrayOf, bool, number, shape, string } from 'prop-types';

import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import { useProductImageCarousel } from '@magento/peregrine/lib/talons/ProductImageCarousel/useProductImageCarousel';

import Image from '@magento/venia-ui/lib/components/Image';
import Thumbnail from '@magento/venia-ui/lib/components/ProductImageCarousel/thumbnail';

import { ChevronLeftIcon, ChevronRightIcon } from '../../../components/Icons';

import classes from './carousel.css';

const IMAGE_WIDTH = 500;

const ProductImageCarousel = props => {
    const { images } = props;

    const talonProps = useProductImageCarousel({
        images,
        imageWidth: IMAGE_WIDTH
    });

    const {
        currentImage,
        activeItemIndex,
        altText,
        handleNext,
        handlePrevious,
        handleThumbnailClick,
        sortedImages
    } = talonProps;

    // create thumbnail image component for every images in sorted order
    const thumbnails = useMemo(
        () =>
            sortedImages.map((item, index) => (
                <Thumbnail
                    key={`${item.file}--${item.label}`}
                    item={item}
                    itemIndex={index}
                    isActive={activeItemIndex === index}
                    onClickHandler={handleThumbnailClick}
                />
            )),
        [activeItemIndex, handleThumbnailClick, sortedImages]
    );

    let image;
    if (currentImage.file) {
        image = (
            <Image
                alt={altText}
                classes={{
                    image: classes.currentImage,
                    root: classes.imageContainer
                }}
                resource={currentImage.file}
                width={IMAGE_WIDTH}
            />
        );
    } else {
        image = (
            <Image
                alt={altText}
                classes={{
                    image: classes.currentImage_placeholder,
                    root: classes.imageContainer
                }}
                src={transparentPlaceholder}
            />
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.carouselContainer}>
                <button
                    className={classes.previousButton}
                    onClick={handlePrevious}
                    type="button"
                >
                    <ChevronLeftIcon size={30} />
                </button>
                {image}
                <button
                    className={classes.nextButton}
                    onClick={handleNext}
                    type="button"
                >
                    <ChevronRightIcon size={30} />
                </button>
            </div>
            <div className={classes.thumbnailList}>{thumbnails}</div>
        </div>
    );
};

ProductImageCarousel.propTypes = {
    classes: shape({
        carouselContainer: string,
        currentImage: string,
        currentImage_placeholder: string,
        imageContainer: string,
        nextButton: string,
        previousButton: string,
        root: string
    }),
    images: arrayOf(
        shape({
            label: string,
            position: number,
            disabled: bool,
            file: string.isRequired
        })
    ).isRequired
};

export default ProductImageCarousel;
