import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Container } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../Api/Axios';

import './css/G.css'

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
            toast.warning(data.message)
        });

        api.get(`classes/${permissions === 'd' ? '' : 'p'}`)
            .then(({ data }) => {
                setTurmas(data.classes)
                console.log(data.classes)
            })
            .catch(({ response }) => {
                const { data } = response;
                toast.warning(data.message)
            }
            )
    });
    if (redirect) return (<Redirect to='/' />)
    else if (permissions === '') return <></>
    else if (permissions === 'd')
        return (
            <Container>
                <div className="bread">
                    <h3> Gerenciar Estudantes</h3>
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <Link to="/">Início</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Gerenciar Estudantes
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <br />
                </div>
                <hr />
                <h4>Criar Estudante</h4>
                <div className="form">
                    <input class="input is-primary" type="text" onChange={({ target }) => setnomeCompleto(target.value)} placeholder="Nome Completo"></input>
                    <input class="input is-primary" type="text" onChange={({ target }) => setalunoId(target.value)} placeholder="Id Aluno"></input>
                    <div className="label">
                        <label htmlFor="data">Nascimento</label>
                        <input class="input is-primary" id="data" type="date" onChange={({ target }) => setNascimento(target.value)} placeholder="Data de Nascimento"></input>
                    </div>
                    <div className="label">
                        <label htmlFor="turma1">Turma</label>
                        <div class="select">
                            <select onChange={({ target }) => setcodTurma(target.value)} id="turma1">
                                <option value="">-------</option>
                                {turmas.map(i =>
                                    <option value={i.codTurma}>{i.nomeTurma}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="submit">
                    <button className="button" onClick={() => {
                        api.post('/student', {
                            alunoId,
                            nomeCompleto,
                            codTurma,
                            nascimento,
                        })
                            .then((response) => {
                                toast.success("Aluno criado com Sucesso!")
                                setRedirect(true);
                            })
                            .catch((error) =>
                                toast.warning(error.response.data)
                            )
                    }}>
                        Criar!
                    </button>
                </div>
                <hr />
                <h4>Transferir Estudante</h4>
                <div>
                    <div className="search">
                        <input class="input is-primary" type="text" onChange={({ target }) => setalunoIds(target.value)} placeholder="Id Aluno"></input>
                        <button className="button" onClick={() => {
                            api.get(`/student?alunoId=${alunoIdS}`)
                                .then((response) => {
                                    setAluno(response.data)
                                }
                                )
                                .catch(error => {
                                    toast.warning(error.response.data)
                                })
                        }}>Procurar!</button>
                    </div>
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
                            <div className="submit">
                                <button className="button" onClick={() => {
                                    api.put('/student', {
                                        alunoId: aluno.alunoId,
                                        codTurma: turma

                                    })
                                        .then((response) => {
                                            setAluno(response.data)
                                            setAluno(undefined)
                                            toast.success(response.data)
                                            setRedirect(true)
                                        }
                                        )
                                        .catch(error => {
                                            toast.warning(error.response.data)
                                        })
                                }}> Transferir!</button>
                            </div>
                        </div>
                    </> : <></>
                }
            </Container >
        )

}

export default GStudents
