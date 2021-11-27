import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt from 'jsonwebtoken';
import api from '../Api/Axios';
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';


import './css/Settings.css'
import { Link, Redirect } from 'react-router-dom';
import Loading from '../Components/Loading';

function Settings() {
    const [grade, setGrade] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [disciplinasProf, setDisc] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        api.get('disciplinas/grade').then(({ data }) => {
            setDisciplinas(data)
            setGrade(Object.keys(data))
            api.get('disciplinas/').then(({ data }) => {
                if (data.disciplinas.length > 0)
                    setDisc(data.disciplinas)
                else
                    setDisc([]);
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
        }).then(data => {
            toast.success('Alterações Salvas!');
            setRedirect(true)
        }).catch(e => {
            toast.error('Erro ao salvar Alterações')
        })
    }
    if (disciplinasProf === '') return <Loading />;
    else if (redirect) return <Redirect to='/' />
    else
        return (
            <div className="config">
                <h3>Meus componentes curriculares</h3>
                <div className="bread">
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <Link to="/">Início</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Meus componentes curriculares
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <br />
                {/* <div className="buttonContainer">
                    <button className="button salvar" onClick={salvarAlt}>Salvar alterações!</button>
                </div> */}
                <div className="gradeGroup">
                    {disciplinasProf !== '' ? grade.map((g, i) =>
                        <>
                            <div className="grade">
                                <h4 key={i}>{g}</h4>
                                {
                                    disciplinas[g].map((d, k) => {
                                        let state = disciplinasProf.map(e => `${e.componente} ${e.nome}`).includes(`${d.componente} ${d.nome}`);
                                        return (<>
                                            <label key={d + 'l'} htmlFor={`${g} ${k}`}>
                                                <input defaultChecked={state} key={d} type="checkbox" id={`${g} ${k}`} onChange={({ target }) => bufferDisciplinas(target, d)} />
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
                <div className="buttonContainer">
                    <button className="button salvar" onClick={salvarAlt}>Salvar alterações!</button>
                </div>
            </div>
        )
}

export default Settings
