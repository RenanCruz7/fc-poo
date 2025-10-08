/** Classe que representa um usuário */

/**
 * A agregação é um tipo específico de relacionamento entre classes na Programação Orientada a Objetos que representa 
 * uma relação "tem um" (has-a) ou "parte de" entre objetos, mas com uma característica importante: 
 * as partes podem existir independentemente do todo.
*/

class User{
    private name: string;
    private age: number;
    private address: Address;

    constructor(name: string, age: number, address: Address){
        this.name = name;
        this.age = age;
        this.address = address;
    }
}

class Address{
    private street: string;
    private city: string;
    private zipCode: string;

    constructor(street: string, city: string, zipCode: string){
        this.street = street;
        this.city = city;
        this.zipCode = zipCode;
    }
}

const user = new User("John Doe", 30, new Address("123 Main St", "Anytown", "12345"));