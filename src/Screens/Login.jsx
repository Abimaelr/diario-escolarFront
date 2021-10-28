import React,{ useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import api from '../Api/Axios';
import './css/Login.css'

import 'bulma/css/bulma.min.css'

function Login() {
    const [userId, onUserId] = useState('');
    const [password, onPass] = useState('');
    const [redirect, setRedirect] = useState(false);

    const log = (e) => {
        e.preventDefault();
        api.post('/login', {
            userId, password
        }).then(async ({data}) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('disciplinas', JSON.stringify(data.disciplinas));
            api.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            setRedirect(true);
            alert("Login feito com sucesso!")
        }).catch(({response}) => {
            const { data } = response;
            alert(data.message)
        })

    }
    if(redirect) return <Redirect to="/" />
    else
    return (

            <div>
                <Row  className="login">
                    <Col sm={ 7 }>
                        <div className="imageLogin" />
                    </Col>
                    <Col sm={ 5 }>
                        <div className="loginBox">
                            <form action="" method="post">
                                <h1>Diário de classe 2021</h1>
                                <label htmlFor="email">Login</label>
                                <br />
                                <input class="input" id="email" type="email" onChange={({target}) => onUserId(target.value)}/>
                                <br />
                                <label htmlFor="password">Senha</label>
                                <br />
                                <input class="input" id="password" type="password" onChange={({target})=> onPass(target.value)}/>
                                <br /><br /><br />
                                <input class="input" id="submit" type="submit" value="Entrar" onClick={(e)=>{log(e)}}/>
                            </form>
                        </div>
                    </Col>
                </Row>
            </div>
    )
}

export default Login
