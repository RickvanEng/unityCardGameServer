var express = require('express');
var router = express.Router();
var ctrlmain = require('../controllers/main');

router.get('/',                     ctrlmain.index);
// router.get('/home',                 ctrlmain.home);
router.get('/deckBuilder',          ctrlmain.deckBuilder);
router.get('/cardBrowser',          ctrlmain.cardBrowser);
router.get('/card',                 ctrlmain.card);
// router.get('/theGameInfo',          ctrlmain.theGameInfo);
router.get('/playMenu',             ctrlmain.playMenu);
router.get('/gameWindow',           ctrlmain.gameWindow);
router.get('/selectRace',           ctrlmain.selectRace);
router.get('/selectElement',        ctrlmain.selectElement);

module.exports = router;