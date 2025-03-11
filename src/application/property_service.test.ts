import { PropertyService} from "./property_service";
import { FakePropertyRepository } from "../infrastructure/repositories/fake_property_repository";
import { Property } from "../domain/entities/property";

describe("PropertyService", () => {
    let propertyService: PropertyService;
    let fakePropertyRepository: FakePropertyRepository;

    beforeEach(() => {
        fakePropertyRepository = new FakePropertyRepository();
        propertyService = new PropertyService(fakePropertyRepository);
    })

    it("Deve retornar null quando um ID inválido for passado", async () => {
        const property = await propertyService.findPropertyById("999");
        expect(property).toBeNull();
    });

    it("Deve retornar uma propriedade quando um ID válido for fornecido", async () => {
        const property = await propertyService.findPropertyById("1");
        expect(property).not.toBeNull();
        expect(property?.getId()).toBe("1");
        expect(property?.getName()).toBe("Test Property 1");
    })

     it("Deve salvar uma nova propriedade com sucesso usando repositorio fake e buscando novamente.", async () => {
            const newProperty = new Property(
                "1", 
                "Test Property 1", 
                "This is a test property.",
                5,
                200
            )
            await fakePropertyRepository.save(newProperty);
    
            const property = await propertyService.findPropertyById("1");
            expect(property).not.toBeNull();
            expect(property?.getId()).toBe("1");
            expect(property?.getName()).toBe("Test Property 1");
        });
})