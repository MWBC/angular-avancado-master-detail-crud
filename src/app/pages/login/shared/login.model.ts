import { BaseResourceModel } from "../../../shared/models/base-resource.model";

export class Login {

    constructor(
        public username?: string, 
        public password?: string
    ) {}
}