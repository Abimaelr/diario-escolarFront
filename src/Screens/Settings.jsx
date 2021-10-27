import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import api from '../Api/Axios';

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
    },[]);

    const bufferDisciplinas = ({checked}, disc) => {
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
        })
    }

    return (
        <div>
            <div>
                <br />
                <button onClick={ salvarAlt }>Salvar alterações!</button>
            </div>
            { disciplinasProf !== '' ? grade.map((g,i) =>
                <>
                    <h4 key={ i }>{ g }</h4>
                    {
                        disciplinas[g].map((d,k) =>{
                        const state = disciplinasProf.map(e => `${e.componente} ${e.nome}`).includes(`${d.componente} ${d.nome}`);
                        return (<>
                            <input defaultChecked={ state } key={ d } type="checkbox" name="" id={`${g} ${k}`} onChange={({ target }) => bufferDisciplinas(target, d)}  />
                            <label key={ d + 'l'} htmlFor={`${g} ${k}`}> { d.nome }</label>
                            <br key={ d + 'la'}  />
                        </>)
                        }
                        )
                    }
                </>
            ): ''}
        </div>
    )
}

export default Settings
