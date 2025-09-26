export type UserRole = "usuario" | "funcionario" | "admin";
export interface UserType {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
  celular: string;
  telefone?: string | null;
  senha?: string | null;
  role?: UserRole | null;
  google_id?: string | null;
  criado_em?: Date | null;
  redefinido_em?: Date | null;
}

export interface SecretariatsType {
  id?: number;
  nome: string;
  ativo?: boolean;
  celular?: string;
  telefone?: string;
  email?: string;
  logradouro?: string;
  numero?: string;
  cep?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  descricao?: string;
  criado_em?: string;
  atualizado_em?: string;
  whatsapp?: string;
  secretario_nome?: string;
  secretario_id?: string;
}

export type StatusType = "criado" | "pendente" | "andamento" | "finalizado";

export interface RequestFields {
  endereco: string;
  numero: string;
  referencia?: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  descricao: string;
  observacao?: string;
  secretaria_id: string;
}

export interface RequestsTypes extends RequestFields {
  id: number;
  status: StatusType;
  criado_em: string;
  atualizado_em: string;
  usuarios_id: number;
}
