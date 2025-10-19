const soap = require('soap');

const url = 'http://localhost:8000/arithmetic?wsdl';

soap.createClient(url, function(err, client) {
  if (err) {
    console.error('Erro ao criar cliente:', err);
    return;
  }

  // Para depuração: Veja a estrutura do serviço
  //console.log(client.describe());

  // Teste de adição
  const addArgs = { a: 5, b: 3 };
  client.add(addArgs, function(err, result) {
    if (err) console.error('Erro em add:', err.message);
    else console.log(`Adição: ${addArgs.a} + ${addArgs.b} =`, result.result);
  });

  // Teste de subtração
  const subtractArgs = { a: 10, b: 4 };
  client.subtract(subtractArgs, function(err, result) {
    if (err) console.error('Erro em subtract:', err.message);
    else console.log(`Subtração: ${subtractArgs.a} - ${subtractArgs.b} =`, result.result);
  });

  // Teste de multiplicação
  const multiplyArgs = { a: 7, b: 2 };
  client.multiply(multiplyArgs, function(err, result) {
    if (err) console.error('Erro em multiply:', err.message);
    else console.log(`Multiplicação: ${multiplyArgs.a} * ${multiplyArgs.b} =`, result.result);
  });

  // Teste de divisão
  const divideArgs = { a: 20, b: 5 };
  client.divide(divideArgs, function(err, result) {
    if (err) console.error('Erro em divide:', err.message);
    else console.log(`Divisão: ${divideArgs.a} / ${divideArgs.b} =`, result.result);
  });

  // Teste de divisão por zero
  const divideByZeroArgs = { a: 10, b: 0 };
  client.divide(divideByZeroArgs, function(err, result) {
    if (err) console.error(`Erro em divide (esperado para ${divideByZeroArgs.a} / ${divideByZeroArgs.b}):`, err.message);
    else console.log(`Divisão: ${divideByZeroArgs.a} / ${divideByZeroArgs.b} =`, result.result);
  });

  // Teste com entrada inválida
  const invalidArgs = { a: 'abc', b: 3 };
  client.add(invalidArgs, function(err, result) {
    if (err) console.error(`Erro em add (esperado para ${invalidArgs.a} + ${invalidArgs.b}):`, err.message);
    else console.log(`Adição inválida: ${invalidArgs.a} + ${invalidArgs.b} =`, result.result);
  });
});