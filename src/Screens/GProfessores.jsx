import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Container } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../Api/Axios';

import './css/G.css'

function Gprofessores(props) {
    const [permissions, setPermissions] = useState('');
    const [turmas, setTurmas] = useState([]);
    const [professor, setProfessor] = useState({});
    const [matricula, setMatricula] = useState('');

    const [nome, setNome] = useState('');
    const [userId, setUser] = useState('');
    const [profId, setProfid] = useState('');
    const [Cturmas, setCTurmas] = useState([]);

    const [eUserId, seteUserId] = useState('');
    const [eTurma, setETurma] = useState([]);


    useEffect(() => {
        api.get('/').then((response) => { setPermissions(response.data.permissions); }).catch(({ response }) => {
            const { data } = response;
            toast.warning(data.message)
        })
    }, []);

    useEffect(() => {
        api.get('/classes').then((response) => { setTurmas(response.data.classes) }).catch(({ response }) => {
            const { data } = response;
            toast.warning(data.message)
        })
    }, []);

    // useEffect(() => {
    //     api.get('/professores').then((response) => { setProfessores(response.data.professores)}).catch(({ response }) => {
    //         const { data } = response;
    //         alert(data.message)
    //     })
    // }, []);


    const cTurma = (value) => {
        if (Cturmas.includes(value))
            setCTurmas(Cturmas.filter(t => t !== value))
        else
            setCTurmas([...Cturmas, value]);
    }

    const edTurma = (value) => {
        if (eTurma.includes(value))
            setETurma(eTurma.filter(t => t !== value))
        else
            setETurma([...eTurma, value]);
    }


    if (permissions === '') return <></>
    else if (permissions === 'd')
        return (
            <Container>
                <div className="bread">
                    <h3> Gerenciar Professores</h3>
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <Link to="/">Início</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Gerenciar Professores
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <br />
                </div>
                <h4>Editar professor</h4>
                <div className="search" action="">
                    <input required onChange={({ target }) => setMatricula(target.value)} class="input is-hovered" type="text" placeholder="Matrícula" />
                    <button className="button" onClick={() => {
                        api.get(`professores?profId=${matricula}`)
                            .then((response) => {
                                const { data } = response;
                                if (response) {
                                    setProfessor(data[0]);
                                    setETurma(data[0].turmas);
                                    seteUserId(data[0].userId);
                                }
                            }).catch((errors) => {
                                toast.warning("Professor não encontrado")
                            });
                    }}>Procurar</button>
                </div>
                <br />
                {professor.turmas ? <>
                    <p>Nome: {professor.nome}</p>
                    <input required class="input is-hovered" type="email" placeholder="email" defaultValue={professor.userId} />
                    <div className="turmaBox">
                        {turmas.map(t => (
                            <label class="checkbox">
                                <input defaultChecked={professor.turmas.includes(t.codTurma)} onChange={() => edTurma(t.codTurma)} value={t.codTurma} type="checkbox" />
                                {t.nomeTurma}
                            </label>
                        ))}
                    </div>
                    <div className="submit">
                        <button className="button"
                            onClick={() => {
                                api.put('/professores', {
                                    userId: eUserId,
                                    turmas: eTurma,
                                    profId: matricula
                                }).then(({ data }) => toast.success(data.message))
                            }
                            }
                        >Salvar alterações!</button>
                    </div>
                </> : <></>
                }
                <hr />

                <h4>Criar professor</h4>
                <form class="control">
                    <input required class="input is-hovered" onChange={({ target }) => setNome(target.value)} type="text" placeholder="Nome" />
                    <input required class="input is-hovered" onChange={({ target }) => setUser(target.value)} type="email" placeholder="email" />
                    <input required class="input is-hovered" onChange={({ target }) => setProfid(target.value)} type="text" placeholder="matrícula" />
                    <h5>Turmas</h5>
                    <div className="turmaBox">
                        {turmas.map(t => (
                            <label class="checkbox">
                                <input onChange={() => cTurma(t.codTurma)} value={t.codTurma} type="checkbox" />
                                {t.nomeTurma}
                            </label>
                        ))}
                    </div>
                    <div className="submit">
                        <button className="button" onClick={(e) => {
                            e.preventDefault();

                            api.post('/professores', {
                                nome,
                                userId,
                                profId,
                                turmas: Cturmas

                            }).then(response => toast.success(response.data)).catch(error => toast.warning(error.response.data))
                        }}>
                            Criar Professor!
                        </button>
                    </div>
                </form>
            </Container>
        )
    else return (<Redirect to='/' />)
}

export default Gprofessores
