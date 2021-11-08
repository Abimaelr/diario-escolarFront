import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import api from '../Api/Axios';

function GStudents(props) {
    const [redirect, setRedirect] = useState(false)
    const [permissions, setPermissions] = useState('');
    const [turmas, setTurmas] = useState([]);

    const [nomeCompleto, setnomeCompleto] = useState();
    const [alunoId, setalunoId] = useState();
    const [nascimento, setNascimento] = useState();
    const [codTurma, setcodTurma] = useState();

    const [alunoIdS, setalunoIds] = useState('');
    const [turma, setTurma] = useState();
    const [aluno, setAluno] = useState();

    useEffect(() => {
        api.get('/').then((response) => { setPermissions(response.data.permissions); }).catch(({ response }) => {
            const { data } = response;
            alert(data.message)
        });

        api.get(`classes/${permissions === 'd' ? '' : 'p'}`)
            .then(({ data }) => {
                setTurmas(data.classes)
                console.log(data.classes)
            })
            .catch(({ response }) => {
                const { data } = response;
                alert(data.message)
            }
            )
    });
    if (redirect) return (<Redirect to='/' />)
    else if (permissions === '') return <></>
    else if (permissions === 'd')
        return (
            <div>
                <h1>Gerenciar Estudantes</h1>
                <hr />
                <h2>Criar Estudante</h2>
                <input class="input is-primary" type="text" onChange={({ target }) => setnomeCompleto(target.value)} placeholder="Nome Completo"></input>
                <input class="input is-primary" type="text" onChange={({ target }) => setalunoId(target.value)} placeholder="Id Aluno"></input>
                <input class="input is-primary" type="date" onChange={({ target }) => setNascimento(target.value)} placeholder="Data de Nascimento"></input>
                <div className="">
                    <label htmlFor="turma1">Turma</label>
                    <div class="select">
                        <select onChange={({ target }) => setcodTurma(target.value)} id="turma1">
                            <option value="">-------</option>
                            {turmas.map(i =>
                                <option value={i.codTurma}>{i.nomeTurma}</option>)}
                        </select>
                    </div>
                </div>
                <button onClick={() => {
                    api.post('/student', {
                        alunoId,
                        nomeCompleto,
                        codTurma,
                        nascimento,
                    })
                        .then((response) => {
                            alert("Aluno criado com Sucesso!")
                            setRedirect(true);
                        })
                        .catch((error) =>
                            alert(error.response.data)
                        )
                }}>
                    Criar!
                </button>
                <hr />
                <h2>Transferir Estudante</h2>
                <div>
                    <input class="input is-primary" type="text" onChange={({ target }) => setalunoIds(target.value)} placeholder="Id Aluno"></input>
                    <button onClick={() => {
                        api.get(`/student?alunoId=${alunoIdS}`)
                            .then((response) => {
                                setAluno(response.data)
                            }
                            )
                            .catch(error => {
                                alert(error.response.data)
                            })
                    }}>Procurar!</button>
                </div>
                {
                    aluno ? <>
                        <h5>{aluno.nomeCompleto}</h5>
                        <label htmlFor="turma2">Turma</label>
                        <div class="select">
                            <select onChange={({ target }) => setTurma(target.value)} id="turma2">
                                <option value="">-------</option>
                                {turmas.map(i =>
                                    <option value={i.codTurma}>{i.nomeTurma}</option>)}
                            </select>
                            <button onClick={() => {
                                api.put('/student', {
                                    alunoId: aluno.alunoId,
                                    codTurma: turma

                                })
                                    .then((response) => {
                                        setAluno(response.data)
                                        setAluno(undefined)
                                        alert(response.data)
                                        setRedirect(true)
                                    }
                                    )
                                    .catch(error => {
                                        alert(error.response.data)
                                    })
                            }}> Transferir!</button>
                        </div>
                    </> : <></>
                }
            </div >
        )
   
}

export default GStudents
