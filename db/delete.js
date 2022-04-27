// Apagamento de dados  (rota: /usuario)

const conexao = require('./conexao');

class Delecao {
    apagaUmRegistro(id, res) {
        const sql = 'DELETE FROM Usuarios WHERE id=?';
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) res.status(400).json(erro);
            else res.status(200).json(registroSolicitado);
        })  
    }
}
module.exports = new Delecao;