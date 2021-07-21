const Sequelize = require('sequelize')
const db = require('../db')

const Funcionario = db.define('funcionarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    sobrenome: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    telefone: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    endereco: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    sexo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    cidade: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    estado: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    pais: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    senha: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}) 

module.exports = Funcionario