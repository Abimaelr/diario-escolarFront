import React, { useState, useEffect } from 'react';
import api from '../Api/Axios';
import { useLocation } from 'react-router-dom';
import Tipo from '../Helpers/Tipo'

function Nota(d, campos, direitos, eixos) {
    if (d.tipo === 'ci') return {
        nota: "Atingida",
    }
    if (d.tipo === 'c') return {
        nota: "Satisfatório",
    }
    if (d.tipo === 'n') return {
        nota: "0.0",
    }
}

function Inserir(props) {
    let { students, setStudents, turma, disciplina, data, horaAula, anotacoes, bimestre, campos, direitos, eixos } = props.dados;
    const date = new Date();
    const location = useLocation().pathname;
    const [student, setStudent] = useState({});
    useEffect(() => {
        setStudents([])
        api.get(`/classes/students/${turma}`)
            .then(({ data }) => {
                if (location === '/diario') {
                    console.log(data.students)
                    setStudents(data.students);
                    const buffer = {};
                    data.students.forEach(({ alunoId, codTurma, nomeCompleto }) => {
                        buffer[`${alunoId}`] = {
                            alunoId,
                            nomeCompleto,
                            codTurma,
                            presenca: true,
                            obs: "",
                            ultimaMdificacao: date.toISOString()
                        }
                        setStudent(buffer);
                    })
                } else {
                    setStudents(data.students);
                    const buffer = {};
                    data.students.forEach(({ alunoId, codTurma, nomeCompleto }) => {
                        buffer[`${alunoId}`] = {
                            alunoId,
                            nomeCompleto,
                            codTurma,
                            ...Nota(disciplina),

                            ultimaMdificacao: date.toISOString()
                        }
                        setStudent(buffer);
                    })
                }
            }
            )
            .catch(() => setStudents([]))
        // eslint-disable-next-line
    }, [turma, disciplina])

    const markFreq = (id, { target }) => {
        const buffer = student;
        buffer[`${id}`] = {
            ...buffer[`${id}`],
            presenca: target.checked,
        }
        setStudent(buffer);
    }
    const markBolN = (id, { target }) => {
        if (target.value > 10 || target.value < 0) {
            target.value = 0;
            return alert('A nota deve estar entre 0 e 10')
        }
        const buffer = student;
        buffer[`${id}`] = {
            ...buffer[`${id}`],

            nota: target.value,
        }
        setStudent(buffer);
    }

    const markBolC = (id, { target }) => {
        const buffer = student;
        buffer[`${id}`] = {
            ...buffer[`${id}`],
            nota: target.value,
        }
        setStudent(buffer);
    }

    const registrar = (e) => {
        e.preventDefault();
        if (data === '' || turma === '' || disciplina === '' || !(horaAula === '' || bimestre === '') || anotacoes === '') {
            return alert("Preencha todos os campos!");

        }
        const arr = [];

        if (location === '/diario') {
            Object.keys(student).forEach(s => {
                arr.push({
                    ...student[s],
                    obs: anotacoes,
                    data,
                    disciplina: disciplina.nome,
                    disciplinaMeta: disciplina,
                })
            })
            const out = { pack: arr };
            for (let i = 0; i < horaAula; i++)
                api.post('/disciplinas/diarios/', out).then((result) => alert('Frequencia registrada com sucesso!')).catch(({ response }) => alert(response.data.message))
        }
        else if (location === '/boletim') {
            Object.keys(student).forEach(s => {
                arr.push({
                    ...student[s],
                    obs: anotacoes,
                    data,
                    campos, direitos, eixos,
                    disciplina: disciplina.nome,
                    disciplinaMeta: disciplina,
                    bimestre
                })
            })

            const out = { pack: arr };

            api.post('/disciplinas/boletins/', out).then((result) => alert('Boletim registrado com sucesso!')).catch(({ response }) => alert(response.data.message))
        }
    }

    if (students.length > 0) return (
        <div>
            <div className="submit">

                <button class="button" type="submit" onClick={registrar}>Registrar!</button>
            </div>
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
                    {students.map((s, i) => {
                        return <tr key={i}>
                            <td>{s.nomeCompleto}</td>
                            <td>{s.alunoId}</td>
                            {
                                location === '/diario' ? <td><input onChange={(event) => markFreq(s.alunoId, event)} type="checkbox" id={s.alunoId} defaultChecked /></td> :
                                    <td> {Tipo(disciplina.tipo, s, markBolC, markBolN)}
                                    </td>

                            }
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
    else return ''
}

export default Inserir;
