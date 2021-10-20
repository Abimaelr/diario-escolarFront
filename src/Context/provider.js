import React, { useState } from 'react';
import Context from './context';

function Provider({children}) {
    const [user, setUser] = useState({});

    const out = {
        user, setUser
    }
    return (
        <Context.Provider value={ out }>
            {children}
        </Context.Provider>
    )
}

export default Provider;
