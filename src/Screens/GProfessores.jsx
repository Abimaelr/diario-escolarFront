import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router';
import api from '../Api/Axios';

import './css/G.css'

function Gprofessores(props) {
    const [permissions, setPermissions] = useState('');
    const [turmas, setTurmas] = useState([]);
    const [professor, setProfessor] = useState({});
    const [matricula, setMatricula] = useState('');

    useEffect(() => {
        api.get('/').then((response) => { setPermissions(response.data.permissions); }).catch(({ response }) => {
            const { data } = response;
            alert(data.message)
        })
    }, []);

    useEffect(() => {
        api.get('/classes').then((response) => { setTurmas(response.data.classes) }).catch(({ response }) => {
            const { data } = response;
            alert(data.message)
        })
    }, []);

    // useEffect(() => {
    //     api.get('/professores').then((response) => { setProfessores(response.data.professores)}).catch(({ response }) => {
    //         const { data } = response;
    //         alert(data.message)
    //     })
    // }, []);




    if (permissions === '') return <></>
    else if (permissions === 'd')
        return (
            <Container>
                <h1>Editar professor</h1>
                <div className="search" action="">
                    <input required onChange={({ target }) => setMatricula(target.value)} class="input is-hovered" type="text" placeholder="Matrícula" />
                    <button onClick={() => {
                        api.get(`professores?profId=${matricula}`).then(({ data }) => setProfessor(data[0]));
                    }}>Procurar</button>
                </div>
                <br />
                <p>Nome: {professor.nome}</p>
                <input required class="input is-hovered" type="email" placeholder="email" defaultValue={professor.userId} />

                <hr />

                <h1>Criar professor</h1>
                <form class="control">
                    <input required class="input is-hovered" type="text" placeholder="Nome" />
                    <input required class="input is-hovered" type="email" placeholder="email" />
                    <input required class="input is-hovered" type="text" placeholder="matrícula" />
                    <h3>Turmas</h3>
                    <div className="turmaBox">
                        {turmas.map(t => (
                            <label class="checkbox">
                                <input value={t.codTurma} type="checkbox" />
                                {t.nomeTurma}
                            </label>
                        ))}
                    </div>
                </form>
            </Container>
        )
    else return (<Redirect to='/' />)
}

export default Gprofessores
