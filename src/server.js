const soap = require('soap');
const http = require('http');
const fs = require('fs');

// Função de validação com parsing
function validateInputs(a, b) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  if (isNaN(numA) || isNaN(numB)) {
    throw new Error('Parâmetros devem ser números válidos.');
  }
  return { numA, numB }; // Retorna os números parseados
}

// Serviço com operações
const arithmeticService = {
  ArithmeticService: {
    ArithmeticPort: {
      add: function(args) {
        const { numA, numB } = validateInputs(args.a, args.b);
        return { result: numA + numB };
      },
      subtract: function(args) {
        const { numA, numB } = validateInputs(args.a, args.b);
        return { result: numA - numB };
      },
      multiply: function(args) {
        const { numA, numB } = validateInputs(args.a, args.b);
        return { result: numA * numB };
      },
      divide: function(args) {
        const { numA, numB } = validateInputs(args.a, args.b);
        if (numB === 0) {
          throw new Error('Divisão por zero não permitida.');
        }
        return { result: numA / numB };
      }
    }
  }
};

// Carregar WSDL
const xml = fs.readFileSync('src/arithmeticService.wsdl', 'utf8');

// Criar servidor HTTP e SOAP
const server = http.createServer(function(request, response) {
  response.end('404: Not Found: ' + request.url);
});

server.listen(8000);
soap.listen(server, '/arithmetic', arithmeticService, xml, function() {
  console.log('Servidor SOAP rodando em http://localhost:8000/arithmetic?wsdl');
});

// Tratamento de erros globais
process.on('uncaughtException', (err) => {
  console.error('Erro não tratado:', err.message);
});