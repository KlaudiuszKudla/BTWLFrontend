import { BlackBox } from "./black-box";
import { Transport } from "./transport";

export class Parcel {

    constructor(public id?: string,
                public blackBox?: BlackBox,
                public transport?: Transport)
                {}
}
