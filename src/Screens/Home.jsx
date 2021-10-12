import React, {useEffect, useState} from 'react'
import api from '../Api/Axios';


function Home() {
    useEffect(()=>{
        api.get('/').then((response) => {
            // const { nome } = response.data;
        }).catch(({response}) => {
            const { data } = response;
            alert(data.message)
        })
    },[]);
    return (
        <div>
            
        </div>
    )
}

export default Home
