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

export interface SecretariatsType {
  id?: number;
  nome: string;
  ativo?: boolean;
}

export type StatusType = "criado" | "pendente" | "andamento" | "finalizado";
export interface RequestsTypes {
  id: number;
  codigo: string;
  endereco: string;
  numero: string;
  referencia: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  descricao: string;
  observacao: string;
  status: StatusType;
  secretaria_id: number;
  usuarios_id: number;
}
