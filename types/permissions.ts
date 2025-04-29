// Definição de todas as permissões possíveis no sistema
export enum Permission {
    // Permissões de Estoque
    VIEW_INVENTORY = "view_inventory",
    ADD_INVENTORY = "add_inventory",
    EDIT_INVENTORY = "edit_inventory",
    DELETE_INVENTORY = "delete_inventory",
  
    // Permissões de Vendas
    VIEW_SALES = "view_sales",
    CREATE_SALE = "create_sale",
    CANCEL_SALE = "cancel_sale",
  
    // Permissões de Fila
    VIEW_QUEUE = "view_queue",
    MANAGE_QUEUE = "manage_queue",
  
    // Permissões de Relatórios
    VIEW_REPORTS = "view_reports",
    EXPORT_REPORTS = "export_reports",
  
    // Permissões de Usuários
    VIEW_USERS = "view_users",
    CREATE_USER = "create_user",
    EDIT_USER = "edit_user",
    DELETE_USER = "delete_user",
    MANAGE_PERMISSIONS = "manage_permissions",
  
    // Permissões de Configurações
    VIEW_SETTINGS = "view_settings",
    EDIT_SETTINGS = "edit_settings",
  }
  
  // Agrupamento de permissões por módulo para facilitar a UI
  export const PermissionGroups = {
    INVENTORY: [
      Permission.VIEW_INVENTORY,
      Permission.ADD_INVENTORY,
      Permission.EDIT_INVENTORY,
      Permission.DELETE_INVENTORY,
    ],
    SALES: [Permission.VIEW_SALES, Permission.CREATE_SALE, Permission.CANCEL_SALE],
    QUEUE: [Permission.VIEW_QUEUE, Permission.MANAGE_QUEUE],
    REPORTS: [Permission.VIEW_REPORTS, Permission.EXPORT_REPORTS],
    USERS: [
      Permission.VIEW_USERS,
      Permission.CREATE_USER,
      Permission.EDIT_USER,
      Permission.DELETE_USER,
      Permission.MANAGE_PERMISSIONS,
    ],
    SETTINGS: [Permission.VIEW_SETTINGS, Permission.EDIT_SETTINGS],
  }
  
  // Permissões padrão para cada papel
  export const DefaultRolePermissions = {
    ADMIN: Object.values(Permission), // Admin tem todas as permissões
    OPERATOR: [
      Permission.VIEW_INVENTORY,
      Permission.VIEW_SALES,
      Permission.CREATE_SALE,
      Permission.VIEW_QUEUE,
      Permission.MANAGE_QUEUE,
      Permission.VIEW_REPORTS,
    ],
  }
  
  // Interface para o usuário com permissões
  export interface UserWithPermissions {
    id: number
    username: string
    nome: string
    perfil: string
    permissions: Permission[]
  }
  