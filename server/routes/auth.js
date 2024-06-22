import { Router } from 'express';

const router = Router();

router.post("/createUser", async (req, res) => {
    const { username, name, image } = req.body;

    if (!username || !name || !image) {
        return res.status(400).json({ message: "Missing required creadentials" });
    }

});

export default router;