import React, {useState, useEffect} from 'react';
import { Modal, Button } from  'react-bootstrap';


function InfoCard(props) {
    const { title , sub, info, freq, disciplina } = props;
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [faltas, setFaltas] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleEdit = () => setEdit(true);
    const saveEdit = () => setEdit(false);
    useEffect(() => {
        let f = 0;
        freq.forEach((s,i) => { 
         if(!s.presenca) f++;
        })
        setFaltas(f);
    }, []);

    const editFreq = ({target}) => {
        freq[target.id].presenca = !freq[target.id].presenca;
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

            <Modal show={show || edit} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>Frequência do dia: {title}
            <br />
            <p>{ disciplina }</p>
            <p>Faltas: { faltas }</p>
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
                    { freq.map((s,i) => { 
                        return <tr key={i}>
                        <td>{s.nomeCompleto}</td>
                        <td>{s.alunoId}</td>
                        {
                            !edit ? <td>{ s.presenca === true? "SIM" : "NÃO"}</td>:
                            <td> <input type="checkbox" name="" id={i} defaultChecked={s.presenca === true} onChange={ editFreq } /></td>
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

export default InfoCard
