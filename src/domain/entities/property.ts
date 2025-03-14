import { DateRange } from '../value_objects/date_range';
import { Booking } from './booking';

export class Property {
    private readonly bookings: Booking[] = []

    constructor(
        private id: string,
        private name: string,
        private description: string,
        private maxGuests: number,
        private basePricePerNight: number,
    ) {
        this.validateName(name);
        this.validateNumGuests(maxGuests)
        this.id = id;
        this.name = name;
        this.description = description;
        this.maxGuests = maxGuests;
        this.basePricePerNight = basePricePerNight;
    }

    getId(): string { 
        return this.id; 
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getMaxGuests(): number {
        return this.maxGuests;
    }

    getBasePricePerNight(): number {
        return this.basePricePerNight;
    }

    validateName(name: string): void {
        if (name == "") {
            throw new Error("O nome é obrigatório.");
        }
    }

    validateNumGuests(maxGuests: number): void  {
        if(maxGuests <= 0) {
            throw new Error("O número máximo de hospedes deve ser um número positivo.");
        }
    }

    validateGuestCount(guestCount: number):void {
        if(guestCount > this.maxGuests) {
            throw new Error(`Número máximo de hospedes excedido. Máximo permitido: ${this.maxGuests}.`);
        }
    }

    calculateTotalPrice(dateRange: DateRange): number {
        const totalNights = dateRange.getTotalNights();
        let totalPrice = totalNights * this.basePricePerNight;

        if (totalNights >= 7) {
            totalPrice *= 0.9;
        }

        return totalPrice;
    }

    isAvailable(dateRange: DateRange): boolean {
        return !this.bookings.some((booking) => 
            booking.getStatus() === "CONFIRMED" &&
            booking.getDateRange().overlaps(dateRange)
        )
    }

    addBookings(booking: Booking): void {
        this.bookings.push(booking);
    }

    getBookings(): Booking[] {
        return [...this.bookings];
    }
}