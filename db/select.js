// Consulta de dados  (rota: /usuario)

const conexao = require('./conexao');

class Consulta {
    lista(res) {              
        const sql = 'SELECT * FROM Usuarios';
        conexao.query(sql, (erro, resultados) => {
            if (erro) res.status(400).json(erro);
            else res.status(200).json(resultados);

            console.log(resultados);     // Consultando no Terminal
        }) 
    }
    buscaRegistroPeloId(id, res) {
        const sql = `SELECT * FROM Usuarios WHERE id=${id}`;
        conexao.query(sql, (erro, resultados) => {
            const registroSolicitado = resultados[0]
            if (erro) res.status(400).json(erro);
            else res.status(200).json(registroSolicitado);

            console.log(registroSolicitado);    // Consultando no Terminal
           
        })  
    }
}
module.exports = new Consulta;
