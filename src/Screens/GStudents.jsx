import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import api from '../Api/Axios';

function GStudents(props) {
    const [permissions, setPermissions] = useState('');
    useEffect(() => {
        api.get('/').then((response) => { setPermissions(response.data.permissions); }).catch(({ response }) => {
            const { data } = response;
            alert(data.message)
        })
    }, []);

    if (permissions === '') return <></>
    else if (permissions === 'd')
        return (
            <div>
                <h1>Gerenciar Estudantes</h1>
            </div>
        )
    else return (<Redirect to='/' />)
}

export default GStudents
