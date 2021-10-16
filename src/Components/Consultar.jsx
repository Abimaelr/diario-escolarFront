import React, { useState } from 'react'
import api from '../Api/Axios';
import InfoCard from './InfoCard';

import { useLocation } from 'react-router-dom';

function ConsultarFreq(props) {
    const location = useLocation().pathname;

    const [itens, setItens] = useState([]);
    const { turma, disciplina } = props.dados;

    const consultar = () => {
        if( turma === '' || disciplina === '') return alert('Escolha a turma e disciplina!');

        if ( location === '/diario') {
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
                
                setItens(keys);
            })
        } else {
            api.get(`disciplinas/boletins?codTurma=${turma}&disciplina=${disciplina}`
            ).then( result => {
                const { data } = result;
                const obj = data.result.reduce((acc, current) => {
                    const key = current.data;
                    if(!acc[key]) acc[key] = [];
                    acc[key].push(current);
                    return acc;
                }, {})
                const keys = Object.keys(obj).map(date => obj[date])
                .map(obj => { return {data: obj[0].data, obj}})
                
                setItens(keys);
            })
        }
    }

    return (
        <div>
            <button onClick={ consultar }>Consultar!</button>
            {
                location === '/diario' ? 
                itens.map(({ data, obj }) =>  <InfoCard title={ data } freq={ obj } disciplina={  disciplina }/>):
                itens.map(({ data, obj }) =>  <InfoCard title={ data } nota={ obj } disciplina={  disciplina }/>)
            }
           
            
        </div>
    )
}

export default ConsultarFreq;
