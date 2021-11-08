import React, { useEffect, useState } from 'react'
import api from '../Api/Axios';

import './css/Turma.css'

import { useParams, Link, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function Turma() {
    const [students, setStudents] = useState();
    // const [disciplina, setDisciplina] = useState({});
    // const [disciplinas, setDisciplinas] = useState([]);

    const { id } = useParams();
    const location = useLocation().pathname;

    useEffect(() => {
        api.get(`/classes/${id}`)
            .then(({ data }) => setStudents(data.students))
            .catch(() => alert('Erro'))
        // api.get('/disciplinas').then(({ data }) => setDisciplinas(data.disciplinas)).catch(({ response }) => alert(response))
    }, [id])

    // if(students.length === 0) return (
    //     <div className="loading">
    //         <p>Carregando...</p>
    //     </div>
    // )
    if (!students) return <h1>Carregando...</h1>
    else
        return (
            <Container>
                <div className="studentsContainer">
                    {students.length === 0? <h2>Sem alunos</h2>: <h2>Alunos</h2> }
                    <br />
                    {students.map((e) => <Link className="link" to={`${location}/${e.alunoId}`}> <div className="studentItem"><h6>{e.nomeCompleto}</h6></div> </Link>)}
                </div>
            </Container>
        )
}

export default Turma
