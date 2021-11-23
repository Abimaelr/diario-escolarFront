import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import api from '../Api/Axios';
import './css/Login.css'

import 'bulma/css/bulma.min.css'
import { toast } from 'react-toastify';

function Login() {
    const [userId, onUserId] = useState('');
    const [password, onPass] = useState('');
    const [redirect, setRedirect] = useState(false);

    const log = (e) => {
        e.preventDefault();
        api.post('/login', {
            userId, password
        }).then(async ({ data }) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('disciplinas', JSON.stringify(data.disciplinas));
            api.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            setRedirect(true);
            toast.success("Login feito com sucesso!")
        }).catch(({ response }) => {
            const { data } = response;
            toast.error(data.message)
        })

    }
    if (redirect) return <Redirect to="/" />
    else
        return (
            <Container fluid>
                <Row className="login">
                    <Col sm={7}>
                        <div className="imageLogin" />
                    </Col>
                    <Col sm={5}>
                        <div className="loginBox">
                            <form action="" method="post">
                                <h1>Diário de Classe 2021</h1>
                                <label htmlFor="email">Login</label>
                                <br />
                                <input class="input" id="email" type="email" onChange={({ target }) => onUserId(target.value)} />
                                <br />
                                <label htmlFor="password">Senha</label>
                                <br />
                                <input class="input" id="password" type="password" onChange={({ target }) => onPass(target.value)} />
                                <br /><br /><br />
                                <button class="input" id="submit" type="submit" value="Entrar" style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: 'center' }} onClick={(e) => { log(e) }}>Entrar</button>
                                <div className="logoContainer">
                                    <img className="loginLogo" src="https://www.joaopessoa.pb.gov.br/google/assets/img/sedec.png" alt="" />
                                    <img className="loginLogo" src="https://www.joaopessoa.pb.gov.br/wp-content/themes/joaopessoavinte/assets/images/logo-pmjp-white-horizontal.png" alt="logo" />
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>

            </Container>
        )
}

export default Login
