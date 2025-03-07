import { User } from "./user"

describe('User Entity', () => {
    it("Deve criar uma instância de User com Id e Nome", () => {
        const user = new User("1", "Daniel Nascimento");
        expect(user.getId()).toBe("1");
        expect(user.getName()).toBe("Daniel Nascimento");
    })

    it("Deve retornar um erro se o nome for vazio", () => {
        expect(() => new User("1", "")).toThrow("O nome é obrigatório.")
    })

    it("Deve retornar um erro caso o id esteja em branco.", () => {
        expect(() => new User("", "Daniel Nascimento")).toThrow("O Id é obrigatório")
    })
})