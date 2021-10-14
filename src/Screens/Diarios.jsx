import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import api from '../Api/Axios';
import './css/Diarios.css'
function Diarios() {

    const [action, setAction] = useState("inserir");
    const [data, setData] = useState("");
    const [turma, setTurma] = useState("");
    const [turmas, setTurmas] = useState([]);
    const [disciplina, setDisciplina] = useState("");
    const [disciplinas, setDisciplinas] = useState([]);
    const [bimestre, setBimestre] = useState("");
    const [students, setStudents] = useState([]);
    
    const [anotacoes, setAnotacoes] = useState("");
    const [student, setStudent] = useState({});
    const [freq, setFreq] = useState([]);

    useEffect(() => {
        api.get('/disciplinas').then(({data}) => setDisciplinas(data.disciplinas)).catch(({response}) => alert(response))
        api.get('/classes/p').then(({data}) => setTurmas(data.classes)).catch(({response}) => alert(response))
    }, [])

    useEffect(()=> {
        api.get(`/classes/students/${turma}`).then(({data}) => setStudents(data.students)).catch(({response}) => alert(response))
    },[turma])

    return (
        <div>
            <Container>
                <header >
                    <form action="">
                        <input type="radio" id="inserir" name="acao" value="inserir" defaultChecked onChange={({ target }) => {setAction(target.value)}}/>
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
                        <select name="bimestre" id="bimestre"  onChange={({ target }) => {setBimestre(target.value)}}>
                            <option value="-">Escolha o bimestre</option>
                            <option value="1">1°</option>
                            <option value="2">2°</option>
                            <option value="3">3°</option>
                            <option value="4">4°</option>
                        </select>
                    </form>
                </header>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Matrícula</th>
                                <th>Presença</th>
                            </tr>
                        </thead>
                        <tbody>
                            { students.map((s,i) => { 
                                setStudents({...students, alunoId: s.alunoId})
                                return <tr key={i}>
                                <td>{s.nomeCompleto}</td>
                                <td>{s.alunoId}</td>
                                <td><input type="checkbox" id={ s.alunoId } defaultChecked/></td>
                            </tr>}) }
                        </tbody>
                    </table>
                    <label htmlFor="obs">Anotações</label>
                    <input type="text" name="" id="obs" onChange={({target}) => setAnotacoes(target.value)} />
                </div>
            </Container>
        </div>
    )
}

export default Diarios
