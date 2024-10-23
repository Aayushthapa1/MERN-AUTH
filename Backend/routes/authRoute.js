import express from 'express';

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send('Signup route');
});
router.get('/Login', (req, res) => {
    res.send('login route');
});
router.get('/logout', (req, res) => {
    res.send('Logout route');
});


export default router