const MacroCalculator = require('../macronutrientes/macronutrientes');
const atividade = require('../macronutrientes/variables/atividade');
const objetivo = require('../macronutrientes/variables/objetivo');
const generos = require('../macronutrientes/variables/genero');
const macros  = require('../macronutrientes/variables/macros');

describe("MacroCalculator", () => {
  
  const peso = 70; 
  const altura = 1.75; 
  const idade = 25; 

  test('Calcula o TMB corretamente para o gênero masculino', () => {
    const tmb = MacroCalculator.calcularTBM(70, 1.75, 25, generos.MASCULINO);
    expect(tmb).toBeCloseTo(1673.75);
  });

  test('Calcula o TMB corretamente para o gênero feminino', () => {
    const tmb = MacroCalculator.calcularTBM(70, 1.75, 25, generos.FEMININO);
    expect(tmb).toBeCloseTo(1507.75);
  });

  test('Exibe erro para valores de peso não numéricos', () => {
    expect(() => {
      MacroCalculator.calcularTBM("70", 1.75, 25, generos.MASCULINO);
    }).toThrow("Peso, altura e idade devem ser números.");
  });

  test('Exibe erro para valores de altura não numéricos', () => {
    expect(() => {
      MacroCalculator.calcularTBM(70, "1.75", 25, generos.MASCULINO);
    }).toThrow("Peso, altura e idade devem ser números.");
  });

  test('Exibe erro para valores de idade não numéricos', () => {
    expect(() => {
      MacroCalculator.calcularTBM(70, 1.75, "25", generos.MASCULINO);
    }).toThrow("Peso, altura e idade devem ser números.");
  });

  test('Exibe erro para valor de peso igual a zero', () => {
    expect(() => {
      MacroCalculator.calcularTBM(0, 1.75, 25, generos.MASCULINO);
    }).toThrow("Peso, altura e idade devem ser números positivos.");
  });

  test('Exibe erro para valores de gênero não especificados', () => {
    expect(() => {
      MacroCalculator.calcularTBM(70, 1.75, 25, "OUTRO");
    }).toThrow("Gênero especificado inválido. Escolha entre 'MASCULINO' ou 'FEMININO'");
  });

  test('Calcula o TDEE corretamente para uma pessoa moderadamente ativa', () => {
    const tbm = 2000;
    const tdee = MacroCalculator.calcularTDEE(tbm, atividade.MODERADAMENTE_ATIVO);
    expect(tdee).toBe(3100);
  });

  test('Calcula o TDEE corretamente para uma pessoa sedentaria', () => {
    const tbm = 2000;
    const tdee = MacroCalculator.calcularTDEE(tbm, atividade.SEDENTARIO);
    expect(tdee).toBe(2400);
  });

  test('Calcula o TDEE corretamente para uma pessoa muito ativa', () => {
    const tbm = 2000;
    const tdee = MacroCalculator.calcularTDEE(tbm, atividade.MUITO_ATIVO);
    expect(tdee).toBe(3450);
  });

  test('Exibe erro para valores de atividade não especificados', () => {
    const tbm = 2000;
    expect(() => {
      MacroCalculator.calcularTDEE(tbm, "EXTREMAMENTE_ATIVO");
    }).toThrow("Nível de atividade inválido. Escolha entre 'SEDENTARIO', 'POUCO ATIVO', 'MODERADAMENTE ATIVO', ou 'MUITO ATIVO'");
  });

  test('Calcula corretamente os macros para o bulking', () => {
    const macro = MacroCalculator.calcularMacros(peso, altura, idade, generos.MASCULINO, atividade.MODERADAMENTE_ATIVO, objetivo.BULKING);
    const expectedCalories = MacroCalculator.calcularTDEE(MacroCalculator.calcularTBM(peso, altura, idade, generos.MASCULINO), atividade.MODERADAMENTE_ATIVO) + 250;
    expect(macro.Proteinas).toBe(Math.round((expectedCalories * macros.PROTEINA) / 4));
    expect(macro.Carboidratos).toBe(Math.round((expectedCalories * macros.CARBOIDRATO) / 4));
    expect(macro.Gorduras).toBe(Math.round((expectedCalories * macros.GORDURA) / 9));
  });

  test('Calcula corretamente os macros para o cutting', () => {
    const macro = MacroCalculator.calcularMacros(peso, altura, idade, generos.FEMININO, atividade.POUCO_ATIVO, objetivo.CUTTING);
    const expectedCalories = MacroCalculator.calcularTDEE(MacroCalculator.calcularTBM(peso, altura, idade, generos.FEMININO), atividade.POUCO_ATIVO) -500;
    expect(macro.Proteinas).toBe(Math.round((expectedCalories * macros.PROTEINA) / 4));
    expect(macro.Carboidratos).toBe(Math.round((expectedCalories * macros.CARBOIDRATO) / 4));
    expect(macro.Gorduras).toBe(Math.round((expectedCalories * macros.GORDURA) / 9));
  });

  test('Calcula corretamente os macros para manter o peso', () => {
    const macro = MacroCalculator.calcularMacros(peso, altura, idade, generos.FEMININO, atividade.POUCO_ATIVO, objetivo.MANTER);
    const expectedCalories = MacroCalculator.calcularTDEE(MacroCalculator.calcularTBM(peso, altura, idade, generos.FEMININO), atividade.POUCO_ATIVO);
    expect(macro.Proteinas).toBe(Math.round((expectedCalories * macros.PROTEINA) / 4));
    expect(macro.Carboidratos).toBe(Math.round((expectedCalories * macros.CARBOIDRATO) / 4));
    expect(macro.Gorduras).toBe(Math.round((expectedCalories * macros.GORDURA) / 9));
  });

  test('Exibe um erro para um objetivo não especificado', () => {
    expect(() => {
      MacroCalculator.calcularMacros(peso, altura, idade, generos.MASCULINO, atividade.SEDENTARIO, "GAINING");
    }).toThrow("Nível de objetivo inválido. Escolha entre 'CUTTING', 'BULKING' ou 'MANTER'");
  });
});

