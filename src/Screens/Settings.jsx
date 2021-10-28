import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import api from '../Api/Axios';

import './css/Settings.css'

function Settings() {
    const [grade, setGrade] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [disciplinasProf, setDisc] = useState('')

    useEffect(() => {
        api.get('disciplinas/grade').then(({ data }) => {
            setDisciplinas(data)
            setGrade(Object.keys(data))
            api.get('disciplinas/').then(({ data }) => {
                setDisc(data.disciplinas)
            })
        })
    }, []);

    const bufferDisciplinas = ({ checked }, disc) => {
        let buffer = disciplinasProf;
        if (checked && !buffer.includes(disc))
            buffer.push(disc)
        if (!checked)
            buffer = buffer.filter(e => `${e.componente} ${e.nome}` !== `${disc.componente} ${disc.nome}`)
        setDisc(buffer);
    }

    const salvarAlt = () => {
        const { userId } = jwt.decode(localStorage.getItem('token'));
        api.put('/disciplinas', {
            userId,
            disciplinas: disciplinasProf
        }).then(data => alert('Alterações Salvas!')).catch(e => alert('Erro ao salvar Alterações'))
    }

    return (
        <div>
            <div class="buttonContainer">
                <button class="button salvar" onClick={salvarAlt}>Salvar alterações!</button>
            </div>
            <div className="gradeGroup">
                {disciplinasProf !== '' ? grade.map((g, i) =>
                    <>
                        <div className="grade">
                            <h4 key={i}>{g}</h4>
                            {
                                disciplinas[g].map((d, k) => {
                                    const state = disciplinasProf.map(e => `${e.componente} ${e.nome}`).includes(`${d.componente} ${d.nome}`);
                                    return (<>
                                        <label key={d + 'l'} htmlFor={`${g} ${k}`}>
                                            <input defaultChecked={state} key={d} type="checkbox" name="" id={`${g} ${k}`} onChange={({ target }) => bufferDisciplinas(target, d)} />
                                            {d.nome}
                                        </label>
                                        <br key={d + 'la'} />
                                    </>)
                                }
                                )
                            }
                        </div>
                    </>
                ) : ''}
            </div>
        </div>
    )
}

export default Settings
