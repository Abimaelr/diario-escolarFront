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
            <img src="https://www.joaopessoa.pb.gov.br/wp-content/themes/joaopessoavinte/assets/images/logo-pmjp-color-horizontal.png" alt="João Pessoa Logo" />
            <h6 className="userName">{ user }</h6>
        </header>
    )
}

export default Navegacao
