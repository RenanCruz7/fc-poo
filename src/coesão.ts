/**
 * COESÃO EM PROGRAMAÇÃO ORIENTADA A OBJETOS
 * 
 * Conceito:
 * - Coesão mede o quão bem os elementos dentro de uma classe trabalham juntos
 * - Uma classe coesa tem responsabilidades relacionadas e bem definidas
 * - Segue o princípio da Responsabilidade Única (SRP)
 * 
 * TIPOS DE COESÃO (do melhor para o pior):
 * 
 * ✅ COESÃO FUNCIONAL (ALTA) - IDEAL
 * - Todos os elementos trabalham para uma única função bem definida
 * - Exemplo: Classe Calculator que só faz operações matemáticas
 * 
 * ✅ COESÃO SEQUENCIAL (ALTA)
 * - Elementos trabalham em sequência para um objetivo comum
 * - Exemplo: Classe DataProcessor que valida → processa → salva
 * 
 * ⚠️ COESÃO COMUNICACIONAL (MÉDIA)
 * - Elementos trabalham com os mesmos dados
 * - Exemplo: Classe que manipula diferentes aspectos do mesmo objeto
 * 
 * ❌ COESÃO COINCIDENTAL (BAIXA) - EVITAR
 * - Elementos agrupados sem relação lógica
 * - Exemplo: Classe Utils com métodos totalmente diferentes
 */

// ✅ EXEMPLO DE ALTA COESÃO - Classe com responsabilidade única
class Calculadora {
    // Todos os métodos estão relacionados a operações matemáticas
    
    public somar(a: number, b: number): number {
        return a + b;
    }

    public subtrair(a: number, b: number): number {
        return a - b;
    }

    public multiplicar(a: number, b: number): number {
        return a * b;
    }

    public dividir(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Divisão por zero não é permitida");
        }
        return a / b;
    }

    public elevarAoPoder(base: number, expoente: number): number {
        return Math.pow(base, expoente);
    }

    public calcularRaizQuadrada(numero: number): number {
        if (numero < 0) {
            throw new Error("Não é possível calcular raiz quadrada de número negativo");
        }
        return Math.sqrt(numero);
    }
}

// ✅ EXEMPLO DE ALTA COESÃO - Validação de email
class ValidadorEmail {
    // Todos os métodos estão relacionados à validação de email
    
    public validar(email: string): boolean {
        return this.temFormatoValido(email) && 
               this.temDominioValido(email) && 
               this.temCaracteresValidos(email);
    }

