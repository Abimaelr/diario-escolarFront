import React from 'react';
import { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import api from '../Api/Axios';
import { Link } from 'react-router-dom';
import './css/Turmas.css'
import { Container } from 'react-bootstrap';
import TurmaCard from '../Components/TurmaCard';
import jwt from 'jsonwebtoken';
import './css/Settings.css'
import { toast } from 'react-toastify';
import Loading from '../Components/Loading';

function Turmas() {
    const [turmas, setTurmas] = useState(undefined);

    useEffect(() => {
        const { permissions } = jwt.decode(localStorage.getItem('token'));
        api.get(`classes/${permissions === 'd' ? '' : 'p'}`)
            .then(({ data }) => {
                setTurmas(data.classes)
            })
            .catch(({ response }) => {
                const { data } = response;
                toast.warning(data.message)
            }
            )
    }, []);

    if (!turmas) return <Loading />
    else
        return (
            <Container>
                <h3>Minhas Turmas</h3>
                <div className="bread">
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <Link to="/">Início</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Minhas Turmas
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <br />
                <div className="">
                    <div className="cardContainer">
                        {turmas.map(arr => <Link to={{ pathname: `turmas/${arr.codTurma}`, state: { name: arr.nomeTurma } }} className="link"><TurmaCard key={arr._id} data={arr} /></Link>)}
                    </div>
                </div>
            </Container>


        )
}

export default Turmas
