import { Address } from "./address";
import { BlackBox } from "./black-box";
import { BlackBoxSize } from "./black-box-size";
import { OrderStatus } from "./order-status";
import { Parcel } from "./parcel";
import { TelemetrySample } from "./telemetry-sample";
import { User } from "./user";

export class Order {

    constructor(public id?: string,
                public trackingCode?: string,
                public openCode?: string,
                public totalPrice?: number,
                public status?: string,
                public startingAddress?: Address,
                public targetAddress?: Address,
                public blackBox?: BlackBox,
                public orderSamples?: TelemetrySample[],
            //    public parcel?: Parcel,
                public dateCreated?: Date,
                public lastUpdated?: Date,
                public sender?: User,
                public recipient?: User

            //    public packageSize?: BlackBoxSize
                 ){}
}
