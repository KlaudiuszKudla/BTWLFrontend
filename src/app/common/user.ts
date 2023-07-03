import { Address } from "./address";
import { UserRoles } from "./user-roles";

export class User {

    constructor(public id?: string,
                public firstName?: string,
                public lastName?: string,
                public email?: string,
                public phone?: number,
                public address?: Address,
                public password?: string,
                public role?: string,
                public dateCreated?: Date,
                public accountNonExpired?: Boolean,
                public accountNonLocked?: Boolean,
                public credentailsNonExpired?: Boolean,
                public enabled?: Boolean )
                {}
}
