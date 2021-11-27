const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static('build'))
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/build/index.html');
})

const port = process.env.PORT || 3000;

app.listen(port , ()=>{
    console.log('Ativo')
})