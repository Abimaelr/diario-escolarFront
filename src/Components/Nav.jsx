import React, {useEffect, useState} from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import api from '../Api/Axios';
import './css/Nav.css'

function Navegacao(props) {
    const [user, setUser] = useState('');
    const [auth, setAuth] = useState(true);
    let location = useLocation();
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

    if(!auth) return <Redirect to="/login" />
    if(location.pathname !== '/Login') { return (
        <div>
        
            <Navbar bg="light" variant="light">
                <Container>
                <Navbar.Brand>Nota 10</Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/">Início</Nav.Link>
                    <Nav.Link href="/turmas">Turmas</Nav.Link>
                    <NavDropdown title="Frequência" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Inserir</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Consultar</NavDropdown.Item>
                        {/* <NavDropdown.Divider /> */}
                        <NavDropdown.Item href="#action5">
                            Editar
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Notas" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Inserir</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Consultar</NavDropdown.Item>
                        {/* <NavDropdown.Divider /> */}
                        <NavDropdown.Item href="#action5">
                            Editar
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#features">Preferências</Nav.Link>
                    </Nav>
                </Navbar.Collapse >
                <Nav>
                    <h4 className="username">{user}</h4>
                    {/* <Nav.Link href="#pricing">Sair</Nav.Link> */}
                </Nav>
                </Container>
            </Navbar>

        </div>
    )}
    return <div></div>
}

export default Navegacao
