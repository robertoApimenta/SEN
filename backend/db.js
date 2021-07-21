const Sequelize = require('sequelize')

const sequelize = new Sequelize('sen', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log("Conectado ao DB com sucesso")
}).catch((error) => {
    console.log("Erro durante conexão com DB: " + error)
})

module.exports = sequelize