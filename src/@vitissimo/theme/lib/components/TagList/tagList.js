import React from 'react';

import Tag from './tag';

import classes from './tagList.css';

const TagList = props => {
    const { tagListData } = props;
    const { tags } = tagListData;

    if (!tags) return null;

    const tagList = tags.map(tag => {
        return <Tag key={tag.name} value={tag} />;
    });

    return (
        <div className={classes.root}>
            <p>Kijk ook eens naar producten in de volgende categorieen:</p>
            <div className={classes.tags}>{tagList}</div>
        </div>
    );
};

export default TagList;
