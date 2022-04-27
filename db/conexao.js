// conexão com o Banco de Dados

const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,  // porta acessar o Banco de Dados
    user: 'root',
    passord: null,
    database: 'bdados'
})
module.exports = conexao;
