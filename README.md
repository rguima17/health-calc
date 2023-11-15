# health-calculator-js

Uma calculadora de saúde abrangente para calcular e classificar o Índice de Massa Corporal (IMC), Taxa Metabólica Basal (TMB), Gasto Energético Total Diário (TDEE) e necessidades de macronutrientes.


## Exemplo de Uso

Para ver um exemplo de uso desta biblioteca, confira repositório [health-calc-console](https://github.com/rguima17/health-calc-console).
## Instalação

Instale o pacote usando npm:
```
npm i health-calculator-js
```
## Uso
### Calculando o IMC (Índice de Massa Corporal)

```javascript
IMCCalculator.calcular(peso, altura)
```

```javascript
IMCCalculator.classificar(imc)
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `peso` | `number` | **Obrigatório**. Peso em quilogramas (kg)|
| `altura` | `number` | **Obrigatório**. Altura em metros (m)|
| `imc` | `number` | **Obrigatório**. O valor do imc calculado|

#### Exemplo:
```javascript
const { IMCCalculator } = require('health-calculator-js');

const imc = IMCCalculator.calcular(70, 1.75);
const classificacao = IMCCalculator.classificar(imc);

console.log(`IMC: ${imc}, Classificação: ${classificacao}`);
```

### Calculando Macronutrientes, TMB e TDEE

```javascript
MacroCalculator.calcularTMB(peso, altura, idade, genero)
```

```javascript
MacroCalculator.calcularTDEE(tmb, atividade)
```

```javascript
MacroCalculator.calcularMacros(peso, altura, idade, genero, atividade, objetivo)
```
| Parâmetro   | Tipo       | Descrição                           | Opções |
| :---------- | :--------- | :---------------------------------- |  :-----|
| `peso` | `number` | **Obrigatório**. Peso em quilogramas (kg)| | 
| `altura` | `number` | **Obrigatório**. Altura em metros (m)| | 
| `idade` | `number` | **Obrigatório**. Idade em anos| |
| `genero` | `string` | **Obrigatório**. Gênero| 'MASCULINO',  'FEMININO'|
| `tmb` | `number` | **Obrigatório**. Taxa Metabólica Basal| |
| `atividade` | `string` | **Obrigatório**. Nível de atividade física| SEDENTARIO',  'POUCO ATIVO',  'MODERADAMENTE ATIVO',  'MUITO ATIVO'|
| `objetivo` | `string` | **Obrigatório**. Objetivo de fitness| 'BULKING',  'CUTTING',  'MANTER'|


#### Exemplo:
```javascript
const { MacroCalculator, genero, atividade, objetivo } = require('health-calculator-js');

const tmb = MacroCalculator.calcularTMB(70, 1.75, 30, generos.MASCULINO);
const tdee = MacroCalculator.calcularTDEE(tmb, atividade.MODERADAMENTE_ATIVO);
const macronutrientes = MacroCalculator.calcularMacros(70, 1.75, 30, generos.MASCULINO,
atividade.MODERADAMENTE_ATIVO, objetivo.MANTER);

console.log(`TMB: ${tmb}, TDEE: ${tdee}, Macronutrientes:`, macronutrientes);
```

## Considerações

### Sobre a Distribuição da Dieta
Para o cálculo dos macronutrientes, esta biblioteca adota uma distribuição padrão de dieta composta por 30% de proteínas, 30% de gorduras e 40% de carboidratos, que é uma abordagem comum para uma dieta equilibrada, visando a manutenção da saúde e o suporte a diferentes objetivos físicos, como manutenção, perda ou ganho de peso.

### Sobre o Cálculo da TMB
Para o cálculo da Taxa Metabólica Basal (TMB), esta biblioteca utiliza a Fórmula de Mifflin-St.Jeor, que é amplamente reconhecida e utilizada por profissionais de saúde por sua precisão e confiabilidade. 


## Autores
- [Raul Guimaraes](https://github.com/rguima17)


## Etiquetas

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
