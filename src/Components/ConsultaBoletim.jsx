
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Popconfirm } from 'antd';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import Tipo from '../Helpers/Tipo';
import api from '../Api/Axios';

function ConsultaBoletim(props) {
    const [redirect, setRedirect] = useState(false);
    const { title, notas, disciplina } = props;
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleEdit = () => setEdit(true);

    const saveEdit = async () => {
        api.put('disciplinas/boletins/', {
            pack: notas
        }).then(result => toast.success("Média/Competência Editada com sucesso!")).catch(error => console.log(error.response))
        setEdit(false);
    }

    const markBolN = (id, { target }) => {
        if (target.value > 10 || target.value < 0) {
            target.value = 0;
            return toast.warning('A nota deve estar entre 0 e 10')
        }
        notas[target.id].nota = target.value;
    }

    const markBolC = (id, { target }) => {
        notas[target.id].nota = target.value;
    }

    if (redirect) return <Redirect to='/boletim' />
    else
        return (
            <div>
                <div className="freqItem">
                    {title}
                    <div>

                        {console.log(notas[0])}
                        <button class="button is-danger" variant="light">
                            <Popconfirm
                                title="Confirma?"
                                onConfirm={() => {
                                    api.delete(`disciplinas/boletins?codTurma=${notas[0].codTurma}&data=${notas[0].data}&ultimaMdificacao=${notas[0].ultimaMdificacao}`)
                                        .then(message => { toast.success(message.data); setRedirect(true) });

                                }}
                                okText="Sim"
                                cancelText="Não"
                            >
                                Apagar
                            </Popconfirm>
                        </button>
                        <Button variant="light" onClick={handleEdit}>
                            Editar
                        </Button>
                        <Button variant="light" onClick={handleShow}>
                            Visualizar
                        </Button>
                    </div>
                </div>

                <Modal show={show || edit} onHide={() => { handleClose(); setEdit(false) }} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Frequência do dia: {title}
                            <br />
                            <p>{disciplina.nome}</p>
                            <hr />

                            {
                                notas[0].campos.length > 0 ?
                                    <>
                                        <h3>Campos</h3>
                                        {notas[0].campos.map(v => <h6>{v}</h6>)}
                                    </> : ''
                            }
                            <hr />
                            {
                                notas[0].eixos.length > 0 ?
                                    <>
                                        <h3>Eixos temáticos</h3>
                                        {notas[0].eixos.map(v => <h6>{v}</h6>)}
                                    </> : ''
                            }
                            {
                                notas[0].direitos.length > 0 ?
                                    <>
                                        <h3>Direitos de Aprendizagem</h3>
                                        {notas[0].direitos.map(v => <h6>{v}</h6>)}
                                    </> : ''
                            }

                        </Modal.Title>
                    </Modal.Header>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Matrícula</th>
                                {

                                }
                                <th>Nota/Competência</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notas.map((s, i) => {
                                return <tr key={i}>
                                    <td>{s.nomeCompleto}</td>
                                    <td>{s.alunoId}</td>
                                    {
                                        !edit ? <td>{s.nota}</td> :
                                            Tipo(disciplina.tipo, s, markBolC, markBolN, 'c', i, 'edit')
                                    }
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <Modal.Footer>
                        {
                            show ?
                                <Button variant="secondary" onClick={handleClose}>
                                    Fechar
                                </Button> : ''
                        }
                        {
                            edit ? <Button variant="primary" onClick={saveEdit}>
                                Salvar Alterações
                            </Button> : ''
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        )
}

export default ConsultaBoletim;
