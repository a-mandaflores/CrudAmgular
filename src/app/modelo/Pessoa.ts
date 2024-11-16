export type Pessoa = {
    id: number;
    nome: string;
    idade: number;
    cidade: string;
}

export type CadastrarPessoa = Omit<Pessoa, 'id'>