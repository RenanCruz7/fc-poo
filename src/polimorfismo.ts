// Classe base
abstract class Animal {
    protected nome: string;

    constructor(nome: string) {
        this.nome = nome;
    }

    // Método abstrato - deve ser implementado pelas classes filhas
    abstract emitirSom(): string;

    // Método comum a todos os animais
    dormir(): string {
        return `${this.nome} está dormindo`;
    }
}

// Classes filhas implementando o polimorfismo
class Cachorro extends Animal {
    emitirSom(): string {
        return `${this.nome} faz: Au au au!`;
    }
}

class Gato extends Animal {
    emitirSom(): string {
        return `${this.nome} faz: Miau miau!`;
    }
}

class Vaca extends Animal {
    emitirSom(): string {
        return `${this.nome} faz: Muuuu!`;
    }
}

class Pato extends Animal {
    emitirSom(): string {
        return `${this.nome} faz: Quack quack!`;
    }
}

// Demonstrando polimorfismo
console.log("=== POLIMORFISMO ===");

// Array de animais (mesmo tipo, mas comportamentos diferentes)
const animais: Animal[] = [
    new Cachorro("Rex"),
    new Gato("Mimi"),
    new Vaca("Mimosa"),
    new Pato("Donald")
];

// Polimorfismo em ação - mesmo método, comportamentos diferentes
console.log("Todos os animais fazendo som:");
animais.forEach(animal => {
    console.log(animal.emitirSom()); // Cada um executa sua própria implementação
});

console.log("\nTodos os animais dormindo:");
animais.forEach(animal => {
    console.log(animal.dormir()); // Comportamento comum herdado
});

// Função que aceita qualquer Animal (polimorfismo de parâmetro)
function fazerAnimalEmitirSom(animal: Animal): void {
    console.log(animal.emitirSom());
}

console.log("\nUsando função polimórfica:");
fazerAnimalEmitirSom(new Cachorro("Bobby"));
fazerAnimalEmitirSom(new Gato("Whiskers"));