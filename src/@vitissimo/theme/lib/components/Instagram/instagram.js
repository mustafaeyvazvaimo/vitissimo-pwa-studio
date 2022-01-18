import React from 'react';
import { shape, string } from 'prop-types';
import { env } from 'process';

import InstagramFeed from 'react-ig-feed';
import 'react-ig-feed/dist/index.css';

const Instagram = () => {
    // TODO: fix that the access token is been read from the .env file.
    const getToken = (env.INSTAGRAM_TOKEN =
        'IGQVJWUDdwSm5rRVhDaWlManVJUE9zZAGhlZAktRSU9UV1l3ZAC10TEp1cVJzekYwcGN0eDFzY1JhbDgydXA1TW56bWZA3ZA0RoVlBHQ29OZAHF1OGlhblhQMk1UWlVPVG0yRjhhN2pZAcUVvYlY4b2h0UUZASVwZDZD');
    return <InstagramFeed token={`${getToken}`} counter="1" />;
};

Instagram.propTypes = {
    classes: shape({
        root: string
    })
};

export default Instagram;
