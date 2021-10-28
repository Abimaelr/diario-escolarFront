// eslint-disable-next-line import/no-anonymous-default-export
export default function (t, s, markBolC, markBolN, action, index, edit) {
    const id = action === 'c' ? index : s.alunoId;

    if (t === 'ci')
        return (
            <select name="nota" defaultValue={edit ? s.nota : "Atingida"} onChange={(event) => markBolC(s.alunoId, event)} id={id} >
                <option value="Atingida">Atingida</option>
                <option value="Atingida Parcialmete">Atingida Parcialmete</option>
                <option value="Não Atingida">Não Atingida</option>
            </select>)
    if (t === 'c')
        return (
            <select name="nota" defaultValue={edit ? s.nota : "Satisfatório"} onChange={(event) => markBolC(s.alunoId, event)} id={id} >
                <option value="Satisfatório">Satisfatório</option>
                <option value="Bom">Bom</option>
                <option value="Precisa Melhorar">Precisa Melhorar</option>
            </select>)
    if (t === 'n')
        return <input defaultValue={edit ? s.nota : 0.00} onChange={(event) => markBolN(s.alunoId, event)} type="number" min="0" defaultValue="0" max="10.0" id={id} />
}
