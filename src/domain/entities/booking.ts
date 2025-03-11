import { RefundRuleFactory } from "../cancelation/refund_rule_factory";
import { DateRange } from "../value_objects/date_range";
import { Property } from "./property";
import { User } from "./user";

export class Booking {
    private readonly id: string;
    private readonly property: Property;
    private readonly guest: User;
    private readonly dateRange: DateRange;
    private readonly guestCount: number;
    private status: "CONFIRMED" | "CANCELED" = "CONFIRMED";
    private totalPrice: number;

    constructor(
        id: string,
        property: Property,
        guest: User,
        dateRange: DateRange,
        guestCount: number
    ) {
        
        if(guestCount <= 0) {
            throw new Error("O número de hospedes deve ser um número positivo.");
        }
        property.validateGuestCount(guestCount);

        if(!property.isAvailable(dateRange)) {
            throw new Error("A propriedade não está disponível para o período selecionado");
        }

        this.id = id;
        this.property = property;
        this.guest = guest;
        this.dateRange = dateRange;
        this.guestCount = guestCount;
        this.totalPrice = property.calculateTotalPrice(dateRange);
        this.status = "CONFIRMED";

        property.addBookings(this);
    }

    getId() { 
        return this.id; 
    }

    getProperty() {
        return this.property;
    }

    getUser() {
        return this.guest;
    }

    getDateRange() {
        return this.dateRange;
    }

    getGuestCount() {
        return this.guestCount;
    }

    getStatus(): "CONFIRMED" | "CANCELED" {
        return this.status;
    }

    getTotalPrice() {
        return this.totalPrice;
    }

    cancel(currentDate: Date): void {
        if(this.status == "CANCELED") {
            throw new Error("A reserva já foi concelada.")
        }
        
        const checkInDate = this.dateRange.getStartDate();
        const timeDiff = checkInDate.getTime() - currentDate.getTime();
        const daysUntilCheckIn = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
        this.totalPrice = refundRule.calculateRefund(this.totalPrice);
        this.status = "CANCELED";
    }
}