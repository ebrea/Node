// Inserção de Registros pela rota: /usuario

const moment = require('moment');
const conexao = require('./conexao');

class InsereDados {
    insere(usuario) {  // Formatação de datas usando a biblioteca MOMENT
        const dataCadastro = moment().format('YYYY-MM-DD HH:MM:SS')  
        const nascimento = moment(usuario.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const dataNovoUsuario = {...usuario, nascimento, dataCadastro}
        
        const sql = 'INSERT INTO Usuarios SET ?'
        conexao.query(sql, dataNovoUsuario, (erro, resultados) => {
            if (erro) console.log(erro)
            else console.log(resultados)
        }) 
    }
}
module.exports = new InsereDados
