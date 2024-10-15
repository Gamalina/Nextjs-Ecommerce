import mongoose from "mongoose";

export function mongooseConnect() {
    const uri = process.env.MONGODB_URI;
    if(mongoose.connect.readyState === 1) {
        return moongose.connection.asPromise();
    }
    else {
        return mongoose.connect(uri);
    }
}