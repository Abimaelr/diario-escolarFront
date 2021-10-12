import React,{useState} from 'react';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import api from '../Api/Axios';


function Login() {
    const [userId, onUserId] = useState('');
    const [password, onPass] = useState('');
    const [redirect, setRedirect] = useState(false);

    const log = (e) => {
        e.preventDefault();
        api.post('/login', {
            userId, password
        }).then(({data}) => {
            alert("Login feito com sucesso!")
            localStorage.setItem('token', data.token);
            api.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            setRedirect(true);
        }).catch(({response}) => {
            const { data } = response;
            alert(data.message)
        })

    }
    if(redirect) return <Redirect to="/" /> 
    return (
        <Container>
            <form action="" method="post">
                <label htmlFor="email">login</label>
                <input id="email" type="email" onChange={({target}) => onUserId(target.value)}/>
                <label htmlFor="password">Senha</label>
                <input id="password" type="password" onChange={({target})=> onPass(target.value)}/>
                <input id="submit" type="submit" onClick={(e)=>{log(e)}}/>
            </form>
        </Container>
    )
}

export default Login
