import React from 'react';
import { shape, string } from 'prop-types';

import { useScrollLock } from '@magento/peregrine';

import Footer from '@magento/venia-ui/lib/components/Footer';
import Header from '@magento/venia-ui/lib/components/Header';

import classes from './main.css';

const Main = props => {
    const { children, isMasked } = props;

    useScrollLock(isMasked);

    return (
        <main className={classes.root}>
            <Header />
            <div className={classes.page}>{children}</div>
            <Footer />
        </main>
    );
};

export default Main;

Main.propTypes = {
    classes: shape({
        root: string,
        page: string
    })
};
