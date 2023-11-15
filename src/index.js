const IMCCalculator = require('./imc/imc');
const MacroCalculator = require('./macronutrientes/macronutrientes')
const generos = require('./macronutrientes/variables/genero')
const atividade = require('./macronutrientes/variables/atividade')
const objetivo = require('./macronutrientes/variables/objetivo')

module.exports = {
    IMCCalculator, 
    MacroCalculator, 
    generos, 
    atividade, 
    objetivo
};