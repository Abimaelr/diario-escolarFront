import React,{ useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import api from '../Api/Axios';
import './css/Login.css'

import jwt from 'jsonwebtoken';

function Login() {
    const [userId, onUserId] = useState('');
    const [password, onPass] = useState('');
    const [redirect, setRedirect] = useState(false);

    const log = (e) => {
        e.preventDefault();
        api.post('/login', {
            userId, password
        }).then(async ({data}) => {
            const { disciplinas, nome, permissions, profId, turmas } = jwt.decode(data.token);
            localStorage.setItem('token', data.token);
            api.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            setRedirect(true);
            alert("Login feito com sucesso!")
        }).catch(({response}) => {
            const { data } = response;
            alert(data.message)
        })

    }
    if(redirect) return <Redirect to="/" /> 
    return (
        <Container>
            <div className="login">
                <div className="loginBox">
                    <h2>Sistema</h2>
                    <h1>Nota 10</h1>
                    <form action="" method="post">
                        <label htmlFor="email"><p>Login</p></label>
                        <br />
                        <input id="email" type="email" onChange={({target}) => onUserId(target.value)}/>
                        <br />
                        <label htmlFor="password"><p>Senha</p></label>
                        <br />
                        <input id="password" type="password" onChange={({target})=> onPass(target.value)}/>
                        <br /><br /><br />
                        <input id="submit" type="submit" value="Entrar" onClick={(e)=>{log(e)}}/>
                    </form>
                </div>
            </div>
        </Container>
    )
}

export default Login
