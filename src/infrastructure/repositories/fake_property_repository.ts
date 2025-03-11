import { Property } from "../../domain/entities/property";
import { PropertyRepository } from "../../domain/repositories/property_repository";

export class FakePropertyRepository implements PropertyRepository {
    private properties: Property[] = [
        new Property("1", "Test Property 1", "This is a test property.", 5, 200),
        new Property("2", "Test Property 2", "This is another test property.", 3, 150),
        new Property("3", "Test Property 3", "This is yet another test property.", 4, 250),
        new Property("4", "Test Property 4", "This is the final test property.", 6, 300),
    ]
    async findById(id: string): Promise<Property | null> {
        return this.properties.find((property) => property.getId() === id) ?? null;
    }
    async save(property: Property): Promise<void> {
        this.properties.push(property);
    }
}