import React,{ useState, useEffect }from 'react';
import api from '../Api/Axios';

function InserirFreq(props) {
    const { students, setStudents, turma, disciplina, data, horaAula, anotacoes } = props.dados;
    const date = new Date();

    const [student, setStudent] = useState({});
    
    useEffect(()=> {
        setStudents([])
        api.get(`/classes/students/${turma}`)
        .then(({data}) =>{ 
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
        if(data === '' || turma === '' || disciplina === '' || horaAula === '' || anotacoes === '') {
            return alert("Preencha todos os campos!");
            
        }
        const arr = [];

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

    return (
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
        <button type="submit" onClick={ registrar }>Registrar!</button>
    </div>
    )
}

export default InserirFreq
