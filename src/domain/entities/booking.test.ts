import { DateRange } from "../value_objects/date_range";
import { Property } from "./property";
import { User } from "./user";
import { Booking } from "./booking";


describe("Booking entity", () => {
    it("Deve criar uma instância de Booking com todos os atributos", () => {
        const property = new Property("1", "Casa", "Descrição", 4, 200);
        const user = new User("2", "Daniel Nascimento");
        const dateRange = new DateRange(
            new Date("2024-12-20"),
            new Date("2024-12-25")
        );
        const booking = new Booking("1", property, user, dateRange, 2);

        expect(booking.getId()).toBe("1");
        expect(booking.getProperty()).toBe(property);
        expect(booking.getUser()).toBe(user);
        expect(booking.getDateRange()).toBe(dateRange);
        expect(booking.getGuestCount()).toBe(2);
    })

    it("Deve lançar um erro se o número de hospedes for zero ou negativo", () => {
        const property = new Property("1", "Casa", "Descrição", 4, 200);
        const user = new User("2", "Daniel Nascimento");
        const dateRange = new DateRange(
            new Date("2024-12-20"),
            new Date("2024-12-25")
        );
        expect(() => new Booking("1", property, user, dateRange, -1)).toThrow("O número de hospedes deve ser um número positivo.")
        expect(() => new Booking("1", property, user, dateRange, 0)).toThrow("O número de hospedes deve ser um número positivo.")
    })

    it("Deve lançar um erro ao tentar reservar com número de hóspedes acima do máximo permitido", () => {
        const property = new Property("1", "Casa", "Descrição", 4, 200);
        const user = new User("2", "Daniel Nascimento");
        const dateRange = new DateRange(
            new Date("2024-12-20"),
            new Date("2024-12-25")
        );
        expect(() => new Booking("1", property, user, dateRange, 5)).toThrow("Número máximo de hospedes excedido. Máximo permitido: 4.")
    })

    it("Deve calcular o preço total com desconto", () => {
        const property = new Property("1", "Casa", "Descrição", 4, 200);
        const user = new User("2", "Daniel Nascimento");
        const dateRange = new DateRange(
            new Date("2024-12-01"),
            new Date("2024-12-10")
        );
        const booking = new Booking("1", property, user, dateRange, 4);

        expect(booking.getTotalPrice()).toBe(200 * 9 * 0.9) // 200 * 9 * 0.9 = 1620
    })

    it("Não deve realizar o agendamento quando uma propriedade não estiver disponível.",() => {
        const property = new Property("1", "Casa", "Descrição", 4, 200);
        const user = new User("2", "Daniel Nascimento");
        const dateRange = new DateRange(
            new Date("2024-12-01"),
            new Date("2024-12-05")
        );

        const booking = new Booking("1", property, user, dateRange, 4);
        const dateRange2 = new DateRange(
            new Date("2024-12-02"),
            new Date("2024-12-09")
        )

        expect(() => {
            new Booking("2", property, user, dateRange2, 4);
        }).toThrow("A propriedade não está disponível para o período selecionado")
    } )

    it("Deve cancelar uma reserva sem reembolso quando faltam menos de 1 dia para o check-in", () => {
        const property = new Property("1", "Casa", "Descrição", 4, 200);
        const user = new User("2", "Daniel Nascimento");
        const dateRange = new DateRange(
            new Date("2024-12-20"),
            new Date("2024-12-22")
        );
        const booking = new Booking("1", property, user, dateRange, 4);

        const currentDate = new Date("2024-12-20");
        booking.cancel(currentDate);

        expect(booking.getStatus()).toBe("CANCELED");
        expect(booking.getTotalPrice()).toBe(400);
    })

    it("Deve cancelar uma reserva com reembolso quando a data de cancelamento for superior a 7 dia antes do check-in", () => {
        const property = new Property("1", "Casa", "Descrição", 4, 200);
        const user = new User("2", "Daniel Nascimento");
        const dateRange = new DateRange(
            new Date("2024-12-20"),
            new Date("2024-12-25")
        );
        const booking = new Booking("1", property, user, dateRange, 4);

        const currentDate = new Date("2024-12-10");
        booking.cancel(currentDate);

        expect(booking.getStatus()).toBe("CANCELED");
        expect(booking.getTotalPrice()).toBe(0);
    })

    it("Deve cancelar uma reserva com reembolso parcial quando a data de cancelamento estiver entre 1 e 7 dias antes do check-in", () => {
        const property = new Property("1", "Casa", "Descrição", 4, 200);
        const user = new User("2", "Daniel Nascimento");
        const dateRange = new DateRange(
            new Date("2024-12-20"),
            new Date("2024-12-25")
        );
        const booking = new Booking("1", property, user, dateRange, 4);

        const currentDate = new Date("2024-12-18");
        booking.cancel(currentDate);

        expect(booking.getStatus()).toBe("CANCELED");
        expect(booking.getTotalPrice()).toBe( 200 * 5 * 0.5 );
    })

    it("Não deve permitir cancelar a mesma reserva mais de uma vez", () => {
        const property = new Property("1", "Casa", "Descrição", 4, 200);
        const user = new User("2", "Daniel Nascimento");
        const dateRange = new DateRange(
            new Date("2024-12-20"),
            new Date("2024-12-25")
        );
        const booking = new Booking("1", property, user, dateRange, 4);

        const currentDate = new Date("2024-12-18");
        booking.cancel(currentDate);

        expect(() => {
            booking.cancel(currentDate);
        }).toThrow("A reserva já foi concelada.")
    })

})