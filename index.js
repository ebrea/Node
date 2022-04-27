// dividir depois as operações do index ...

const express = require('express')  // biblioteca para trabalhar com Servidor e Rotas
const app = express()
const res = require('express/lib/response')
const leitorDeDados = require('body-parser')  // para traduzir os dados em JSON


//=== chamando (importando internamente) a conexao com o DB e as Tabelas ====
const conexao = require('./db/conexao')
const CriaTabelas = require('./db/create')
const InsereDados = require('./db/insert')
const Consulta = require('./db/select')
const Alteracao = require('./db/update')
const Delecao = require('./db/delete')


//========== conectando ao Banco de Dados ===================
conexao.connect((erro) => {
    if(erro) console.log(erro);
    else {
        CriaTabelas.init(conexao)
        app.listen(3000, console.log('Servidor rodando na porta 3000'))  
    }
})

//===== Aviso de Teste de CRUD na tela =========
app.get('/', (req, res) => res.send('<br><br>Servidor rodando ...<br><h1 style="color: yellow; background-color: black; text-align:center"> Teste de CRUD (Create-Read-Update-Delete)</h1>'));

app.use(leitorDeDados.urlencoded({extended: true}))

//===== LISTA TODOS OS USUÁRIOS (GET) =====
app.get('/usuario', (req, res) => Consulta.lista(res));

//===== CONSULTA ESPECIFICA PELO id (GET) =====
app.get('/usuario/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Consulta.buscaRegistroPeloId(id, res);
})

//===== INSERÇÃO DE NOVO USUÁRIO (POST) =====
app.post('/usuario', (req, res) => {
    const usuario = req.body;
    InsereDados.insere(usuario);
    res.send(`${usuario.nome} foi cadastrado`);
})

//===== ALTERAÇÃO DE DADOS DE UM USUÁRIO (PATCH) =====
app.patch('/usuario/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body
    Alteracao.alteraRegistro(id, valores, res)
    res.send(`O registro ${id} foi alterado`);
})

//===== APAGANDO REGISTROS (DELETE) =====
app.delete('/usuario/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Delecao.apagaUmRegistro(id, res);
    res.send(`O registro ${id} foi apagado`);
})

//============= usando o FORMULÁRIO ===============

function tabela() {
    let operacao = document.querySelector('input[name="opcao"]:checked').value;
    console.log(operacao);
}

//===== Abrindo o Formulário no  HTML (GET) =======
app.get('/form', (req, res) => {
    const path = __dirname;
    console.log(path); 
    res.sendFile(path + "/index.html"); // vai para o Formulário
});

//========== CONSULTAS (POST) ==========
if (operacao = "consultar") {
    app.post('/form', (req, res) => {
        const id = parseInt(req.body.id);
        if(id!=0) Consulta.buscaRegistroPeloId(id, res); // Consulta 1 registro
        else Consulta.lista(res);           // Lista todos os registros
    })
}

//===== INSERÇÃO DE DADOS: cadastro de novo usuário (POST)
if (operacao = "inserir") {
    app.post('/form', (req, res) => {
        class Registro {
            nome;
            email;
            nascimento;
            mensagem;
        }
        const usuario = new Registro();
        usuario.nome = req.body.nome;
        usuario.email = req.body.email;
        usuario.nascimento = req.body.nascimento;
        usuario.mensagem = req.body.mensagem; 
        console.log(usuario);
        res.send(usuario);
        InsereDados.insere(usuario);
    })
}
