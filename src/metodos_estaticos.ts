/**
 * MÉTODOS E ATRIBUTOS ESTÁTICOS
 * 
 * Características:
 * - Pertencem à classe, não às instâncias
 * - Acessados através do nome da classe (Classe.metodo())
 * - Compartilhados entre todas as instâncias
 * - Inicializados quando a classe é carregada
 * 
 * VANTAGENS (PRÓS):
 * ✅ Economia de memória: uma única cópia para toda a aplicação
 * ✅ Utilitários: perfeito para funções auxiliares/helpers
 * ✅ Contadores globais: controlar instâncias criadas
 * ✅ Factory methods: criar instâncias de forma controlada
 * ✅ Constantes: valores compartilhados imutáveis
 * ✅ Performance: não precisa criar instância para usar
 * 
 * DESVANTAGENS (CONTRAS):
 * ❌ Estado global: pode criar dependências ocultas
 * ❌ Dificulta testes: estado compartilhado entre testes
 * ❌ Não polimórfico: não pode ser sobrescrito facilmente
 * ❌ Acoplamento: pode aumentar dependência entre classes
 * ❌ Thread safety: problemas em aplicações concorrentes
 * ❌ Dificuldade de mock: complicado para testes unitários
 */

class ContadorUsuarios {
    // Atributo estático - compartilhado entre todas as instâncias
    private static totalUsuarios: number = 0;
    private static proximoId: number = 1;
    
    // Constante estática - valor imutável
    public static readonly IDADE_MINIMA: number = 18;
    public static readonly IDADE_MAXIMA: number = 120;

    // Atributos de instância
    private id: number;
    private nome: string;
    private idade: number;

    constructor(nome: string, idade: number) {
        // Valida usando método estático
        if (!ContadorUsuarios.validarIdade(idade)) {
            throw new Error(`Idade deve estar entre ${ContadorUsuarios.IDADE_MINIMA} e ${ContadorUsuarios.IDADE_MAXIMA} anos`);
        }

        this.id = ContadorUsuarios.proximoId++;
        this.nome = nome;
        this.idade = idade;
        
        // Incrementa contador estático
        ContadorUsuarios.totalUsuarios++;
    }

    // Método estático - pertence à classe
    public static getTotalUsuarios(): number {
        return ContadorUsuarios.totalUsuarios;
    }

    // Método estático utilitário
    public static validarIdade(idade: number): boolean {
        return idade >= ContadorUsuarios.IDADE_MINIMA && 
               idade <= ContadorUsuarios.IDADE_MAXIMA;
    }

    // Factory method estático
    public static criarUsuarioAdulto(nome: string): ContadorUsuarios {
        return new ContadorUsuarios(nome, ContadorUsuarios.IDADE_MINIMA);
    }

    // Método estático para resetar contador (útil para testes)
    public static resetarContador(): void {
        ContadorUsuarios.totalUsuarios = 0;
        ContadorUsuarios.proximoId = 1;
    }

    // Método estático de comparação
    public static compararIdade(usuario1: ContadorUsuarios, usuario2: ContadorUsuarios): number {
        return usuario1.idade - usuario2.idade;
    }

    // Métodos de instância
    public getId(): number {
        return this.id;
    }

    public getNome(): string {
        return this.nome;
    }

    public getIdade(): number {
        return this.idade;
    }

    public getInfo(): string {
        return `ID: ${this.id}, Nome: ${this.nome}, Idade: ${this.idade}`;
    }
}

// Classe utilitária - só métodos estáticos
class MathUtils {
    // Constantes matemáticas
    public static readonly PI: number = 3.14159;
    public static readonly E: number = 2.71828;

    // Construtor privado - impede instanciação
    private constructor() {}

    // Métodos utilitários estáticos
    public static calcularAreaCirculo(raio: number): number {
        return MathUtils.PI * raio * raio;
    }

    public static calcularPerimetroCirculo(raio: number): number {
        return 2 * MathUtils.PI * raio;
    }

    public static maximo(a: number, b: number): number {
        return a > b ? a : b;
    }

    public static minimo(a: number, b: number): number {
        return a < b ? a : b;
    }
}

// =================== EXEMPLOS DE USO ===================

console.log("=== MÉTODOS E ATRIBUTOS ESTÁTICOS ===\n");

// Acessando constantes estáticas
console.log(`Idade mínima: ${ContadorUsuarios.IDADE_MINIMA}`);
console.log(`Idade máxima: ${ContadorUsuarios.IDADE_MAXIMA}`);

// Usando método estático sem criar instância
console.log(`Idade 25 é válida? ${ContadorUsuarios.validarIdade(25)}`);
console.log(`Idade 15 é válida? ${ContadorUsuarios.validarIdade(15)}`);

console.log(`\nTotal de usuários inicial: ${ContadorUsuarios.getTotalUsuarios()}`);

// Criando instâncias
const usuario1 = new ContadorUsuarios("João", 25);
const usuario2 = new ContadorUsuarios("Maria", 30);
const usuario3 = ContadorUsuarios.criarUsuarioAdulto("Pedro"); // Factory method

console.log(`\nUsuários criados:`);
console.log(usuario1.getInfo());
console.log(usuario2.getInfo());
console.log(usuario3.getInfo());

// Contador estático atualizou automaticamente
console.log(`\nTotal de usuários agora: ${ContadorUsuarios.getTotalUsuarios()}`);

// Usando método estático de comparação
const diferencaIdade = ContadorUsuarios.compararIdade(usuario1, usuario2);
console.log(`\nDiferença de idade entre ${usuario1.getNome()} e ${usuario2.getNome()}: ${diferencaIdade} anos`);

// Classe utilitária
console.log("\n=== CLASSE UTILITÁRIA ===");
console.log(`Área do círculo (raio 5): ${MathUtils.calcularAreaCirculo(5)}`);
console.log(`Perímetro do círculo (raio 5): ${MathUtils.calcularPerimetroCirculo(5)}`);
console.log(`Máximo entre 10 e 20: ${MathUtils.maximo(10, 20)}`);
console.log(`Mínimo entre 10 e 20: ${MathUtils.minimo(10, 20)}`);

// Tentativa de criar usuário com idade inválida
try {
    const usuarioInvalido = new ContadorUsuarios("Criança", 15);
} catch (error) {
    console.log(`\nErro: ${(error as Error).message}`);
}

// Resetando contador (útil para testes)
console.log(`\nAntes do reset: ${ContadorUsuarios.getTotalUsuarios()} usuários`);
ContadorUsuarios.resetarContador();
console.log(`Depois do reset: ${ContadorUsuarios.getTotalUsuarios()} usuários`);