import React from 'react';

export function DatePicker (props) {
    const onChange = (event) => {
        props.updateFilters(props.filterName, Date.parse(event.target.value), props.index);
    };

    return (
        <>
            <input type="date" onChange={onChange}></input>
        </>
    );
}