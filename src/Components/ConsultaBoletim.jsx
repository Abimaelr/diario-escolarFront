import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import Tipo from '../Helpers/Tipo';

function ConsultaBoletim(props) {
    const { title, notas, disciplina } = props;
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleEdit = () => setEdit(true);

    const saveEdit = async () => {
        axios.put('disciplinas/boletins/', {
            pack: notas
        }).then(result => result).catch(error => console.log(error.response))
        setEdit(false);
    }

    const markBolN = (id, { target }) => {
        if (target.value > 10 || target.value < 0) {
            target.value = 0;
            return alert('A nota deve estar entre 0 e 10')
        }
        notas[target.id].nota = target.value;
    }

    const markBolC = (id, { target }) => {
        notas[target.id].nota = target.value;
        console.log(notas[target.id])
    }


    return (
        <div>
            <div className="freqItem">
                {title}
                <Button variant="light" onClick={handleEdit}>
                    Editar
                </Button>
                <Button variant="light" onClick={handleShow}>
                    Visualizar
                </Button>
            </div>

            <Modal show={show || edit} onHide={() => { handleClose(); setEdit(false) }} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Frequência do dia: {title}
                        <br />
                        <p>{disciplina.nome}</p>
                    </Modal.Title>
                </Modal.Header>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Matrícula</th>
                            {

                            }
                            <th>Nota</th>
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
