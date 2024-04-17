import React from 'react';

export function IntNumberOnlyTextbox(props) {
    const [text, setText] = React.useState("");

    const onChange = (event) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === "" || re.test(event.target.value)) {
            setText(event.target.value);
            props.updateFilters(props.filterName, parseInt(event.target.value), props.index);
        }
    }

    return (
        <input type="text" value={text} onChange={onChange}></input>
    );
}

export function FloatNumberOnlyTextbox(props) {
    const [text, setText] = React.useState("");

    const onChange = (event) => {
        const re = /^([0-9]*[.])?[0-9]*$/;
        if (event.target.value === "" || re.test(event.target.value)) {
            setText(event.target.value);
            props.updateFilters(props.filterName, parseFloat(event.target.value), props.index);
        }
    }

    return (
        <input type="text" value={text} onChange={onChange}></input>
    );
}