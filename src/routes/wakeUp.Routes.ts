import express from 'express';

const router = express.Router();

router.get('/wakeup', (req, res) => {
    res.status(200).send('Server is active');
});

export default router;
