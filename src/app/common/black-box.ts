import { Address } from "./address";
import { BlackBoxSize } from "./black-box-size";
import { BlackBoxStatus } from "./black-box-status";
import { TelemetrySample } from "./telemetry-sample";

export class BlackBox {

    constructor(public id?: string,
                public telemetrySample?: TelemetrySample,
                public lockStatus?: number,
                public status?: String[],
                public size?: String,
                public currentPickupAddress?: Address)

                {}
}
