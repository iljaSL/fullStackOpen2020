import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef((props, ref) => {
    const [ visibility, setVisibility ] = useState(false);

    const hideWhenVisible = { display: visibility ? 'none' : '' };
    const showWhenVisible = { display: visibility ? '' : 'none' };

    const toggleVisibility = () => {
        setVisibility(!visibility);
    }

    useImperativeHandle(ref, () => {
        return { toggleVisibility };
    })

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={() => toggleVisibility()}>{props.label}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={() => toggleVisibility()}>cancel</button>
            </div>
        </>
    )
})

export default Togglable;