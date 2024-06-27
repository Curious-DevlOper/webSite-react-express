import express from 'express';
// import router from 'Router';


const router = express.Router();
router.get('/test', (req, res)=> res.json({msg: "profile works"}));
export default router;
