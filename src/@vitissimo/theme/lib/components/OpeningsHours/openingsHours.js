import React from 'react';
import { shape, string } from 'prop-types';

import { CircleIcon } from '../Icons';

import classes from './openingsHours.css';

const OpeningsHours = () => {
    const today = new Date(); // get the local time from the computer
    const day = today.getDay(); // days are in an array, so sunday = 0 and saturday = 6
    const time = today.getHours() + ':' + today.getMinutes(); // the time gets written like => '09:30' or '13:00'

    const open = (
        <div className={classes.hours}>
            <p>Momenteel geopend</p>
            <CircleIcon
                fill="#00f300"
                color="#00f300"
                size={12}
                strokeWidth={1}
            />
        </div>
    );
    const closed = (
        <div className={classes.hours}>
            <p>Momenteel gesloten</p>
            <CircleIcon
                fill="#EC0008"
                color="#EC0008"
                size={12}
                strokeWidth={1}
            />
        </div>
    );

    // function to check the day and the times to return the right const
    const checkTime = () => {
        if (day === 0) {
            return closed;
        }
        if (day === 1) {
            if (time > '18:00' || time <= '13:30') return closed;
            else return open;
        }
        if (day === 2 || day === 3 || day === 4 || day === 5) {
            if (time > '18:00' || time < '9:30') return closed;
            else if (time > '12:00' || time <= '13:30') return closed;
            else return open;
        }
        if (day === 6) {
            if (time > '17:00' || time < '9:30') return closed;
            else return open;
        }
        console.log(day, time);
    };

    return <div className={classes.root}>{checkTime()}</div>;
};

OpeningsHours.propTypes = {
    classes: shape({
        root: string
    })
};

export default OpeningsHours;
