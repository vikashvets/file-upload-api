var express = require('express');
var router = express.Router();

router.post('/upload-file', function(req, res, next) {
    console.log(req.body);
    res.send('respond with a resource');
});

module.exports = router;