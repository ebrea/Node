
class CriaTabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criaTabelaUsuarios()  // só vamos criar essa Tabela no banco "bdados"
    }
    criaTabelaUsuarios(){
        const sql = 'CREATE TABLE IF NOT EXISTS Usuarios (id int NOT NULL AUTO_INCREMENT, nome varchar(30) NOT NULL, email varchar(20), nascimento date, mensagem text, dataCadastro datetime NOT NULL, PRIMARY KEY(id))'
        this.conexao.query(sql, (erro) => {
            if (erro) console.log(erro)
            // else console.log('Tabela Usuarios criada com sucesso')
        })
    }
}
module.exports = new CriaTabelas;