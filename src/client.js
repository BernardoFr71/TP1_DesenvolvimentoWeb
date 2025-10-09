const soap = require('soap');

const url = 'http://localhost:8000/arithmetic?wsdl';

soap.createClient(url, function(err, client) {
  if (err) {
    console.error('Erro ao criar cliente:', err);
    return;
  }

  // Teste de adição
  client.add({ a: 5, b: 3 }, function(err, result) {
    if (err) console.error('Erro em add:', err.message);
    else console.log('Adição: 5 + 3 =', result.result);
  });

  // Teste de subtração
  client.subtract({ a: 10, b: 4 }, function(err, result) {
    if (err) console.error('Erro em subtract:', err.message);
    else console.log('Subtração: 10 - 4 =', result.result);
  });

  // Teste de multiplicação
  client.multiply({ a: 7, b: 2 }, function(err, result) {
    if (err) console.error('Erro em multiply:', err.message);
    else console.log('Multiplicação: 7 * 2 =', result.result);
  });

  // Teste de divisão
  client.divide({ a: 20, b: 5 }, function(err, result) {
    if (err) console.error('Erro em divide:', err.message);
    else console.log('Divisão: 20 / 5 =', result.result);
  });

  // Teste de divisão por zero
  client.divide({ a: 10, b: 0 }, function(err, result) {
    if (err) console.error('Erro em divide (esperado):', err.message);
    else console.log('Divisão: 10 / 0 =', result.result);
  });

  // Teste com entrada inválida
  client.add({ a: 'abc', b: 3 }, function(err, result) {
    if (err) console.error('Erro em add (esperado):', err.message);
    else console.log('Adição inválida:', result.result);
  });
});