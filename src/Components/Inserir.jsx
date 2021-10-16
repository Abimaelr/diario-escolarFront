import React,{ useState, useEffect }from 'react';
import api from '../Api/Axios';
import { useLocation } from 'react-router-dom';

function InserirFreq(props) {
    const { students, setStudents, turma, disciplina, data, horaAula, anotacoes, bimestre } = props.dados;
    const date = new Date();

    const location = useLocation().pathname;

    const [student, setStudent] = useState({});
    useEffect(()=> {
        setStudents([])
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
                            nota: "0.0",
                            obs: "",
                            ultimaMdificacao: date.toISOString()
                        }
                    setStudent(  buffer  );
                    })
                }
           }
           
           
           )
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
    const markBol= (id, {target}) => {
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
                    horaAula
                })
            })
            const out = { pack: arr };
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

    return (
    <div>
        <table>
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
                        <td><input onChange={ (event) => markBol(s.alunoId, event) }type="number" min="0" defaultValue="0" max="10.0" id={ s.alunoId } defaultChecked /></td>

                    }
                </tr>}) }
            </tbody>
        </table>
        <button type="submit" onClick={ registrar }>Registrar!</button>
    </div>
    )
}

export default InserirFreq
