import React,{ useState, useEffect }from 'react';
import api from '../Api/Axios';
import { useLocation } from 'react-router-dom';
import Tipo from '../Helpers/Tipo'

function Nota (d) {
    if(d.tipo === 'ci') return {
        nota: "Atingida",
        DAprendizagem: [],
        Experiencia:[]
    }
    if(d.tipo === 'c') return {
        nota: "Satisfatório",
        Eixo: []
    }
    if(d.tipo === 'n') return {
        nota: "0.0",
    }
}



function InserirFreq(props) {
    const { students, setStudents, turma, disciplina, data, horaAula, anotacoes, bimestre } = props.dados;
    const date = new Date();

    const location = useLocation().pathname;

    const [student, setStudent] = useState({});
    useEffect(()=> {
        setStudents([])
        console.log('TO AQUI')
        api.get(`/classes/students/${turma}`)
        .then(({data}) =>{ 
            if(location === '/diario' ){
                setStudents(data.students);
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
                    })
                } else {
                    setStudents(data.students);
                    const buffer = { };
                    data.students.forEach(({ alunoId, codTurma, nomeCompleto }) => {
                        buffer[`${alunoId}`] = {
                            alunoId,
                            nomeCompleto,
                            codTurma,
                            ...Nota(disciplina),
                            ultimaMdificacao: date.toISOString()
                        }
                    setStudent(  buffer  );
                    })
                }
           }
           )
            .catch(({response}) => setStudents([]))
    },[turma, disciplina])

    const markFreq = (id, {target}) => {
        const buffer = student;
        buffer[`${id}`] ={
            ...buffer[`${id}`],
            presenca: target.checked,
        }
        setStudent(buffer);
    }
    const markBolN= (id, {target}) => {
        if(target.value > 10 || target.value < 0) {
            target.value = 0;
            return alert('A nota deve estar entre 0 e 10')
        }
        const buffer = student;
        buffer[`${id}`] ={
            ...buffer[`${id}`],
            nota: target.value,
        }
        setStudent(buffer);
    }

    const markBolC = (id, {target}) => {
        console.log(target.value)
        const buffer = student;
        buffer[`${id}`] ={
            ...buffer[`${id}`],
            nota: target.value,
        }
        setStudent(buffer);
    }

    const registrar = (e) => {
        e.preventDefault();
        if(data === '' || turma === '' || disciplina === '' || !(horaAula === '' || bimestre === '') || anotacoes === '') {
            return alert("Preencha todos os campos!");
            
        }
        const arr = [];
       
        if(location === '/diario') {
            Object.keys(student).forEach( s => {
                arr.push({
                    ...student[s],
                    obs: anotacoes,
                    data,
                    disciplina,
                })
            })
            const out = { pack: arr };
            for (let i = 0; i < horaAula; i++)
                api.post('/disciplinas/diarios/', out ).then( (result) => alert('Frequencia registrada com sucesso!')).catch( ({response}) => alert(response.data.message))
        }
        else if ( location === '/boletim'){
            Object.keys(student).forEach( s => {
                arr.push({
                    ...student[s],
                    obs: anotacoes,
                    data,
                    disciplina,
                    bimestre
                })
            })
    
            const out = { pack: arr };

            api.post('/disciplinas/boletins/', out ).then( (result) => alert('Boletim registrado com sucesso!')).catch( ({response}) => alert(response.data.message))
        }
        }

    if(students.length > 0) return (
    <div>
        <button class="button" type="submit" onClick={ registrar }>Registrar!</button>
        <table class="table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Matrícula</th>
                    <th>
                    {
                        location === "/diario" ? "Presente?" : "Nota"
                    }
                    </th>
                </tr>
            </thead>
            <tbody>
                { students.map((s,i) => { 
                    return <tr key={i}>
                    <td>{s.nomeCompleto}</td>
                    <td>{s.alunoId}</td>
                    {
                        location === '/diario' ? <td><input onChange={ (event) => markFreq(s.alunoId, event) }type="checkbox" id={ s.alunoId } defaultChecked /></td>:
                        <td> {Tipo(disciplina.tipo, s, markBolC, markBolN)}
                           </td>

                    }
                </tr>}) }
            </tbody>
        </table>
    </div>
    )
    else return ''
}

export default InserirFreq;
