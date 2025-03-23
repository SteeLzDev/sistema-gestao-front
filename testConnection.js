// testConnection.js
const axios = require('axios');

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/sistema-gestao/api';

async function testConnection() {
  try {
    console.log(`Testando conexão com: ${API_URL}`);
    
    // Teste OPTIONS para verificar CORS
    console.log('Enviando requisição OPTIONS...');
    await axios({
      method: 'OPTIONS',
      url: `${API_URL}/fila/clientes`,
      headers: {
        'Origin': 'http://localhost:3000'
      }
    });
    console.log('Requisição OPTIONS bem-sucedida!');
    
    // Teste GET
    console.log('Enviando requisição GET...');
    const response = await axios.get(`${API_URL}/fila/clientes`);
    console.log('Requisição GET bem-sucedida!');
    console.log('Resposta:', response.data);
    
    console.log('Todos os testes passaram! A conexão está funcionando corretamente.');
  } catch (error) {
    console.error('Erro ao testar conexão:');
    if (error.response) {
      console.error('Resposta do servidor:', {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data
      });
    } else if (error.request) {
      console.error('Sem resposta do servidor. Verifique se o servidor está rodando.');
    } else {
      console.error('Erro:', error.message);
    }
  }
}

testConnection();