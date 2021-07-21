const Sequelize = require('sequelize')
const db = require('../db')

const Aluno = db.define('alunos', {
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
    universidade: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    curso: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    estudo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    ano: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    periodo: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    total: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    aprovados: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    matriculados: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    pendentes: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    senha: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    nomepdf: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    pdf: {
        type: Sequelize.STRING,
        allowNull: true
    }
}) 

module.exports = Aluno