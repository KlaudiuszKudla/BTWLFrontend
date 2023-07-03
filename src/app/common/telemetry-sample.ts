import { GeoPosition } from "./geo-position";

export class TelemetrySample {

    constructor(public id?: string,
                public maxG?: number,
                public microcontrollerId?: string,
                public batteryLevel?: number,
                public gsmSignal?: number,
                public temperature?: number,
                public humidity?: number,
                public geoPosition?: GeoPosition,
                public readedAt?: Date,
                public lockStatus?: number)
                {}
}
