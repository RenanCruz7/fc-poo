/**
 * PADRÃO SINGLETON
 * 
 * Características:
 * - Garante que uma classe tenha apenas uma instância
 * - Fornece um ponto de acesso global a essa instância
 * - A própria classe controla sua instanciação
 * 
 * VANTAGENS (PRÓS):
 * ✅ Controle de instanciação: apenas uma instância existe
 * ✅ Acesso global: disponível em toda a aplicação
 * ✅ Inicialização lazy: criado apenas quando necessário
 * ✅ Economia de recursos: evita múltiplas instâncias desnecessárias
 * ✅ Estado consistente: dados compartilhados de forma controlada
 * 
 * DESVANTAGENS (CONTRAS):
 * ❌ Estado global: pode criar dependências ocultas
 * ❌ Dificulta testes: estado compartilhado entre testes
 * ❌ Viola princípio de responsabilidade única
 * ❌ Pode mascarar problemas de design
 * ❌ Dificulta paralelização e concorrência
 * ❌ Acoplamento forte com outras classes
 */

// Exemplo 1: Configuração da aplicação
class ConfiguracaoApp {
    private static instancia: ConfiguracaoApp;
    private configuracoes: Map<string, any>;

    // Construtor privado - impede instanciação externa
    private constructor() {
        this.configuracoes = new Map();
        this.carregarConfiguracoesPadrao();
    }

    // Método estático para obter a única instância
    public static getInstance(): ConfiguracaoApp {
        if (!ConfiguracaoApp.instancia) {
            ConfiguracaoApp.instancia = new ConfiguracaoApp();
        }
        return ConfiguracaoApp.instancia;
    }

    private carregarConfiguracoesPadrao(): void {
        this.configuracoes.set('theme', 'dark');
        this.configuracoes.set('language', 'pt-BR');
        this.configuracoes.set('timeout', 5000);
        this.configuracoes.set('debug', false);
    }

    public getConfiguracao(chave: string): any {
        return this.configuracoes.get(chave);
    }

    public setConfiguracao(chave: string, valor: any): void {
        this.configuracoes.set(chave, valor);
        console.log(`Configuração atualizada: ${chave} = ${valor}`);
    }

    public listarConfiguracoes(): void {
        console.log('=== Configurações da Aplicação ===');
        this.configuracoes.forEach((valor, chave) => {
            console.log(`${chave}: ${valor}`);
        });
    }
}

// Exemplo 2: Logger da aplicação
class Logger {
    private static instancia: Logger;
    private logs: string[] = [];

    private constructor() {
        console.log('Logger inicializado!');
    }

    public static getInstance(): Logger {
        if (!Logger.instancia) {
            Logger.instancia = new Logger();
        }
        return Logger.instancia;
    }

    public log(nivel: 'INFO' | 'WARN' | 'ERROR', mensagem: string): void {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${nivel}: ${mensagem}`;
        
        this.logs.push(logEntry);
        console.log(logEntry);
    }

    public info(mensagem: string): void {
        this.log('INFO', mensagem);
    }

    public warn(mensagem: string): void {
        this.log('WARN', mensagem);
    }

    public error(mensagem: string): void {
        this.log('ERROR', mensagem);
    }

    public getLogs(): string[] {
        return [...this.logs]; // Retorna uma cópia
    }

    public limparLogs(): void {
        this.logs = [];
        console.log('Logs limpos!');
    }

    public exportarLogs(): string {
        return this.logs.join('\n');
    }
}

// Exemplo 3: Contador global (demonstrativo)
class ContadorGlobal {
    private static instancia: ContadorGlobal;
    private contador: number = 0;

    private constructor() {}

    public static getInstance(): ContadorGlobal {
        if (!ContadorGlobal.instancia) {
            ContadorGlobal.instancia = new ContadorGlobal();
        }
        return ContadorGlobal.instancia;
    }

    public incrementar(): number {
        return ++this.contador;
    }

    public decrementar(): number {
        return --this.contador;
    }

    public getValor(): number {
        return this.contador;
    }

    public resetar(): void {
        this.contador = 0;
    }
}

// =================== EXEMPLOS DE USO ===================

console.log("=== PADRÃO SINGLETON ===\n");

// Testando ConfiguracaoApp
console.log("1. Configuração da Aplicação:");
const config1 = ConfiguracaoApp.getInstance();
const config2 = ConfiguracaoApp.getInstance();

// Verificando se são a mesma instância
console.log(`São a mesma instância? ${config1 === config2}`);

config1.listarConfiguracoes();
config1.setConfiguracao('theme', 'light');
config1.setConfiguracao('debug', true);

console.log('\nConfiguração acessada de outra "instância":');
console.log(`Theme: ${config2.getConfiguracao('theme')}`);
console.log(`Debug: ${config2.getConfiguracao('debug')}`);

// Testando Logger
console.log("\n2. Sistema de Log:");
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

console.log(`Loggers são iguais? ${logger1 === logger2}`);

logger1.info('Aplicação iniciada');
logger1.warn('Configuração de debug ativada');
logger2.error('Erro simulado para teste');

console.log('\nTodos os logs:');
logger1.getLogs().forEach(log => console.log(`  ${log}`));

// Testando ContadorGlobal
console.log("\n3. Contador Global:");
const contador1 = ContadorGlobal.getInstance();
const contador2 = ContadorGlobal.getInstance();

console.log(`Contadores são iguais? ${contador1 === contador2}`);

console.log(`Valor inicial: ${contador1.getValor()}`);
console.log(`Incrementar: ${contador1.incrementar()}`);
console.log(`Incrementar: ${contador1.incrementar()}`);
console.log(`Incrementar: ${contador1.incrementar()}`);
console.log(`Valor do contador2: ${contador2.getValor()}`);
console.log(`Decrementar: ${contador2.decrementar()}`);
console.log(`Valor final: ${contador1.getValor()}`);

// Demonstrando que não é possível criar novas instâncias
console.log("\n4. Tentativa de instanciação direta:");
try {
    // Esta linha causaria erro de compilação no TypeScript
    // const configNova = new ConfiguracaoApp(); // Error: Constructor is private
    console.log("❌ Não é possível criar instâncias diretamente (construtor privado)");
} catch (error) {
    console.log(`Erro: ${error}`);
}

console.log("\n=== Singleton Pattern implementado com sucesso! ===");