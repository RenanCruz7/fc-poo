// Classe base (classe pai)
class Veiculo {
    protected marca: string;
    protected modelo: string;
    protected ano: number;

    constructor(marca: string, modelo: string, ano: number) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }

    acelerar(): string {
        return `${this.marca} ${this.modelo} está acelerando`;
    }

    frear(): string {
        return `${this.marca} ${this.modelo} está freando`;
    }
}

// Classe filha que herda de Veiculo
class Carro extends Veiculo {
    private portas: number;

    constructor(marca: string, modelo: string, ano: number, portas: number) {
        super(marca, modelo, ano); // Chama o construtor da classe pai
        this.portas = portas;
    }

    abrirPorta(): string {
        return `Abrindo uma das ${this.portas} portas do ${this.marca} ${this.modelo}`;
    }
}

// Outra classe filha que herda de Veiculo
class Moto extends Veiculo {
    private cilindradas: number;

    constructor(marca: string, modelo: string, ano: number, cilindradas: number) {
        super(marca, modelo, ano);
        this.cilindradas = cilindradas;
    }

    empinar(): string {
        return `${this.marca} ${this.modelo} de ${this.cilindradas}cc está empinando`;
    }
}

// Exemplo de uso
const carro = new Carro("Toyota", "Corolla", 2023, 4);
console.log(carro.acelerar());    // Método herdado
console.log(carro.frear());       // Método herdado
console.log(carro.abrirPorta());  // Método próprio

const moto = new Moto("Honda", "CB600", 2022, 600);
console.log(moto.acelerar());     // Método herdado
console.log(moto.frear());        // Método herdado
console.log(moto.empinar());      // Método próprio