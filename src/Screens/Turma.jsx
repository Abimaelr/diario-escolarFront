import React, { useEffect, useState } from 'react'
import api from '../Api/Axios';

import './css/Turma.css'
import { Breadcrumb } from 'antd';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function Turma(props) {
    const [students, setStudents] = useState();
    const [turma, setTurma] = useState('');
    // const [disciplina, setDisciplina] = useState({});
    // const [disciplinas, setDisciplinas] = useState([]);

    const { id } = useParams();
    const location = useLocation().pathname;

    useEffect(() => {

        api.get(`/classes/${id}`)
            .then(({ data }) => setStudents(data.students))
            .catch(() => alert('Erro'))
        api.get(`/classes/c?classCode=${id}`)
            .then(({ data }) => setTurma(data))
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

                <h3>{turma.nomeTurma}</h3>
                <div className="bread">
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <Link to="/">Início</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <Link to="/turmas">Minhas Turmas</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {turma.nomeTurma}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <br />
                    <h4>Alunos</h4>
                </div>
                <div className="studentsContainer">
                    {/* {students.length === 0? <h2>Sem alunos</h2>: <h2>Alunos</h2> } */}
                    <br />
                    {students.map((e) => <Link className="link" to={`${location}/${e.alunoId}`}> <div className="studentItem"><h6>{e.nomeCompleto}</h6></div> </Link>)}
                </div>
            </Container>
        )
}

export default Turma
