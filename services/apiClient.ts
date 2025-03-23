import axios from "axios";

// Obter a URL base da variável de ambiente
const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Criar uma instância do axios com a URL base
const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  // Aumentar o timeout para dar mais tempo para o servidor responder
  timeout: 10000,
});

// Adicionar logs para debug
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Enviando requisição para: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error("Erro na configuração da requisição:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`Resposta de ${response.config.url}: Status ${response.status}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Erro na resposta:", {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
    } else if (error.request) {
      console.error("Sem resposta do servidor:", {
        url: error.config?.url,
        method: error.config?.method,
      });
    } else {
      console.error("Erro ao configurar requisição:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;