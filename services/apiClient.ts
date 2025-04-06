import axios from "axios"

// Function to check if we're in the browser
const isBrowser = () => typeof window !== "undefined"

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    if (isBrowser()) {
      const token = sessionStorage.getItem("auth_token")

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear auth data and redirect to login if in browser
      if (isBrowser()) {
        sessionStorage.removeItem("auth_token")
        sessionStorage.removeItem("user")
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  },
)

export default apiClient

