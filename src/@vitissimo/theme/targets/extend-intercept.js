const { Targetables } = require('@magento/pwa-buildpack');

module.exports = targets => {
    const targetables = Targetables.using(targets);

    // intercept to wrap the useProductFullDetail file with the TagList wrapper
    const useProductFullDetails = targetables.esModule(
        '@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail.js'
    );
    useProductFullDetails.wrapWithFile(
        'useProductFullDetail',
        '@vitissimo/theme/lib/components/TagList/wrapper'
    );
};
