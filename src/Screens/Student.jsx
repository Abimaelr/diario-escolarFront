import React, { useEffect, useState } from 'react'
import api from '../Api/Axios';
import { Breadcrumb } from 'antd';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './css/Student.css';
import { toast } from 'react-toastify';

function Student() {
    const [student, setStudent] = useState();
    const [turma, setTurma] = useState('');
    const [boletim, setBol] = useState();
    const [freq, setFreq] = useState();
    const { alunoId, id } = useParams();
    useEffect(() => {
        api.get(`/student/${alunoId}`).then(({ data: { student } }) => setStudent(student[0]))
            .then(() => {
                api.get(`/disciplinas/diario/q/?alunoId=${alunoId}`).then((r) => setFreq(r.data));
                api.get(`/disciplinas/boletim/q/?alunoId=${alunoId}`).then((r) => setBol(r.data));
            }).catch(() => toast.warning("Erro no servidor!"))

        api.get(`/classes/c?classCode=${id}`)
            .then(({ data }) => setTurma(data))
            .catch(() => toast.warning('Erro'))
    }, [alunoId]);


    if (boletim && freq)
        return (
            <Container>
                <div className="freq">
                    <h4>{student.nomeCompleto}</h4>
                    <div className="bread">
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <Link to="/">Início</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <Link to="/turmas">Minhas Turmas</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={`/turmas/${turma.codTurma}`}>{turma.nomeTurma}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {student.nomeCompleto}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="freqContainer">
                        {
                            Object.keys(freq).map((key) => {
                                const { assiduidade, total } = freq[key];
                                return (<div className="freqBox">
                                    <h6>{key}</h6>
                                    <p>Presença: {Math.floor((assiduidade / total) * 100)}%</p>
                                    <p><strong>Total: {total}</strong></p>
                                </div>)
                            })}
                    </div>
                    <div className="bolContainer">
                        <table className="table">
                            <thead>
                                <th>Disciplina</th>
                                <th>1° Bimestre</th>
                                <th>2° Bimestre</th>
                                <th>3° Bimestre</th>
                                <th>4° Bimestre</th>
                                <th>Final</th>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(boletim).map((key) => {
                                        const { nota } = boletim[key];
                                        return (<tr>
                                            <td>{key}</td>
                                            <td>{boletim[key][0] !== undefined ? boletim[key][0].nota : ''}</td>
                                            <td>{boletim[key][1] !== undefined ? boletim[key][1].nota : ''}</td>
                                            <td>{boletim[key][2] !== undefined ? boletim[key][2].nota : ''}</td>
                                            <td>{boletim[key][3] !== undefined ? boletim[key][3].nota : ''}</td>
                                            <td>{boletim[key][4] !== undefined ? boletim[key][4].nota : ''}</td>
                                        </tr>)
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        )
    else return ''
}

export default Student
