import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import DatePicker, { ReactDatePicker } from 'react-datepicker';
import { Container } from 'react-bootstrap';
import api from '../Api/Axios';
import Inserir from '../Components/Inserir';
import Consultar from '../Components/Consultar';
import './css/Diarios.css';

function Diarios() {

    const location = useLocation();
    // const date =  new Date();
    const [action, setAction] = useState("inserir");
    const [data, setData] = useState("");
    const [turma, setTurma] = useState("");
    const [turmas, setTurmas] = useState([]);
    const [disciplina, setDisciplina] = useState("");
    const [disciplinas, setDisciplinas] = useState([]);
    const [horaAula, sethoraAula] = useState("");
    const [students, setStudents] = useState([]);
    const [bimestre, setBimestre] = useState("");
    const [anotacoes, setAnotacoes] = useState("");


    useEffect(() => {
        api.get('/disciplinas').then(({data}) => setDisciplinas(data.disciplinas)).catch(({response}) => alert(response))
        api.get('/classes/p').then(({data}) => setTurmas(data.classes)).catch(({response}) => alert('response'))
    }, [])

 
    const metadata = {data, turma, setStudents, disciplina, horaAula,anotacoes,students, bimestre}

    return (
        <div>
            <Container>
                <header >
                    <form action="">
                        <input required type="radio" id="inserir" name="acao" value="inserir" defaultChecked onChange={({ target }) => {setAction(target.value)}}/>
                        <label for="inserir">Inserir</label>
                        <br />
                        <input required type="radio" id="consultar" name="acao" value="consultar" onChange={({ target }) => {setAction(target.value)}} />
                        <label for="consultar">Consultar</label>
                        <br />
                        <select required name="turma" id="turmas"  onChange={({ target }) => {setTurma(target.value)}}>
                            <option value="">Escolha uma turma</option>
                            {turmas.map((e,i) => <option key={ i } value={ e.codTurma }>{ e.nomeTurma }</option>)}
                        </select>
                        <select required name="disciplina" id="disciplina"  onChange={({ target }) => {setDisciplina(JSON.parse(target.value))}}>
                            <option value="">Escolha uma disciplina</option>
                            {disciplinas.map((e,i) => <option key={ i } value={ JSON.stringify(e) }>{ `${e.componente} - ${e.nome}` }</option>)}
                        </select>
                        <br />
                        {
                            action !== "consultar" ? 
                            <>     
                                <input required type="date" id="date"  onChange={({ target }) => { setData(target.value) }}/>
                                <label htmlFor="obs">Anotações</label>
                                <input required type="text" name="" id="obs" onChange={({target}) => setAnotacoes(target.value)} />
                                {
                                    location.pathname === "/diario" ? 
                                    <select required name="horaAula" id="horaAula"  onChange={({ target }) => {sethoraAula(target.value)}}>
                                        <option value="">Carga Horária</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select> : 
                                    <select required name="bimestre" id="bimestre"  onChange={({ target }) => {setBimestre(target.value)}}>
                                        <option value="">Selecione o Bimestre</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">final</option>
                                    </select>
                                }
                              
                            </>
                            : ""
                        }
                        {/* <input type="button" value="Limpar campos" /> */}
                    </form>
                </header>
                { action === "inserir" ? <Inserir dados={ metadata } action={action} /> : "" }
                { action === "consultar" ? <Consultar dados={ metadata } action={action} /> : "" }
            </Container>
        </div>
    )
}

export default Diarios;
