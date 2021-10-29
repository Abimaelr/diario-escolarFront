import React, { useEffect, useState } from 'react'
import api from '../Api/Axios';

import { useParams } from 'react-router-dom';

function Student() {
    const [student, setStudent] = useState();
    const { alunoId } = useParams();
    useEffect(() => {
        api.get(`/student/${alunoId}`).then(({ data: { student } }) => console.log(student[0]))
    }, []);

    return (
        <div>
            <h2>asd</h2>
        </div>
    )
}

export default Student
