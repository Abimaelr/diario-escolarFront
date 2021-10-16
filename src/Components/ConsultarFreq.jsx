import React, { useState } from 'react'
import api from '../Api/Axios';
import InfoCard from './InfoCard';

function ConsultarFreq(props) {

    const [freqs, setFreq] = useState([]);

    const { turma, disciplina } = props.dados;

    const consultar = () => {
        if( turma === '' || disciplina === '') return alert('Escolha a turma e disciplina!');
        console.log(turma)
        api.get(`disciplinas/diarios?codTurma=${turma}&disciplina=${disciplina}`
        ).then( result => {
            const { data } = result;

            const obj = data.result.reduce((acc, current) => {
                const key = current.data;
                if(!acc[key]) acc[key] = [];
                acc[key].push(current);
                return acc;
            }, {})
            const keys = Object.keys(obj).map(date => obj[date]).
            map(obj => { return {data: obj[0].data, obj}})
            
            setFreq(keys);
        })
    }

    return (
        <div>
            <button onClick={ consultar }>Consultar!</button>
            {
                freqs.map(({ data, obj }) =>  <InfoCard title={ data } freq={ obj } disciplina={  disciplina }/>)
            }
           
            
        </div>
    )
}

export default ConsultarFreq;
