import React from 'react';
import { useState, useEffect } from 'react';
import api from '../Api/Axios';
import { Link } from 'react-router-dom';
import { Container, Placeholder } from 'react-bootstrap';
import TurmaCard from '../Components/TurmaCard';

import './css/Turmas.css'

function Turmas() {
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        api.get('classes/p', {})
            .then(({ data }) => {
                setTurmas(data.classes)
            })
            .catch(({ response }) => {
                const { data } = response;
                alert(data.message)
            }
            )
    }, []);
    if (turmas === []) return <Container>
        <div className="conteudo">
            <Placeholder animation="wave">

                <Placeholder xs={6} />
                <br /><br />
                <Placeholder xs={6} />
                <br />
                <Placeholder xs={7} />
                <br />
                <Placeholder xs={9} />
                <br />
                <Placeholder xs={7} />
                <br />
                <br />
                <Placeholder xs={8} />
                <br />
                <Placeholder xs={7} />
                <br />
                <Placeholder xs={5} />
                <br />
                <Placeholder xs={8} />
                <Placeholder xs={9} >{' '}</Placeholder>
                <Placeholder xs={6} />
            </Placeholder>
        </div>
    </Container>
    return (
        <Container>
            <h1>Suas Turmas</h1>
            <div className="cardContainer">
                <div className="cards">
                    {turmas.map(arr => <Link to={ `turmas/${arr.codTurma}` } className="link"><TurmaCard key={arr._id} data={arr} /></Link>)}
                </div>
            </div>
        </Container>


    )
}

export default Turmas
