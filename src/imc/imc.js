class IMCCalculator {
   
    static get IMC_THRESHOLDS() {
        return {
            ABAIXO_DO_PESO: 18.5,
            NORMAL: 24.9,
            SOBREPESO: 29.9,
            OBESIDADE_GRAU_I: 34.9,
            OBESIDADE_GRAU_II: 39.9
        };
    }
    /**
     * @param {number} weight 
     * @param {number} height 
     * @return {number} 
     */
    static calculate(weight, height) {
        if (arguments.length !== 2) {
            throw new Error("Método calculate espera exatos dois argumentos.");
        }
        if (typeof weight !== 'number' || typeof height !== 'number') {
            throw new TypeError("Input Inválido: Peso e altura devem ser números.");
        }
        if (weight <= 0 || height <= 0) {
            throw new RangeError("Input Inválido: Peso e altura devem ser números positivos.");
        }
        return Number((weight / (height * height)).toFixed(2));
    }

    /**
     * @param {number} imc 
     * @return {string}
     */
    static classify(imc) {
        if (arguments.length !== 1) {
            throw new Error("Método classify espera apenas um argumento.");
        }

        if (imc < IMCCalculator.IMC_THRESHOLDS.ABAIXO_DO_PESO) {
            return "Abaixo do peso";
        } else if (imc <= IMCCalculator.IMC_THRESHOLDS.NORMAL) {
            return "Peso normal";
        } else if (imc <= IMCCalculator.IMC_THRESHOLDS.SOBREPESO) {
            return "Sobrepeso";
        } else if (imc <= IMCCalculator.IMC_THRESHOLDS.OBESIDADE_GRAU_I) {
            return "Obesidade grau 1";
        } else if (imc <= IMCCalculator.IMC_THRESHOLDS.OBESIDADE_GRAU_II) {
            return "Obesidade grau 2";
        } else {
            return "Obesidade grau 3";
        }
    }
}

module.exports = IMCCalculator;
