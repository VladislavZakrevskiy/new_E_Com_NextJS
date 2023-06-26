export interface IPayload {
    user_id: string
    email: string
}

export class User {
    user_id: string
    email: string

    constructor (model: IPayload) {
        this.email = model.email
        this.user_id = model.user_id
    }
}