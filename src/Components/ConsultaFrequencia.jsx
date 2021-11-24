// import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Popconfirm } from 'antd';
import { Modal, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../Api/Axios';
import './css/Consultar.css'
import "antd/dist/antd.css";


function InfoCard(props) {
    const { title, freq, disciplina } = props;
    const [redirect, setRedirect] = useState(false);
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [faltas, setFaltas] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleEdit = () => setEdit(true);

    const saveEdit = async () => {
        api.put('disciplinas/diarios/', {
            pack: freq,
        }).then(result => toast.success('Frequencia Editada com Sucesso!'))
        setEdit(false);
    }

    useEffect(() => {
        let f = 0;
        freq.forEach((s, i) => {
            if (!s.presenca) f++;
        })
        setFaltas(f);
    }, [edit, freq, show]);

    const editFreq = ({ target }) => {
        freq[target.id].presenca = !freq[target.id].presenca;
    }
    if (redirect) return <Redirect to='/diario' />
    else
        return (
            <div>
                {console.log(freq)}
                <div className="freqItem">
                    <h5>{title}</h5>
                    <h6>{freq[0].obs}</h6>
                    <div>

                        <button class="button is-danger" variant="light">
                            <Popconfirm
                                title="Confirma?"
                                onConfirm={() => {
                                    api.delete(`disciplinas/diarios?codTurma=${freq[0].codTurma}&data=${freq[0].data}&ultimaMdificacao=${freq[0].ultimaMdificacao}`)
                                        .then(message => { toast.success(message.data); setRedirect(true)});
                                    
                                }}
                                okText="Sim"
                                cancelText="Não"
                            >
                                Apagar
                            </Popconfirm>
                        </button>

                        <button class="button" variant="light" onClick={(e) => { e.preventDefault(); handleEdit() }}>
                            Editar
                        </button>
                        <button class="button" variant="light" onClick={(e) => { e.preventDefault(); handleShow() }}>
                            Visualizar
                        </button>
                    </div>
                </div>

                <Modal show={show || edit} onHide={() => { handleClose(); setEdit(false) }} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Frequência do dia: {title}
                            <br />
                            <p>{disciplina.nome}</p>
                            <p>Faltas: {faltas}</p>
                        </Modal.Title>
                    </Modal.Header>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Matrícula</th>
                                <th>Presença</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(freq).map((s, i) => {
                                return <tr key={i}>
                                    <td>{s.nomeCompleto}</td>
                                    <td>{s.alunoId}</td>
                                    {
                                        !edit ? <td>{s.presenca === true ? "SIM" : "NÃO"}</td> :
                                            <td><input type="checkbox" name="" id={i} defaultChecked={s.presenca} onChange={editFreq} /></td>
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

export default InfoCard
