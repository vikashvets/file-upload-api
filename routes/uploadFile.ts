import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

router.post('/upload-file',  function(req: Request, res: Response, next: NextFunction) {
    res.send('respond with a resource');
});

module.exports = router;
