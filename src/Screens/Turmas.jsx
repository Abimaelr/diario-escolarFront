import React from 'react';
import { useState, useEffect } from 'react';
import api from '../Api/Axios';
import { Link } from 'react-router-dom';
import './css/Turmas.css'
import { Container, Placeholder } from 'react-bootstrap';
import TurmaCard from '../Components/TurmaCard';
import jwt from 'jsonwebtoken';


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
                alert(data.message)
            }
            )
    }, []);

    if(!turmas) return ''
    else
    return (
        <Container>
            <h1>Suas Turmas</h1>
            <div className="">
                <div className="cardContainer">
                    {turmas.map(arr => <Link to={ {pathname: `turmas/${arr.codTurma}`, state:{name: arr.nomeTurma}} } className="link"><TurmaCard key={arr._id} data={arr} /></Link>)}
                </div>
            </div>
        </Container>


    )
}

export default Turmas
