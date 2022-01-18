const moduleOverridePlugin = require('./../plugins/normalModuleOverrideWebpackPlugin');
const overrideMapping = require('./../plugins/overrideMapping');

module.exports = targets => {
    // enable the special features
    targets.of('@magento/pwa-buildpack').specialFeatures.tap(flags => {
        flags[targets.name] = {
            cssModules: true,
            esModules: true,
            graphqlQueries: true,
            rootComponents: true,
            i18n: true
        };
    });

    // register our own overwrite plugin for webpack
    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        new moduleOverridePlugin(overrideMapping).apply(compiler);
    });

    // register custom payment methods
    const { checkoutPagePaymentTypes } = targets.of('@magento/venia-ui');
    checkoutPagePaymentTypes.tap(payments =>
        payments.add(
            {
                paymentCode: 'banktransfer',
                importPath:
                    '@vitissimo/theme/lib/components/PaymentMethods/BankTransfer/bankTransfer.js'
            },
            {
                paymentCode: 'cashondelivery',
                importPath:
                    '@vitissimo/theme/lib/components/PaymentMethods/CashOnDelivery/cashOnDelivery.js'
            }
        )
    );

    // register routes for the custom pages
    targets.of('@magento/venia-ui').routes.tap(routes => {
        routes.push(
            {
                name: 'Aanmelden',
                pattern: '/aanmelden',
                exact: true,
                path: require.resolve(
                    '@vitissimo/theme/lib/components/SignInPage'
                )
            },
            {
                name: 'Account Aanmaken',
                pattern: '/account-aanmaken',
                exact: true,
                path: require.resolve(
                    '@vitissimo/theme/lib/components/CreateAccountPage'
                )
            },
            {
                name: 'Wachtwoord Vergeten',
                pattern: '/wachtwoord-vergeten',
                exact: true,
                path: require.resolve(
                    '@vitissimo/theme/lib/components/ForgotPasswordPage'
                )
            },
            {
                name: 'Mijn Account',
                pattern: '/mijn-account',
                exact: true,
                path: require.resolve(
                    '@vitissimo/theme/lib/components/MyAccountPage'
                )
            },
            {
                name: 'Teamwear',
                pattern: '/teamwear',
                exact: true,
                path: require.resolve(
                    '@vitissimo/theme/lib/components/Teamwear'
                )
            }
        );
        return routes;
    });
};
