import React, { useContext } from 'react';
import Context from '../Context/context';

function Settings() {
    const { user } = useContext(Context);
    console.log(user)
    return (
        <div>
        
        </div>
    )
}

export default Settings
