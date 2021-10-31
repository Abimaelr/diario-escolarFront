import React, {useEffect, useState} from 'react';
import { Redirect, useLocation, Link } from 'react-router-dom';
import { Navbar, Container, Nav} from 'react-bootstrap';
import api from '../Api/Axios';
import './css/Nav.css'

function Navegacao(props) {
    const [user, setUser] = useState('');

    useEffect(()=>{
        api.get('/').then((response) => {
            const { nome } = response.data;
            setUser(nome)
        }).catch(({response}) => {
            const { data } = response;
            alert(data.message)
        })
    },[]);

     return (
        <header className="header">
            <h5  className="userName">Diário de Classe 2021</h5>
            <h6 className="userName">{ user }</h6>
        </header>
    )
}

export default Navegacao
