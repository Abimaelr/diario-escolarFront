import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Modal, Button } from  'react-bootstrap';
import { useLocation } from 'react-router-dom';

function ConsultaBoletim(props) {
    const location = useLocation().pathname;
    const { title , sub, info, notas, disciplina } = props;
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [nota, setNota] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleEdit = () => setEdit(true);

    const saveEdit = async () => {
        axios.put('disciplinas/boletins/', {
            pack: notas
        }).then(result => console.log(result))
        setEdit(false);
    }

    useEffect(() => {
        console.log(notas);
    })

    const editNota = ({target}) => {
        if(target.value > 10 || target.value < 0) {
            target.value = 0;
            return alert('A nota deve estar entre 0 e 10')
        }
        notas[target.id].nota = target.value;
    }

    return (
        <div>
            <div className="freqItem">
                { title }
                <Button variant="light" onClick={handleEdit}>
                    Editar
                </Button>
                <Button variant="light" onClick={handleShow}>
                    Visualizar
                </Button>
            </div>

            <Modal show={show || edit} onHide={() => { handleClose(); setEdit(false)}} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>Frequência do dia: {title}
            <br />
            <p>{ disciplina }</p>
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
                    { notas.map((s,i) => { 
                        return <tr key={i}>
                        <td>{s.nomeCompleto}</td>
                        <td>{s.alunoId}</td>
                        {
                            !edit ? <td>{s.nota}</td>:
                            <td><input min="0" max="10" type="number" name="" id={i} defaultValue={ s.nota } onChange={ editNota } /></td>
                        }
                    </tr>}) }
                </tbody>
            </table>
            <Modal.Footer>
                {
                    show?
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button> : ''
                }
                {
                    edit? <Button variant="primary" onClick={saveEdit}>
                     Salvar Alterações
                    </Button> : ''
                }
            </Modal.Footer>
        </Modal>
        </div>
    )
}

export default ConsultaBoletim;