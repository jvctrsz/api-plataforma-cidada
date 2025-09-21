export interface UserType {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
  celular: string;
  telefone?: string;
  senha?: string;
  role?: string;
  google_id?: string;
  criado_em?: string;
  recoveryPassword?: string;
}
