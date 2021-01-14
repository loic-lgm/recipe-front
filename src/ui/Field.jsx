import React from 'react';
import PropTypes from 'prop-types';

export function Field ({name, children, type = 'text', error, ...props}) {

    return <>
        {children && <label htmlFor={name}>{children}</label>}
        <input type={type} name={name} id={name} className={error ? 'isInvalid' : ''} {...props}/>
        {error && <div>{error}</div>}
    </>
    
}
 
Field.propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.string,
    error: PropTypes.string
}