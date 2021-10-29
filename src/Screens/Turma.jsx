import React, { useEffect, useState } from 'react'
import api from '../Api/Axios';

import { useParams, Link, useLocation } from 'react-router-dom';

function Turma() {
    const [students, setStudents] = useState([]);
    const [disciplina, setDisciplina] = useState({});
    const [disciplinas, setDisciplinas] = useState([]);

    const { id } = useParams();
    const location = useLocation().pathname;

    useEffect(() => {
        api.get(`/classes/${id}`)
            .then(({ data }) => setStudents(data.students))
            .catch(() => alert('Erro'))
        api.get('/disciplinas').then(({ data }) => setDisciplinas(data.disciplinas)).catch(({ response }) => alert(response))
    }, [])

    return (
        <div>
            <header>
                <div class="control">
                    <div class="select">
                        <select required name="disciplina" id="disciplina" onChange={({ target }) => { setDisciplina(JSON.parse(target.value)) }}>
                            <option value="">Escolha uma disciplina</option>
                            {disciplinas.map((e, i) => <option key={i} value={JSON.stringify(e)}>{`${e.componente} - ${e.nome}`}</option>)}
                        </select>
                    </div>
                    <div>

                    </div>
                </div>

            </header>
            <div className="studentsContainer">
                {students.map((e) => <Link className="link" to={`${location}/${e.alunoId}`}> <div><h6>{e.nomeCompleto}</h6></div> </Link>)}
            </div>
        </div>
    )
}

export default Turma
