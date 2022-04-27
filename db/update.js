// Consulta de dados  (rota: /usuario)

const conexao = require('./conexao');
const moment = require('moment');

class Alteracao {
    alteraRegistro(id, valores, res) {
        if(valores.nascimento) {
            valores.nascimento =  moment(valores.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }
        const sql = 'UPDATE Usuarios SET ? WHERE id=?';
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) res.status(400).json(erro);
            else res.status(200).json(resultados);
        })  
    }

}

module.exports = new Alteracao;