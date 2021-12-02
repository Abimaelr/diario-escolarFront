import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { Container } from 'react-bootstrap';
import api from '../Api/Axios';
import Inserir from '../Components/Inserir';
import Consultar from '../Components/Consultar';
import './css/Diarios.css';
import { toast } from 'react-toastify';

let campos = [];
let direitos = [];
let eixos = [];

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



    let metadata = { data, turma, setStudents, disciplina, horaAula, anotacoes, students, bimestre, campos, direitos, eixos }
    useEffect(() => {
        api.get('/disciplinas').then(({ data }) => setDisciplinas(data.disciplinas)).catch(({ response }) => toast.error('Erro'))
        api.get('/classes/p').then(({ data }) => setTurmas(data.classes)).catch(({ response }) => toast.error('Erro'))

    }, [turma, disciplina])



    const buffer = ({ target: { checked } }, value, i) => {

        const vari = [campos, direitos, eixos];
        let buffer = vari[i];

        if (checked && !buffer.includes(value))
            buffer.push(value)
        if (!checked)
            buffer = buffer.filter(e => e !== value)

        if (i === 0) campos = buffer;
        if (i === 1) direitos = buffer;
        if (i === 2) eixos = buffer;

        metadata = { ...metadata, campos, direitos, eixos };

    }

    return (
        <div>
            <Container>
                <div className="bread">
                    <h3> { location.pathname === "/diario" ? "Registro de Frequência":"Registro de Notas ou Competências"}</h3>
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <Link to="/">Início</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                        { location.pathname === "/diario" ? "Registro de Frequência":"Registro de Notas ou Competências"}
                            
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <header>
                    <form className="panel" action="">
                        <div className="action">
                            <div class="control">
                                <label for="inserir">
                                    <input required type="radio" id="inserir" name="acao" value="inserir" defaultChecked onChange={({ target }) => { setAction(target.value) }} />Inserir
                                </label>
                            </div>
                            <br />
                            <div class="control">
                                <label for="consultar"><input required type="radio" id="consultar" name="acao" value="consultar" onChange={({ target }) => { setAction(target.value) }} />Consultar</label>
                            </div>
                        </div>
                        <br />
                        <div class="control">
                            <div class="select">
                                <select required name="turma" id="turmas" onChange={({ target }) => { setTurma(target.value) }}>
                                    <option value="">Escolha uma turma</option>
                                    {turmas.map((e, i) => <option key={i} value={e.codTurma}>{e.nomeTurma}</option>)}
                                </select>
                            </div>
                        </div>
                        <div class="control">
                            <div class="select">
                                <select required name="disciplina" id="disciplina" onChange={({ target }) => { setDisciplina(JSON.parse(target.value)) }}>
                                    <option disabled selected value="">Escolha uma disciplina</option>
                                    {disciplinas.map((e, i) => <option key={i} value={JSON.stringify(e)}>{`${e.componente} - ${e.nome}`}</option>)}
                                </select>
                            </div>
                        </div>
                        {
                            action !== "consultar" ?
                                <>
                                    {location.pathname !== "/diario" ? <>
                                        <div className="checkboxGroup">
                                            {disciplina.eixos && turma !== "" ? <h5>Eixos temáticos</h5> : ''}
                                            {disciplina.eixos && turma !== "" ? disciplina.eixos.map(e => <label class="checkbox">
                                                <input type="checkbox" onChange={({ target }) => buffer({ target }, e, 2)} value={e} /> {e} </label>) : ''}
                                        </div>
                                        <div className="checkboxGroup">
                                            {disciplina.CampExp && turma !== "" ? <h5>Campos de experiência</h5> : ''}
                                            {disciplina.CampExp && turma !== "" ? disciplina.CampExp.map(e => <label class="checkbox">
                                                <input type="checkbox" onChange={({ target }) => buffer({ target }, e, 0)} value={e} /> {e} </label>) : ''}

                                        </div>
                                        <div className="checkboxGroup">
                                            {disciplina.DireitosAp && turma !== "" ? <h5>Direitos de Aprendizagem</h5> : ''}
                                            {disciplina.DireitosAp && turma !== "" ? disciplina.DireitosAp.map(e => <label class="checkbox">
                                                <input type="checkbox" value={e} onChange={({ target }) => buffer({ target }, e, 1)} /> {e} </label>) : ''}
                                        </div>
                                    </> : ''}
                                    
                                    <input required type="date" id="date" onChange={({ target }) => { setData(target.value) }} />
                                    <div class="control">
                                        <div class="select">
                                            {
                                                location.pathname === "/diario" ?
                                                    <select required name="horaAula" id="horaAula" onChange={({ target }) => { sethoraAula(target.value) }}>
                                                        <option value="">Carga Horária</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                    </select> :
                                                    <select required name="bimestre" id="bimestre" onChange={({ target }) => { setBimestre(target.value) }}>
                                                        <option value="">Selecione o Bimestre</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">final</option>
                                                    </select>
                                            }
                                        </div>
                                    </div>
                                    <textarea required class="textarea" placeholder="Anotações" rows="5" name="" id="obs" onChange={({ target }) => setAnotacoes(target.value)} />
                                </>
                                : ""
                        }

                        {/* <input type="button" value="Limpar campos" /> */}

                        {action === "inserir" ? <Inserir dados={metadata} action={action} /> : ""}
                        {action === "consultar" ? <Consultar dados={metadata} action={action} /> : ""}

                    </form>
                </header>
            </Container>
        </div>
    )
}

export default Diarios;
