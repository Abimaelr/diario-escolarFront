import React,{ useState, useEffect }from 'react';
import api from '../Api/Axios';
import { useLocation } from 'react-router-dom';

function Tipo (t, s, markBolC, markBolN) {
    if (t === 'ci')
        return(
            <select onChange={ (event) => markBolC(s.alunoId, event)} id={ s.alunoId } >
                <option value="Atingida">Atingida</option>
                <option value="Atingida Parcialmete">Atingida Parcialmete</option>
                <option value="Não Atingida">Não Atingida</option>
            </select>)
    if (t === 'c')
    return(
        <select onChange={ (event) => markBolC(s.alunoId, event)} id={ s.alunoId } >
            <option value="Satisfatório">Satisfatório</option>
            <option value="Bom">Bom</option>
            <option value="Precisa Melhorar">Precisa Melhorar</option>
        </select>)
    if(t === 'n')
        return <input onChange={ (event) => markBolN(s.alunoId, event) }type="number" min="0" defaultValue="0" max="10.0" id={ s.alunoId } />
        
            
}

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
                            nota: "",
                            obs: "",
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
                        <td> {Tipo(disciplina.tipo, s, markBolN, markBolC)}
                           </td>

                    }
                </tr>}) }
            </tbody>
        </table>
        <button type="submit" onClick={ registrar }>Registrar!</button>
    </div>
    )
}

export default InserirFreq;
