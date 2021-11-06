import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import api from '../Api/Axios';
import './css/Home.css'

function Home(props) {
    const [auth, setAuth] = useState(true);
    const [permissions, setPermissions] = useState('');
    useEffect(() => {
        api.get('/').then((response) => { setPermissions(response.data.permissions); }).catch(({ response }) => {
            const { data } = response;
            alert(data.message)
            setAuth(false);
        })
    }, []);
    if (!auth) return <Redirect to="/login" />
    return (
        <div>
            <Container>
                <div className="links">
                    <Link className="link seletor a" to="/turmas"><h1>Turmas</h1></Link>
                    <Link className="link seletor" to="/diario"><h1 >Frequência</h1></Link>
                    {permissions === 'd' ? <>
                        <Link className="link seletor" to={{ pathname: "/gestudantes", state: { permissions } }}><h1>Gerenciar Estudantes</h1></Link>
                        <Link className="link seletor" to={{ pathname: "/gturma", state: { permissions } }}><h1 >Gerenciar Turmas</h1></Link>
                        <Link className="link seletor" to={{ pathname: "/gprofessores", state: { permissions } }}><h1 >Gerenciar Professores</h1></Link>
                    </> : <></>}
                    <Link className="link seletor" to="/boletim"><h1 >Boletim</h1></Link>
                    <Link className="link seletor b" to="/config"><h1 >Disciplinas</h1></Link>
                    <Link className="link out seletor" onClick={() => localStorage.clear()} to="/Login"><div >Sair</div></Link>
                </div>
            </Container>
        </div>
    )
}

export default Home
