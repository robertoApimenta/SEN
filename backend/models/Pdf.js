const Sequelize = require('sequelize')
const db = require('../db')

const Pdf = db.define('pdfs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_aluno: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    nome: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    pdf: {
        type: Sequelize.TEXT,
        allowNull: true
    },
}) 

module.exports = Pdf