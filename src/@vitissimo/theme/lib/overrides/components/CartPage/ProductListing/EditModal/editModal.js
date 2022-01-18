import React from 'react';
import { useEditModal } from '@magento/peregrine/lib/talons/CartPage/ProductListing/EditModal/useEditModal';

import ProductForm from './productForm';

const EditModal = props => {
    const { item, setActiveEditItem, setIsCartUpdating } = props;
    const talonProps = useEditModal();
    const { setVariantPrice, variantPrice } = talonProps;

    return (
        <ProductForm
            item={item}
            setIsCartUpdating={setIsCartUpdating}
            setVariantPrice={setVariantPrice}
            variantPrice={variantPrice}
            setActiveEditItem={setActiveEditItem}
        />
    );
};

export default EditModal;
