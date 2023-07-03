import { Address } from "./address";
import { BlackBox } from "./black-box";
import { BlackBoxSize } from "./black-box-size";

export class BlackBoxBay {

    constructor(public id?: string,
                public name?: string,
                public address?: Address,
                public capacity?: Map<BlackBoxSize, number>,
                public blackBoxInside?: BlackBox[])
                {}
}
