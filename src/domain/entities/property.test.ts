import { Property } from './property';
import { DateRange } from '../value_objects/date_range';
import { Booking } from './booking';
import { User } from './user';
describe("Property Entity", () => {
    it("Deve criar uma instância de Property com todos os atributos", () => {
        const property = new Property(
            "1",
            "Casa de praia",
            "Uma bela casa na praia",
            4,
            200,
        );

        expect(property.getId()).toBe("1");
        expect(property.getName()).toBe("Casa de praia");
        expect(property.getDescription()).toBe("Uma bela casa na praia");
        expect(property.getMaxGuests()).toBe(4);
        expect(property.getBasePricePerNight()).toBe(200);
    })

    it("Deve lançar um erro se o nome for vazio.", () => {
        expect(() => new Property("1", "", "Uma bela casa na praia", 4, 200)).toThrow("O nome é obrigatório.")
    })

    it("Deve lançar um erro se o número máximo de hospedes for zero ou negativo.", () => {
        expect(() => new Property("1", "Casa de praia", "Uma bela casa na praia", 0, 200)).toThrow("O número máximo de hospedes deve ser um número positivo.")
        expect(() => new Property("1", "Casa de praia", "Uma bela casa na praia", -1, 200)).toThrow("O número máximo de hospedes deve ser um número positivo.")
    })

    it("Deve validar o número máximo de hospodes", () => {
        const property = new Property("1", "Casa de praia", "Uma bela casa na praia", 5, 200);
        expect(() => {
            property.validateGuestCount(6)
        }).toThrow("Número máximo de hospedes excedido. Máximo permitido: 5.")
    })

    it("Não deve aplicar desconto para estadias menores que 7 noites", () => {
        const property = new Property("1", "Casa de praia", "Uma bela casa na praia", 2, 200);
        const dateRange = new DateRange(
            new Date("2024-12-20"),
            new Date("2024-12-22")
        );

        const totalPrice = property.calculateTotalPrice(dateRange);
        expect(totalPrice).toBe(200 * 2);
    }) 

    it("Deve aplicar desconto para estadias de 7 noites ou mais", () => {
        const property = new Property("1", "Casa de praia", "Uma bela casa na praia", 7, 200);
        const dateRange = new DateRange(
            new Date("2024-12-20"),
            new Date("2024-12-27")
        );

        const totalPrice = property.calculateTotalPrice(dateRange);
        expect(totalPrice).toBe(1260);  // 7 noites * 200 * 0.9 = 1260
    }) 

    it("Deve verificar disponibilidade da propriedade", () => {
        const property = new Property("1", "Casa de praia", "Uma bela casa na praia", 5, 200);
        const user = new User("1", "João");
        const dateRange = new DateRange(
            new Date("2024-12-20"),
            new Date("2024-12-25")
        );
        
        const dateRange2 = new DateRange(
            new Date("2024-12-22"),
            new Date("2024-12-27")
        );

        new Booking("1", property, user, dateRange, 2)

        expect(property.isAvailable(dateRange)).toBe(false);
        expect(property.isAvailable(dateRange2)).toBe(false);
    })
})