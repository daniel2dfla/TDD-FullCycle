import { User } from "./user"

describe('User Entity', () => {
    it("Deve criar uma instância de User com Id e Nome", () => {
        const user = new User("1", "Daniel Nascimento");
        expect(user.getId()).toBe("1");
        expect(user.getName()).toBe("Daniel Nascimento");
    })
})