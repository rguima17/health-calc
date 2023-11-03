const IMCCalculator = require('../imc/imc');

describe('IMCCalculator', () => {
    test('Calcula o IMC corretamente', () => {
        const weight = 68; 
        const height = 1.65; 
        const imc = IMCCalculator.calculate(weight, height);
        expect(imc).toBeCloseTo(24.98);
    });

    test('Classifica o IMC corretamente', () => {
        expect(IMCCalculator.classify(18)).toBe("Abaixo do peso");
        expect(IMCCalculator.classify(22)).toBe("Peso normal");
        expect(IMCCalculator.classify(27)).toBe("Sobrepeso");
        expect(IMCCalculator.classify(32)).toBe("Obesidade grau 1");
        expect(IMCCalculator.classify(37)).toBe("Obesidade grau 2");
        expect(IMCCalculator.classify(42)).toBe("Obesidade grau 3");
    });

    test('Exibe TypeError para inputs inválidos', () => {
        expect(() => {
            IMCCalculator.calculate('68', 1.65);
        }).toThrow(TypeError);

        expect(() => {
            IMCCalculator.calculate(68, '1.65');
        }).toThrow(TypeError);
    });

    test('Exibe RangeError para valores não positivos', () => {
        expect(() => {
            IMCCalculator.calculate(-68, 1.65);
        }).toThrow(RangeError);

        expect(() => {
            IMCCalculator.calculate(68, -1.65);
        }).toThrow(RangeError);
    });

    test('Exibe erro para peso igual a zero', () => {
        const weight = 0;
        const height = 1.65;
        expect(() => IMCCalculator.calculate(weight, height)).toThrow('Input Inválido: Peso e altura devem ser números positivos.');
    });

    test('Exibe erro para altura igual a zero', () => {
        const weight = 68;
        const height = 0;
        expect(() => IMCCalculator.calculate(weight, height)).toThrow('Input Inválido: Peso e altura devem ser números positivos.');
    });
})


