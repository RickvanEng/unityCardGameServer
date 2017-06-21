var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
var router = express.Router();
var ctrlmain = require('../controllers/main');

router.get('/',                         ctrlmain.index);
router.post('/userCheck',       jsonParser,   ctrlmain.userCheck);
router.post('/getUserDecks',    jsonParser,   ctrlmain.getUserDecks);
router.post('/updateDeck',      jsonParser,   ctrlmain.updateDeck);
router.post('/saveDeck',        jsonParser,   ctrlmain.saveDeck);
// router.get('/home',                  ctrlmain.home);
router.get('/deckBuilder',              ctrlmain.deckBuilder);
router.get('/cardBrowser',              ctrlmain.cardBrowser);
router.get('/card',                     ctrlmain.card);
// router.get('/theGameInfo',           ctrlmain.theGameInfo);
router.get('/playMenu',                 ctrlmain.playMenu);
router.get('/gameWindow',               ctrlmain.gameWindow);
router.get('/selectRace',               ctrlmain.selectRace);
router.get('/selectElement',            ctrlmain.selectElement);

module.exports = router;