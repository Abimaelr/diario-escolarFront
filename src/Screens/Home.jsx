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
                    <Link className="link seletor" to="/config"><h3 >Meus Componentes Curriculares</h3></Link>
                    <Link className="link seletor" to="/diario"><h3 >Registro de Aula</h3></Link>
                    <Link className="link seletor" to="/boletim"><h3 >Registro de Notas/Competências</h3></Link>
                    {permissions === 'd' ? <>
                        <Link className="link seletor" to={{ pathname: "/gestudantes", state: { permissions } }}><h3>Gerenciar Estudantes</h3></Link>
                        <Link className="link seletor" to={{ pathname: "/gturma", state: { permissions } }}><h3 >Criar Turma</h3></Link>
                        <Link className="link seletor" to={{ pathname: "/gprofessores", state: { permissions } }}><h3 >Gerenciar Professores</h3></Link>
                    </> : <></>}

                    <Link className="link seletor" to="/turmas"><h3>Minhas Turmas</h3></Link>
                </div>
                <div className="secondary">

                    <Link className="sair" onClick={() => localStorage.clear()} to="/Login"><div >Sair</div></Link>
                </div>
            </Container>
        </div>
    )
}

export default Home
