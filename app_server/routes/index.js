var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
var router = express.Router();
var ctrlmain = require('../controllers/main');

router.get('/',                         ctrlmain.index);

router.get('/getTypes',                       ctrlmain.getTypes);
router.get('/getRoles',                       ctrlmain.getRoles);
router.get('/getRaces',                       ctrlmain.getRaces);
router.get('/getElements',                    ctrlmain.getElements);

router.get('/getAllCards',                    ctrlmain.getAllCards);
router.get('/getLores',                       ctrlmain.getLores);

router.post('/userCheck',       jsonParser,   ctrlmain.userCheck);
router.post('/getUserDecks',    jsonParser,   ctrlmain.getUserDecks);
router.post('/updateDeck',      jsonParser,   ctrlmain.updateDeck);
router.post('/saveDeck',        jsonParser,   ctrlmain.saveDeck);
router.post('/deleteDeck',      jsonParser,   ctrlmain.deleteDeck);


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