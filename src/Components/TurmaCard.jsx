import React from 'react';
import './css/TurmaCard.css';

function TurmaCard({ data: { nomeTurma, turno, codTurma}}) {
    console.log(nomeTurma)
    return (
        <div className="turmaCard">
            <h4>{ nomeTurma }</h4>
            <h5>{ turno }</h5>
            <p>{ codTurma }</p>
        </div>
    )
}

export default TurmaCard
