/**
 * Vantagens dos getters e setters:
 * - Encapsulamento: controlam o acesso aos dados internos da classe.
 * - Validação: permitem validar/normalizar valores antes de atribuí-los.
 * - API estável: a implementação interna pode mudar sem afetar quem usa a classe.
 * - Propriedades computadas: expõem informações derivadas dos campos internos.
 * - Efeitos controlados: possibilitam logging, cache ou outras ações ao ler/escrever.
 */

/**
 * Exemplo em TypeScript de classe orientada a objetos usando getters e setters.
 * Mostra validação, normalização e uma propriedade computada.
 */
class Pessoa {
    private _nome: string;
    private _idade!: number;

    constructor(nome: string, idade: number) {
        this._nome = nome.trim();
        this.idade = idade; // usa o setter para validação
    }

    // Getter/Setter para nome (normaliza espaços)
    get nome(): string {
        return this._nome;
    }
    set nome(valor: string) {
        this._nome = valor.trim();
    }

    // Getter/Setter para idade (validação: inteiro >= 0)
    get idade(): number {
        return this._idade;
    }
    set idade(valor: number) {
        if (!Number.isInteger(valor) || valor < 0) {
            throw new Error('Idade inválida: deve ser inteiro não negativo.');
        }
        this._idade = valor;
    }

    // Propriedade computada (apenas leitura)
    get ehAdulto(): boolean {
        return this._idade >= 18;
    }

    // Informação formatada, expõe dados derivados
    get info(): string {
        return `${this._nome} — ${this._idade} anos${this.ehAdulto ? ' (adulto)' : ''}`;
    }
}

/* Exemplo de uso */
const p = new Pessoa('  Renan  ', 30);
console.log(p.nome);        // "Renan"
console.log(p.info);        // "Renan — 30 anos (adulto)"
p.idade = 31;               // usa setter
console.log(p.idade);       // 31

try {
    p.idade = -5;             // lança erro por validação
} catch (err) {
    console.error((err as Error).message);
}