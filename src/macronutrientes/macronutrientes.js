const atividade = require('./variables/atividade');
const objetivo = require('./variables/objetivo');
const generos = require('./variables/genero')
const macros = require( './variables/macros')

const atividadeFator = {
    [atividade.SEDENTARIO]: 1.2,
    [atividade.POUCO_ATIVO]: 1.375,
    [atividade.MODERADAMENTE_ATIVO]: 1.55,
    [atividade.MUITO_ATIVO]: 1.725
};

const objetivoFator = {
    [objetivo.BULKING]: 250,
    [objetivo.CUTTING]: -500,
    [objetivo.MANTER]: 0
};

class MacroCalculator {
    /**
     * @param {number} peso - kg
     * @param {number} altura - metros
     * @param {number} idade - anos
     * @param {string} genero - MASCULINO, FEMININO,
     * @param {string} atividade - SEDENTARIO, POUCO ATIVO, MODERADAMENTE ATIVO, MUITO ATIVO
     * @param {string} objetivo - BULKING, CUTTING, MANTER
     */

    static calcularTMB(peso, altura, idade, genero) {
        if (peso <= 0 || altura <= 0 || idade <= 0) {
            throw new Error("Peso, altura e idade devem ser números positivos.");
        }
        if (typeof peso !== "number" || typeof altura !== "number" || typeof idade !== "number") {
            throw new Error("Peso, altura e idade devem ser números.");
        }
        if (genero !== generos.MASCULINO && genero !== generos.FEMININO) {
            throw new Error("Gênero especificado inválido. Escolha entre 'MASCULINO' ou 'FEMININO' ");
        }
        // Calculo da Taxa Metabólica Basal (TMB) - Formula de Mifflin-St.Jeor 
        let tmb;
        if (genero === generos.MASCULINO) {
            tmb = (10 * peso) + (6.25 * altura * 100) - (5 * idade) + 5;
        } else {
            tmb = (10 * peso) + (6.25 * altura * 100) - (5 * idade) - 161;
        }
        return parseFloat(tmb.toFixed(2));
    }

    // Calculo do TDEE “Total Daily Energy Expenditure” (“Gasto Energético Total Diário")
    static calcularTDEE(tmb, atividade) {
        const fator = atividadeFator[atividade];
        if (!fator) {
            throw new Error("Nível de atividade inválido. Escolha entre 'SEDENTARIO', 'POUCO ATIVO', 'MODERADAMENTE ATIVO', ou 'MUITO ATIVO'");
        }
        return parseFloat((tmb * fator).toFixed(2));
    }

    // Calculo da quantidade de proteinas, carboidratos e gordura em gramas.
    static calcularMacros(peso, altura, idade, genero, atividade, objetivo) {
        const tmb = this.calcularTMB(peso, altura, idade, genero);
        const tdee = this.calcularTDEE(tmb, atividade);
        const ajusteCalorias = objetivoFator[objetivo];
        
        if (!ajusteCalorias && ajusteCalorias !== 0) {
            throw new Error("Nível de objetivo inválido. Escolha entre 'CUTTING', 'BULKING' ou 'MANTER'");
        }

        const completeTDEE = tdee + ajusteCalorias
        const proteinas = Math.round((completeTDEE * macros.PROTEINA) / 4)
        const carboidratos = Math.round((completeTDEE * macros.CARBOIDRATO) / 4)
        const gorduras = Math.round((completeTDEE * macros.GORDURA) / 9)

        return {
            Proteinas: proteinas,
            Carboidratos: carboidratos,
            Gorduras: gorduras
        };
    }
}

module.exports = MacroCalculator;

