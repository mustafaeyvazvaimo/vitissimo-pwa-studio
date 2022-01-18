import React, { Suspense } from 'react';
import { shape, string } from 'prop-types';

import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
import { Link, resourceUrl, Route } from '@vitissimo/theme/lib/drivers';

import MegaMenu from '@magento/venia-ui/lib/components/MegaMenu';
import AccountTrigger from './accountTrigger';
import CartTrigger from './cartTrigger';
import SearchTrigger from './searchTrigger';
import NavTrigger from './navTrigger';

import BarImage from '@vitissimo/theme/lib/components/BarImage';
import Logo from '@vitissimo/theme/lib/components/Logo';

import VitissimoLogo from '@vitissimo/theme/assets/images/vitissimo-logo.png';
import SportBarImage from '@vitissimo/theme/assets/images/bar_sport_2000_A_red_to_black.png';

import classes from './header.css';

const SearchBar = React.lazy(() =>
    import('@magento/venia-ui/lib/components/SearchBar')
);

const Header = () => {
    const {
        handleSearchTriggerClick,
        searchTriggerRef,
        isSearchOpen,
        searchRef
    } = useHeader();

    const homeUrl = resourceUrl(`/`);

    const searchBarFallback = (
        <div className={classes.searchFallback} ref={searchRef}>
            <div className={classes.input}>
                <div className={classes.loader} />
            </div>
        </div>
    );

    const searchBar = isSearchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={isSearchOpen} ref={searchRef} />
            </Route>
        </Suspense>
    ) : null;

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <div className={classes.primaryHeader}>
                    <div className={classes.navigationContainer}>
                        <NavTrigger />
                    </div>
                    <div className={classes.logoContainer}>
                        <Link to={homeUrl}>
                            <Logo logo={VitissimoLogo} />
                        </Link>
                    </div>
                    <div className={classes.searchContainer}>
                        <Suspense fallback={searchBarFallback}>
                            <Route>
                                <SearchBar
                                    isOpen={!isSearchOpen}
                                    ref={searchRef}
                                />
                            </Route>
                        </Suspense>
                    </div>
                    <div className={classes.accountContainer}>
                        <div className={classes.searchTrigger}>
                            <SearchTrigger
                                onClick={handleSearchTriggerClick}
                                ref={searchTriggerRef}
                            />
                        </div>
                        <AccountTrigger />
                        <CartTrigger />
                    </div>
                </div>
                <MegaMenu />
            </header>
            {searchBar}
            <BarImage img={SportBarImage} />
        </div>
    );
};

Header.propTypes = {
    classes: shape({
        root: string
    })
};

export default Header;
