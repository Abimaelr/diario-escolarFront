// eslint-disable-next-line import/no-anonymous-default-export
export default function (t, s, markBolC, markBolN) {
    if (t === 'ci')
        return(
            <select name="nota" onChange={ (event) => markBolC(s.alunoId, event)} id={ s.alunoId } >
                <option value="Atingida">Atingida</option>
                <option value="Atingida Parcialmete">Atingida Parcialmete</option>
                <option value="Não Atingida">Não Atingida</option>
            </select>)
    if (t === 'c')
    return(
        <select  name="nota" onChange={ (event) => markBolC(s.alunoId, event)} id={ s.alunoId } >
            <option value="Satisfatório">Satisfatório</option>
            <option value="Bom">Bom</option>
            <option value="Precisa Melhorar">Precisa Melhorar</option>
        </select>)
    if(t === 'n')
        return <input onChange={ (event) => markBolN(s.alunoId, event) }type="number" min="0" defaultValue="0" max="10.0" id={ s.alunoId } />
}
