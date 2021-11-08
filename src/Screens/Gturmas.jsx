import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import api from '../Api/Axios';

function GTurmas(props) {
    const [redirect, setRedirect] = useState(false)
    const [permissions, setPermissions] = useState('');
    const [codTurma, setcodTurma] = useState('');
    const [nomeTurma, setnomeTurma] = useState('');
    const [turno, setTurno] = useState('Manhã');

    useEffect(() => {
        api.get('/').then((response) => { setPermissions(response.data.permissions); }).catch(({ response }) => {
            const { data } = response;
            alert(data.message)
        })
    }, []);

    if (redirect) return <Redirect to='/' />
    else if (permissions === '') return <></>
    else if (permissions === 'd')
        return (
            <Container>
                <div>
                    <h1>Criar Turma</h1>
                    <input class="input is-primary" type="text" onChange={({ target }) => setcodTurma(target.value)} placeholder="Código da Turma"></input>
                    <input class="input is-primary" type="text" onChange={({ target }) => setnomeTurma(target.value)} placeholder="Nome da Turma"></input>
                    <div className="">
                        <label htmlFor="turno">Turno</label>
                        <div class="select">
                            <select onChange={({ target }) => setTurno(target.value)} id="turno">
                                <option>Manhã</option>
                                <option>Tarde</option>
                                <option>Noite</option>
                                <option>Integral</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={() => {
                        api.post('/classes', {
                            codTurma,
                            nomeTurma,
                            turno
                        })
                            .then((response) => {
                                alert("Turma criada com sucesso")
                                setRedirect(true);
                            })
                            .catch((error) =>
                                alert(error.response.data.message)
                            )
                    }}>
                        Criar!
                    </button>
                </div>
            </Container>
        )
    else return (<Redirect to='/' />)
}

export default GTurmas