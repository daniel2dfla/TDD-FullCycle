import { DateRange } from "./date_range";

describe('DataRange value Object', () => {
    it('Deve lançar um erro se a data do término for antes da data do início', () => {
        expect(() => {
            new DateRange(new Date('2025-12-25'), new Date('2024-12-20'));
        }).toThrow("A data de término deve ser posterior a data de início.")
    });

    it("Deve criar uma instância de DateRange com a data de início e a data de término, e verificar o retorno", () => {
        const startDate = new Date("2024-12-20");
        const endDate = new Date("2024-12-2025")
        const dateRange = new DateRange(startDate, endDate);
        expect(dateRange.getStartDate()).toEqual(startDate);
        expect(dateRange.getEndDate()).toEqual(endDate);
    });

    it("Deve calcular o total de noites corretamente", () => {
        const startDate = new Date("2024-12-20");
        const endDate = new Date("2024-12-25")
        const dateRange = new DateRange(startDate, endDate);

        const totalNights = dateRange.getTotalNights();

        expect(totalNights).toBe(5);
    })

    it("Deve verificar se dois intervalos de datas se sobrepõem.", () => {
        const dateRange1 = new DateRange(
            new Date("2024-12-22"),
            new Date("2024-12-28")
        );

        const dateRange2 = new DateRange(
            new Date("2024-12-28"),
            new Date("2024-12-29")
        );

        const overlaps = dateRange1.overlaps(dateRange2);

        expect(overlaps).toBe(false);
    })

    it('Deve lançar erro se a data de início e de término forem iguais.', () => {
        const date = new Date('2024-12-29')
        const date2 = new Date('2024-11-20')
        expect(() => {
            new DateRange(date, date);
        }).toThrow("A data de início e término não podem ser iguais.")
    })
});