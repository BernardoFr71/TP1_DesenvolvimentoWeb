# Serviço SOAP de Operações Aritméticas em Node.js

## Descrição
Este projeto implementa um serviço web SOAP em Node.js para realizar as operações aritméticas básicas: adição, subtração, multiplicação e divisão. O serviço inclui validação de entradas para garantir que os parâmetros sejam números válidos e tratamento de erros, como a divisão por zero. O objetivo é demonstrar a criação de um serviço SOAP simples, expondo um WSDL e permitindo consumo via cliente SOAP.

O projeto segue as especificações do 1º Trabalho Prático de Desenvolvimento de Aplicações Web 2025/26, utilizando a biblioteca `soap` do npm.

## Requisitos
- Node.js (versão 14 ou superior recomendada).
- npm (incluído com o Node.js).

## Instalação
1. Clone o repositório do GitHub:
   ```
   git clone https://github.com/utilizador/soap-arithmetic-service.git
   cd soap-arithmetic-service
   ```
   (Substitua `utilizador` pelo nome de utilizador apropriado no GitHub.)

2. Instale as dependências necessárias:
   ```
   npm install
   ```
   Isso instalará a biblioteca `soap`, essencial para o funcionamento do serviço.

## Execução
1. Inicie o servidor SOAP:
   ```
   node src/server.js
   ```
   - O serviço ficará disponível em `http://localhost:8000/arithmetic`.
   - Para visualizar o WSDL, aceda a `http://localhost:8000/arithmetic?wsdl` no navegador.

2. Execute o cliente de teste:
   ```
   node src/client.js
   ```
   - Os resultados das operações e eventuais erros serão exibidos no terminal, demonstrando o funcionamento das quatro operações, incluindo casos de erro (como divisão por zero e entradas inválidas).

Nota: Certifique-se de que o servidor está em execução antes de rodar o cliente.

## WSDL
O arquivo WSDL (`src/arithmeticService.wsdl`) descreve as operações disponíveis, os tipos de dados e as mensagens de entrada/saída. Ele é carregado automaticamente pelo servidor e pode ser acedido via URL após a inicialização do serviço.

Exemplo de estrutura do WSDL:
- Define operações: `add`, `subtract`, `multiply` e `divide`.
- Inclui tipos para requisições, respostas e falhas.
- Utiliza namespace `http://example.com/arithmetic` (pode ser ajustado conforme necessário).

## Exemplos de Requisição e Resposta
As requisições e respostas são trocadas em formato XML via protocolo SOAP. Abaixo, exemplos para a operação de adição e um caso de erro.

### Requisição SOAP (Exemplo para Adição)
Utilize ferramentas como Postman ou SoapUI para enviar (método POST para `http://localhost:8000/arithmetic`, com header `Content-Type: text/xml`):
```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <add xmlns="http://example.com/arithmetic">
      <a>5</a>
      <b>3</b>
    </add>
  </soap:Body>
</soap:Envelope>
```

### Resposta SOAP (Exemplo para Adição)
```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <addResponse xmlns="http://example.com/arithmetic">
      <result>8</result>
    </addResponse>
  </soap:Body>
</soap:Envelope>
```

### Requisição SOAP (Exemplo para Divisão por Zero)
```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <divide xmlns="http://example.com/arithmetic">
      <a>10</a>
      <b>0</b>
    </divide>
  </soap:Body>
</soap:Envelope>
```

### Resposta SOAP (Exemplo de Erro)
```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <soap:Fault>
      <faultcode>soap:Server</faultcode>
      <faultstring>Divisão por zero não permitida.</faultstring>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>
```

## Testes
O cliente de teste (`src/client.js`) invoca todas as operações com exemplos válidos e inválidos:
- Adição: 5 + 3.
- Subtração: 10 - 4.
- Multiplicação: 7 * 2.
- Divisão: 20 / 5.
- Divisão por zero: 10 / 0 (espera erro).
- Entrada inválida: 'abc' + 3 (espera erro).

Execute o cliente e verifique os logs no terminal para confirmar o funcionamento correto.

## Boas Práticas Implementadas
- **Organização do Código:** Separado em módulos (servidor, cliente e WSDL) para melhor manutenção.
- **Validação de Entradas:** Verificação se os parâmetros são números válidos, lançando erros apropriados.
- **Tratamento de Erros:** Exceções geridas de forma robusta, incluindo mensagens claras em falhas.
- **Nomenclatura:** Nomes de variáveis e funções significativos e consistentes.
- **Comentários:** Embora mínimos, o código é autoexplicativo; adicione mais se necessário.
- **Modularidade:** Lógica de negócio isolada das configurações do servidor.

## Contribuições e Contacto
Para sugestões ou correções, abra uma issue no repositório GitHub. Este projeto foi desenvolvido para fins académicos.

Bernardo Freitas

Data de Entrega: 26 de outubro de 2025.
