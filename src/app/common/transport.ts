import { Address } from "./address";
import { Order } from "./order";
import { User } from "./user";

export class Transport {

    constructor(public id?: string,
                public transportUser?: User,
                public pickupTime?: Date,
                public dropTime?: Date,
                public order?: Order,
                public dropAddress?: Address)
                {}
}