    private temFormatoValido(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    private temDominioValido(email: string): boolean {
        const dominio = email.split('@')[1];
        return dominio && dominio.length > 0 && dominio.includes('.');
    }

    private temCaracteresValidos(email: string): boolean {
        const caracteresProibidos = /[<>()[\]\\,;:\s@"]/;
        const parteLocal = email.split('@')[0];
        return !caracteresProibidos.test(parteLocal);
    }

    public extrairDominio(email: string): string {
        if (!this.validar(email)) {
            throw new Error("Email inválido");
        }
        return email.split('@')[1];
    }
}

// ✅ EXEMPLO DE ALTA COESÃO - Gerenciamento de conta bancária
class ContaBancaria {
    // Todos os métodos estão relacionados a operações bancárias
    
    private saldo: number;
    private numeroConta: string;
    private titular: string;

    constructor(numeroConta: string, titular: string, saldoInicial: number = 0) {
        this.numeroConta = numeroConta;
        this.titular = titular;
        this.saldo = saldoInicial;
    }

    public depositar(valor: number): void {
        if (!this.validarValor(valor)) {
            throw new Error("Valor deve ser positivo");
        }
        this.saldo += valor;
        this.registrarOperacao(`Depósito: +${valor}`);
    }

    public sacar(valor: number): void {
        if (!this.validarValor(valor)) {
            throw new Error("Valor deve ser positivo");
        }
        if (!this.temSaldoSuficiente(valor)) {
            throw new Error("Saldo insuficiente");
        }
        this.saldo -= valor;
        this.registrarOperacao(`Saque: -${valor}`);
    }

    public consultarSaldo(): number {
        return this.saldo;
    }

    public transferir(valor: number, contaDestino: ContaBancaria): void {
        this.sacar(valor);
        contaDestino.depositar(valor);
        this.registrarOperacao(`Transferência: -${valor} para ${contaDestino.numeroConta}`);
    }

    private validarValor(valor: number): boolean {
        return valor > 0 && Number.isFinite(valor);
    }

    private temSaldoSuficiente(valor: number): boolean {
        return this.saldo >= valor;
    }

    private registrarOperacao(operacao: string): void {
        const timestamp = new Date().toLocaleString();
        console.log(`[${timestamp}] ${this.numeroConta}: ${operacao}`);
    }

    public getInfo(): string {
        return `Conta: ${this.numeroConta}, Titular: ${this.titular}, Saldo: R$ ${this.saldo.toFixed(2)}`;
    }
}

// ❌ EXEMPLO DE BAIXA COESÃO - Classe com múltiplas responsabilidades (EVITAR)
class UtilsMisturado {
    // ❌ PROBLEMA: Métodos não relacionados agrupados na mesma classe
    
    // Operação matemática
    public calcularAreaCirculo(raio: number): number {
        return Math.PI * raio * raio;
    }

    // Manipulação de string
    public converterParaMaiuscula(texto: string): string {
        return texto.toUpperCase();
    }

    // Operação de data
    public obterDataAtual(): string {
        return new Date().toLocaleDateString();
    }

    // Validação
    public validarCPF(cpf: string): boolean {
        return cpf.length === 11;
    }

    // Operação de arquivo (conceitual)
    public lerArquivo(caminho: string): string {
        return `Lendo arquivo: ${caminho}`;
    }
}

// ✅ REFATORAÇÃO - Separando responsabilidades em classes coesas
class UtilsMatematica {
    public static calcularAreaCirculo(raio: number): number {
        return Math.PI * raio * raio;
    }

    public static calcularAreaRetangulo(largura: number, altura: number): number {
        return largura * altura;
    }
}

class UtilsTexto {
    public static converterParaMaiuscula(texto: string): string {
        return texto.toUpperCase();
    }

    public static converterParaMinuscula(texto: string): string {
        return texto.toLowerCase();
    }
}

class UtilsData {
    public static obterDataAtual(): string {
        return new Date().toLocaleDateString();
    }

    public static formatarData(data: Date): string {
        return data.toLocaleDateString('pt-BR');
    }
}

// =================== EXEMPLOS DE USO ===================

console.log("=== EXEMPLOS DE COESÃO ===\n");

// 1. Testando Calculadora (Alta Coesão)
console.log("1. Calculadora (Alta Coesão):");
const calc = new Calculadora();
console.log(`2 + 3 = ${calc.somar(2, 3)}`);
console.log(`10 - 4 = ${calc.subtrair(10, 4)}`);
console.log(`5 * 6 = ${calc.multiplicar(5, 6)}`);
console.log(`15 / 3 = ${calc.dividir(15, 3)}`);
console.log(`2^3 = ${calc.elevarAoPoder(2, 3)}`);
console.log(`√16 = ${calc.calcularRaizQuadrada(16)}`);

// 2. Testando Validador de Email (Alta Coesão)
console.log("\n2. Validador de Email (Alta Coesão):");
const validador = new ValidadorEmail();
const emails = ["teste@email.com", "invalid-email", "user@domain.co.uk"];

emails.forEach(email => {
    const isValid = validador.validar(email);
    console.log(`${email}: ${isValid ? 'VÁLIDO' : 'INVÁLIDO'}`);
    if (isValid) {
        console.log(`  Domínio: ${validador.extrairDominio(email)}`);
    }
});

// 3. Testando Conta Bancária (Alta Coesão)
console.log("\n3. Conta Bancária (Alta Coesão):");
const conta1 = new ContaBancaria("12345", "João Silva", 1000);
const conta2 = new ContaBancaria("67890", "Maria Santos", 500);

console.log("Estado inicial:");
console.log(conta1.getInfo());
console.log(conta2.getInfo());

console.log("\nOperações:");
conta1.depositar(200);
conta1.sacar(150);
conta1.transferir(300, conta2);

console.log("\nEstado final:");
console.log(conta1.getInfo());
console.log(conta2.getInfo());

// 4. Comparando baixa vs alta coesão
console.log("\n4. Comparação - Classes Utilitárias:");

// ❌ Baixa coesão
console.log("❌ Classe com baixa coesão (múltiplas responsabilidades):");
const utilsMisturado = new UtilsMisturado();
console.log("Área do círculo:", utilsMisturado.calcularAreaCirculo(5));
console.log("Texto em maiúscula:", utilsMisturado.converterParaMaiuscula("hello"));
console.log("Data atual:", utilsMisturado.obterDataAtual());

// ✅ Alta coesão
console.log("\n✅ Classes com alta coesão (responsabilidades separadas):");
console.log("Área do círculo:", UtilsMatematica.calcularAreaCirculo(5));
console.log("Texto em maiúscula:", UtilsTexto.converterParaMaiuscula("hello"));
console.log("Data atual:", UtilsData.obterDataAtual());

console.log("\n=== Coesão demonstrada com sucesso! ===");
console.log("✅ Classes coesas são mais fáceis de manter, testar e reutilizar");
console.log("❌ Classes com baixa coesão devem ser refatoradas");