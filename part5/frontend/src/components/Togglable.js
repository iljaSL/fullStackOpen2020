import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef((props, ref) => {
    const [ loginVisible, setLoginVisible ] = useState(false);
    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '' : 'none' };

    const toggleVisibility = () => {
        setLoginVisible(!loginVisible);
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
                <button onClick={() => toggleVisibility()}>close</button>
            </div>
        </>
    )
})

export default Togglable;