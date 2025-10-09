const soap = require('soap');
const http = require('http');
const fs = require('fs');

// Função de validação
function validateInputs(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
    throw new Error('Parâmetros devem ser números válidos.');
  }
}

// Serviço com operações
const arithmeticService = {
  ArithmeticService: {  // Nome do service do WSDL
    ArithmeticPort: {  // Nome do port do WSDL
      add: function(args) {
        validateInputs(args.a, args.b);
        return { result: args.a + args.b };
      },
      subtract: function(args) {
        validateInputs(args.a, args.b);
        return { result: args.a - args.b };
      },
      multiply: function(args) {
        validateInputs(args.a, args.b);
        return { result: args.a * args.b };
      },
      divide: function(args) {
        validateInputs(args.a, args.b);
        if (args.b === 0) {
          throw new Error('Divisão por zero não permitida.');
        }
        return { result: args.a / args.b };
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