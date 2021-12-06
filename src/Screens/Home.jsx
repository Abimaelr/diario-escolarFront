import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import api from '../Api/Axios';
import './css/Home.css'
import { toast } from 'react-toastify';
import Loading from '../Components/Loading';

function Home(props) {
    const [auth, setAuth] = useState(true);
    const [permissions, setPermissions] = useState('');
    const [load, setLoad] = useState(false);
    useEffect(() => {
        api.get('/').then((response) => { setAuth(true); setPermissions(response.data.permissions); setLoad(true)}).catch(({ response }) => {
            const { data } = response;
            // toast.warning(data.message)
            setAuth(false);
        })
    }, []);
    if (!load) return <Loading />
    else if (!auth) return <Redirect to="/login" />
    else
    return (
        <div>
            <Container>
                <div className="links">
                    <Link className="link seletor" to="/config"><h3 >Meus Componentes Curriculares</h3></Link>
                    {/* <Link className="link seletor" to="/diario"><h3 >Registro de Aula</h3></Link> */}
                    <Link className="link seletor" to="/boletim"><h3 >Registro de Médias/Competências</h3></Link>
                    {permissions === 'd' ? <>
                        <Link className="link seletor" to={{ pathname: "/gestudantes", state: { permissions } }}><h3>Gerenciar Estudantes</h3></Link>
                        <Link className="link seletor" to={{ pathname: "/gturma", state: { permissions } }}><h3 >Criar Turma</h3></Link>
                        <Link className="link seletor" to={{ pathname: "/gprofessores", state: { permissions } }}><h3 >Gerenciar Professores</h3></Link>
                    </> : <></>}

                    <Link className="link seletor" to="/turmas"><h3>Minhas Turmas</h3></Link>
                    <a className="link seletor tutorial" target="_blank" href="https://drive.google.com/drive/folders/1KbeTICcWUWC0T4VJZFuadpB5ZqGN7czE?usp=sharing" rel="noreferrer"><h3>Tutoriais</h3></a>
                </div>
                <div className="secondary">

                    <Link className="sair" onClick={() => localStorage.clear()} to="/Login"><div >Sair</div></Link>
                </div>
            </Container>
        </div>
    )
}

export default Home
