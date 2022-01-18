import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, resourceUrl } from '@vitissimo/theme/lib/drivers';
import { useCustomerGroup } from '@vitissimo/theme/lib/hooks/CustomerGroup/useCustomerGroup';

const MyClub = ({ isNav = false, classes, handleClose }) => {
    const { customerData } = useCustomerGroup();

    const urlData = customerData
        ? customerData.url_path + customerData.url_suffix
        : '';

    const mijnClubUrl = resourceUrl(`/${urlData}`);

    const showUrl = {
        display:
            customerData && customerData.customer_groups !== 1
                ? 'block'
                : 'none'
    };

    const linkContent =
        customerData && customerData.customer_groups !== 1 ? (
            !isNav ? (
                <Link to={mijnClubUrl} style={showUrl}>
                    <FormattedMessage
                        id={'teamwear.myClub'}
                        defaultMessage={'Mijn Club'}
                    />
                </Link>
            ) : (
                <Link
                    className={classes.target}
                    to={mijnClubUrl}
                    onClick={handleClose}
                    style={showUrl}
                >
                    <span className={classes.text}>
                        <FormattedMessage
                            id={'teamwear.myClub'}
                            defaultMessage={'Mijn Club'}
                        />
                    </span>
                </Link>
            )
        ) : null;

    return <Fragment>{linkContent}</Fragment>;
};

export default MyClub;
