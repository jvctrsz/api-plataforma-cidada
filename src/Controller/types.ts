export interface UserType {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
  celular: string;
  telefone?: string | null;
  senha?: string | null;
  role?: string | null;
  google_id?: string | null;
  criado_em?: Date | null;
  redefinido_em?: Date | null;
}
