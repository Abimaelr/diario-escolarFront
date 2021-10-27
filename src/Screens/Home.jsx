import React, {useEffect, useState} from 'react';
import { Redirect, useLocation, Link } from 'react-router-dom';
import { Navbar, Container, Nav} from 'react-bootstrap';
import api from '../Api/Axios';
import './css/Home.css'

function Home(props) {
    const [user, setUser] = useState('');
    const [auth, setAuth] = useState(true);
    // let location = useLocation();
    useEffect(()=>{
        api.get('/').then((response) => {
            const { nome } = response.data;
            setUser(nome)
        }).catch(({response}) => {
            const { data } = response;
            setAuth(false);
            alert(data.message)
        })
    },[]);

     return (
        <div>
            <Container>
                <Link to="/">Início</Link>
                <Link to="/turmas">Turmas</Link>
                <Link to="/diario">Frequencia</Link>
                <Link to="/boletim">Boletim</Link>
                <Link to="/config">Preferências</Link>
                <h4 className="username">{user}</h4>
                {/* <Nav.Link href="#pricing">Sair</Nav.Link> */}
                <Link className="out" onClick={ () => localStorage.clear() } to="/Login">Sair</Link>
            </Container>
        </div>
    )
}

export default Home
