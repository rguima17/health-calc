# health-calc

Calculadora de IMC e Macronutrientes

## Instalação

```
npm i health-calculator-js
```

## Uso

**`IMC`**

```javascript
const  { IMCCalculator }  = require('health-calculator-js');

let imc = IMCCalculator.calcular(peso, altura)
let classificacao = IMCCalculator.classificar(imc)
```

**`Macronutrientes`**

```javascript
const  { MacroCalculator, genero, atividade, objetivo}  = require('health-calculator-js');

let tmb = MacroCalculator.calcularTBM(peso, altura, idade, genero)
let macronutrientes = MacroCalculator.calcularMacros(80, 1.80, 35, genero.MASCULINO, atividade.SEDENTARIO, objetivo.BULKING)
```
