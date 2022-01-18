import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';

import Logo from '../../../components/Logo';
import BarImage from '../../../components/BarImage';
import CustomCmsBlock from '../../../components/CustomCmsBlock';
import VitissimoRoute from '../../../components/VitissimoRoute';
import InfoBlock from '../../../components/InfoBlock';
import SiteMap from '../../../components/SiteMap';
import SocialMediaIcon from '../../../components/SocialMediaIcon';
import Instagram from '../../../components/Instagram';
import OpeningsHours from '../../../components/OpeningsHours';

import VitissimoLogoRed from '../../../../assets/images/vitissimo-logo-red.png';
import SportBarImageBlack from '../../../../assets/images/bar_sports_2000_B_red_end.png';
import SportBarImageRed from '../../../../assets/images/bar_B_fade_red.png';
import FacebookIcon from '../../../../assets/images/Vitissimo_FB_icon.png';
import InstagramIcon from '../../../../assets/images/vitissimo_Insta_icon.png';

import classes from './footer.css';

const Footer = () => {
    const year = new Date().getFullYear();

    const brandingText = 'Vitissimo Sport - Design by Vaimo Benelux';
    const routeLinkText = 'Route informatie';

    const routeLink =
        'https://www.google.nl/maps/place/Vitissimo+Sport+Bvba/@51.099734,5.7897959,17z/data=!3m1!4b1!4m5!3m4!1s0x47c0c947fcbf7bf1:0x740635e5ccaf664c!8m2!3d51.099734!4d5.7919846';
    const facebookLink = 'https://www.facebook.com/Vitissimo/';
    const instagramLink = 'https://www.instagram.com/vitissimosport/';

    return (
        <Fragment>
            <BarImage img={SportBarImageBlack} />
            <footer className={classes.root}>
                <div className={classes.logo}>
                    <Logo logo={VitissimoLogoRed} />
                </div>
                <div className={classes.wrapper}>
                    <div className={classes.address}>
                        <CustomCmsBlock identifier={'address_info'} />
                        <OpeningsHours />
                        <VitissimoRoute
                            link={routeLink}
                            linkText={routeLinkText}
                        />
                    </div>
                    <div className={classes.info}>
                        <InfoBlock />
                        <div>
                            <SocialMediaIcon
                                src={FacebookIcon}
                                link={facebookLink}
                            />
                            <SocialMediaIcon
                                src={InstagramIcon}
                                link={instagramLink}
                            />
                        </div>
                    </div>
                    <div className={classes.sitemap}>
                        <SiteMap />
                    </div>
                    <Instagram />
                </div>
            </footer>
            <div className={classes.redBar}>
                <BarImage img={SportBarImageRed} />
            </div>
            <div className={classes.branding}>
                &copy;{year} {brandingText}
            </div>
        </Fragment>
    );
};

Footer.propTypes = {
    classes: shape({
        root: string,
        wrapper: string,
        address: string,
        info: string,
        sitemap: string,
        instagram: string,
        redBar: string,
        branding: string
    })
};

export default Footer;
