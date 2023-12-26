import { messageModel } from "../../models/message.model.js";

class messageDao{
    constructor(){this.model = messageModel}

    async getMessage(){
        return await this.model.find().lean()
    }

    async saveMessage(){
        return await this.model.create()
    }
}

export default messageDao