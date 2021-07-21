const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const upload = require('./middlewares/upload')
const fs = require('fs')
const path = require('path')

const Funcionario = require('./models/Funcionario')
const Aluno = require('./models/Aluno')
const Pdf = require('./models/Pdf')
// const Os = require('./models/OS')

app.use(express.json())
app.use(cors())
app.use('/files', 
        express.static(path.resolve(__dirname, "public", "uploads"))
    )

app.get('/', async (req, res) => {
    await res.send("Rota raiz do backend")
})


// ################# INÍCIO FUNCIONÁRIO #################

// Cadastrar
app.post('/cad_funcionario', async (req, res) => {
    const resultado = await Funcionario.create(
        req.body
    ).then(() => {
        return res.json({
            erro: false,
            mensagem: "Funcionario cadastrado com sucesso"
        })
    }).catch((erro) => {
        return res.json({
            erro: true,
            mensagem: "Erro durante o cadastro do funcionario: " + erro
        })
    })
})

// Listar pelo ID
app.get('/listar_funcionario/:id', async (req, res) => {
    //res.send("ID" + req.params.id)
    await Funcionario.findByPk(req.params.id)
    .then((funcionario) => {
        return res.json({
            erro: false,
            funcionario
        })
    }).catch((erro) => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro ao buscar funcionario: " + erro
        })
    })
})

// Editar
app.put('/edit_funcionario', async (req, res) => {
    await Funcionario.update(req.body, {
        where: { id: req.body.id }
    }).then(() => {
        return res.json({
            erro: false,
            mensagem: "Funcionario editado com sucesso!"
        })
    }).catch((erro) => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro ao editar funcionario: " + erro
        })
    })
})

// LOGIN
app.post('/login_funcionario', async (req, res) => {
     //console.log(req.body)  
     const email = req.body.email
     const senha = req.body.senha
     const user = await Funcionario.findOne({where: {email, senha}})
         if(user === null){
             return res.json({
                 erro: true,
                 mensagem: "Email ou senha incorretos"
             })
         }
         else{
             return res.json({
                 erro: false,
                 user
             })
         } 
})

// ################# FINAL FUNCIONÁRIO #################





// ################# INÍCIO ALUNO #################

// Cadastrar
app.post('/cad_aluno', async (req, res) => {
    const resultado = await Aluno.create(
        req.body
    ).then(() => {
        return res.json({
            erro: false,
            mensagem: "Aluno cadastrado com sucesso"
        })
    }).catch((erro) => {
        return res.json({
            erro: true,
            mensagem: "Erro durante o cadastro do aluno: " + erro
        })
    })
})

// Listar
app.get('/listar_alunos', async (req, res) => {
    await Aluno.findAll({order: [['id', 'DESC']]})
    .then((alunos) => {
        res.json({alunos})
    }).catch((erro) => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro ao listar alunos: " + erro
        })
    })
})

// Listar pelo ID
app.get('/listar_aluno/:id', async (req, res) => {
    //res.send("ID" + req.params.id)
    await Aluno.findByPk(req.params.id)
    .then((aluno) => {
        if(aluno.pdf){
            var endPDF = "http://localhost:5000/files/pdf/" + aluno.pdf
        }
        return res.json({
            erro: false,
            aluno,
            endPDF
        })
    }).catch((erro) => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro ao buscar aluno: " + erro
        })
    })
})

// Deletar
app.delete('/deletar_aluno/:id', async (req, res) => {
    await Aluno.destroy({
        where: {id: req.params.id}
    }).then(() => {
        return res.json({
            erro: false,
            mensagem: "Aluno deletado com sucesso!"
        })
    }).catch((erro) => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro ao deletar aluno: " + erro
        })
    })
})


// Editar
app.put('/edit_aluno', async (req, res) => {
    await Aluno.update(req.body, {
        where: { id: req.body.id }
    }).then(() => {
        return res.json({
            erro: false,
            mensagem: "Aluno editado com sucesso!"
        })
    }).catch((erro) => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro ao editar aluno: " + erro
        })
    })
})

// LOGIN
app.post('/login_aluno', async (req, res) => {
    //console.log(req.body)  
    const email = req.body.email
    const senha = req.body.senha
    const user = await Aluno.findOne({where: {email, senha}})
        if(user === null){
            return res.json({
                erro: true,
                mensagem: "Email ou senha incorretos"
            })
        }
        else{
            return res.json({
                erro: false,
                user
            })
        } 
})

// ################# FINAL FUNCIONÁRIO #################


// upload dos pdfs

app.post('/upload3/:id', upload.single('pdf'), async (req, res) => {
    if(req.file){
        parametros = req.params.id.split(".")
        id_aluno = parametros[0]
        nome = parametros[1]
        pdf = req.file.filename
        await Pdf.create({
            id_aluno,
            nome,
            pdf
        })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Pdf enviado"
            })
        }).catch((erro) => {
            //return res.status(400).json({
            //    erro: true,
            //    mensagem: "Pdf não enviado" + erro
            //})
            console.log(erro)
        })
    }else{
        return res.status(400).json({
            erro: true,
            mensagem: "Pdf não enviado"
        })
    }
})

// Listar PDF pelo id_aluno
app.get('/listar_pdf/:id', async (req, res) => {
    //res.send("ID" + req.params.id)
    await Pdf.findAll({where: {id_aluno: req.params.id}})
    .then((pdf)=> {
        return res.json({
            erro: false,
            pdf
        })
    }).catch((erro) => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro ao buscar notas: " + erro
        })
    })
})


app.listen(5000, () => {
    console.log("Servidor backend rodando na porta 5000.")
})