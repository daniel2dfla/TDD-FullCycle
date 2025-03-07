export class User {
    private readonly id: string;
    private readonly name: string;

    constructor (id: string, name: string) {
        this.validationName(name);
        this.validationId(id);
        this.id = id;
        this.name = name;
    }

    validationName(name: string): void {
        if (name == "") {
            throw new Error("O nome é obrigatório.");
        }
    }

    validationId(id: string): void {
        if ( id == "") {
            throw new Error("O Id é obrigatório");
        }
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
}