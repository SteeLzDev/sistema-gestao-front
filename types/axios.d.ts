import "axios"

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    silent?: boolean
  }
}
