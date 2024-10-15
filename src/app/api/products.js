import { Product } from "../models/Product";
import { mongooseConnect } from "../lib/mongoose";

export default async function handle(req, res) {
    const { method } = req;
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    await mongooseConnect();


    if(method === 'POST') {
        const { name, description, price } = req.body;

        const productDoc = await Product.create({
            name,
            description,
            price
        })
        res.json(productDoc);
    }
    else {
        res.status(405).end();
    }
}
