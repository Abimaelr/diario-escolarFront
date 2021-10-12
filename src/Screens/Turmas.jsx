import React from 'react';
import { useState, useEffect } from 'react';
import api from '../Api/Axios';

import { Container } from 'react-bootstrap';
import TurmaCard from '../Components/TurmaCard';

function Turmas() {
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        api.get('classes/p', {})
        .then ( ({data}) => {
            setTurmas(data.classes)
            console.log(data.classes)
        })
        .catch( ({response }) => { 
            const { data } = response;
            alert(data.message )}
            )
    }, []);

    return (
        <Container>
            <h1>Suas Turmas</h1>

            <div className="cards">
                { turmas.map(arr => <TurmaCard key={arr._id} data={ arr }/>)}
            </div>
        </Container>

            
    )
}

export default Turmas
