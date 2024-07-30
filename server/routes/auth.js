import { Router } from 'express';
import { client } from '../stream-client.js'

const router = Router();

router.post("/createUser", async (req, res) => {
    const { username, name, image } = req.body;

    if (!username || !name || !image) {
        return res.status(400).json({ message: "Missing required creadentials" });
    }

    const newUser = {
        id: username,
        role: 'user',
        name,
        image
    };

    const user = await client.upsertUsers({
        users: {
            [newUser.id]: newUser,
        }
    });

    const expiry = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
    const token = client.createToken(username, expiry);

    return res.status(200).json({ token, username, name });

});

export default router;
