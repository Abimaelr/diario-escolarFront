import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import api from '../Api/Axios';

function Diarios() {

    const [action, setAction] = useState("inserir");
    const [data, setData] = useState("");
    const [turma, setTurma] = useState("");
    const [turmas, setTurmas] = useState([]);
    const [disciplina, setDisciplina] = useState("");
    const [disciplinas, setDisciplinas] = useState([]);

    useEffect(() => {
        api.get('/disciplinas').then(({data}) => setDisciplinas(data.disciplinas)).catch(({response}) => alert(response))
        api.get('/classes/p').then(({data}) => setTurmas(data.classes)).catch(({response}) => alert(response))
    }, [])

    return (
        <div>
            <Container>
                <header >
                    <form action="">
                        <input type="radio" id="inserir" name="acao" value="inserir" onChange={({ target }) => {setAction(target.value)}}/>
                        <label for="inserir">Inserir</label>
                        <br />
                        <input type="radio" id="editar" name="acao" value="editar" onChange={({ target }) => {setAction(target.value)}} />
                        <label for="editar">Editar</label>
                        <br />
                        <input type="radio" id="consultar" name="acao" value="consultar" onChange={({ target }) => {setAction(target.value)}} />
                        <label for="consultar">Consultar</label>
                        <br />
                        <select name="turma" id="turmas"  onChange={({ target }) => {setTurma(target.value)}}>
                            <option value="-">Escolha uma turma</option>
                            {turmas.map((e,i) => <option key={ i } value={ e.codTurma }>{ e.nomeTurma }</option>)}
                        </select>
                        <select name="disciplina" id="disciplina"  onChange={({ target }) => {setDisciplina(target.value)}}>
                            <option value="-">Escolha uma disciplina</option>
                            {disciplinas.map((e,i) => <option key={ i } value={ e }>{ e }</option>)}
                        </select>
                        <input type="date" id="date"  onChange={({ target }) => { setData(target.value) }}/>
                    </form>
                </header>
            </Container>
        </div>
    )
}

export default Diarios
