const IMCCalculator = require('../imc/imc');

describe("IMCCalculator", () => {
    test("Calcula o IMC corretamente", () => {
        const weight = 68;
        const height = 1.65;
        const imc = IMCCalculator.calcular(weight, height);
        expect(imc).toBeCloseTo(24.98);
    });

    test("Classifica o IMC corretamente", () => {
        expect(IMCCalculator.classificar(18)).toBe("Abaixo do peso");
        expect(IMCCalculator.classificar(22)).toBe("Peso normal");
        expect(IMCCalculator.classificar(27)).toBe("Sobrepeso");
        expect(IMCCalculator.classificar(32)).toBe("Obesidade grau 1");
        expect(IMCCalculator.classificar(37)).toBe("Obesidade grau 2");
        expect(IMCCalculator.classificar(42)).toBe("Obesidade grau 3");
    });

    test("Exibe TypeError para inputs inválidos", () => {
        expect(() => {
            IMCCalculator.calcular("68", 1.65);
        }).toThrow(TypeError);

        expect(() => {
            IMCCalculator.calcular(68, "1.65");
        }).toThrow(TypeError);
    });

    test("Exibe RangeError para valores não positivos", () => {
        expect(() => {
            IMCCalculator.calcular(-68, 1.65);
        }).toThrow(RangeError);

        expect(() => {
            IMCCalculator.calcular(68, -1.65);
        }).toThrow(RangeError);
    });

    test("Exibe o erro indicado para peso igual a zero", () => {
        const weight = 0;
        const height = 1.65;
        expect(() => IMCCalculator.calcular(weight, height)).toThrow("Input Inválido: Peso e altura devem ser números positivos.");
    });

    test("Exibe o erro indicado para altura igual a zero", () => {
        const weight = 68;
        const height = 0;
        expect(() => IMCCalculator.calcular(weight, height)).toThrow("Input Inválido: Peso e altura devem ser números positivos.");
    });

    test("Exibe o erro indicado quando o método calcular não receber exatos dois argumentos", () => {
        expect(() => IMCCalculator.calcular(80)).toThrow("Método 'calcular' espera exatos dois argumentos.");
        expect(() => IMCCalculator.calcular(80, 1.8, 123)).toThrow("Método 'calcular' espera exatos dois argumentos.");
    });

    test("Exibe o erro indicado quando o método classificar não receber apenas um argumento", () => {
        expect(() => IMCCalculator.classificar()).toThrow("Método 'classificar' espera apenas um argumento.");
        expect(() => IMCCalculator.classificar(25, 30)).toThrow("Método 'classificar' espera apenas um argumento.");
    });
})
