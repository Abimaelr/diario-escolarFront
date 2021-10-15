import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import api from '../Api/Axios';
import './css/Diarios.css'
function Diarios() {
    const date =  new Date();
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

    useEffect(() => {
        api.get('/disciplinas').then(({data}) => setDisciplinas(data.disciplinas)).catch(({response}) => alert(response))
        api.get('/classes/p').then(({data}) => setTurmas(data.classes)).catch(({response}) => alert('response'))
    }, [])

    useEffect(()=> {
        setStudents([])
        api.get(`/classes/students/${turma}`)
        .then(({data}) =>{ 
            setStudents(data.students)
            const buffer = { };
            data.students.forEach(({ alunoId, codTurma, nomeCompleto }) => {
                buffer[`${alunoId}`] = {
                    alunoId,
                    nomeCompleto,
                    codTurma,
                    presenca: true,
                    obs: "",
                    ultimaMdificacao: date.toISOString()
                }
                setStudent(  buffer  );
        })})
            .catch(({response}) => setStudents([]))
    },[turma])

    const markFreq = (id, {target}) => {
        const buffer = student;
        buffer[`${id}`] ={
            ...buffer[`${id}`],
            presenca: target.checked,
        }
        setStudent(buffer);
    }

    const registrar = (e) => {
        e.preventDefault();
        if(data === '' || turma === '' || disciplina === '' || bimestre === '' || anotacoes === '') {
            return alert("Preencha todos os campos!");
            
        }
        const arr = [];

        Object.keys(student).forEach( s => {
            arr.push({
                ...student[s],
                obs: anotacoes,
                data,
            })
        })

        const out = { pack: arr };
        api.post('/disciplinas/diarios/', out ).then( (result) => console.log(result)).catch( ({response}) => console.log(response))
    }

    return (
        <div>

            {/* {console.log(student)} */}
            <Container>
                <header >
                    <form action="">
                        <input required type="radio" id="inserir" name="acao" value="inserir" defaultChecked onChange={({ target }) => {setAction(target.value)}}/>
                        <label for="inserir">Inserir</label>
                        <br />
                        <input required type="radio" id="editar" name="acao" value="editar" onChange={({ target }) => {setAction(target.value)}} />
                        <label for="editar">Editar</label>
                        <br />
                        <input required type="radio" id="consultar" name="acao" value="consultar" onChange={({ target }) => {setAction(target.value)}} />
                        <label for="consultar">Consultar</label>
                        <br />
                        <select required name="turma" id="turmas"  onChange={({ target }) => {setTurma(target.value)}}>
                            <option value="">Escolha uma turma</option>
                            {turmas.map((e,i) => <option key={ i } value={ e.codTurma }>{ e.nomeTurma }</option>)}
                        </select>
                        <select required name="disciplina" id="disciplina"  onChange={({ target }) => {setDisciplina(target.value)}}>
                            <option value="">Escolha uma disciplina</option>
                            {disciplinas.map((e,i) => <option key={ i } value={ e }>{ e }</option>)}
                        </select>
                        <input required type="date" id="date"  onChange={({ target }) => { setData(target.value) }}/>
                        <select required name="bimestre" id="bimestre"  onChange={({ target }) => {setBimestre(target.value)}}>
                            <option value="">Escolha o bimestre</option>
                            <option value="1">1°</option>
                            <option value="2">2°</option>
                            <option value="3">3°</option>
                            <option value="4">4°</option>
                        </select>
                        <br />
                        <label htmlFor="obs">Anotações</label>
                        <input required type="text" name="" id="obs" onChange={({target}) => setAnotacoes(target.value)} />
                        <button type="submit" onClick={ registrar }>Registrar!</button>
                    </form>
                </header>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Matrícula</th>
                                <th>Presente?</th>
                            </tr>
                        </thead>
                        <tbody>
                            { students.map((s,i) => { 
                                return <tr key={i}>
                                <td>{s.nomeCompleto}</td>
                                <td>{s.alunoId}</td>
                                <td><input onChange={ (event) => markFreq(s.alunoId, event) }type="checkbox" id={ s.alunoId } defaultChecked /></td>
                            </tr>}) }
                        </tbody>
                    </table>
                    
                </div>
            </Container>
        </div>
    )
}

export default Diarios;
