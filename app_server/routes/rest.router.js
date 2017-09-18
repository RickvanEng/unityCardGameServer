var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
var router = express.Router();

var cardDataController = require('../controllers/cardData.controller');
var viewController = require('../controllers/view.controller');
var playerController = require('../controllers/player.controller');

router.get('/',                               viewController.index);

router.get('/getTypes',                       cardDataController.getTypes);
router.get('/getRoles',                       cardDataController.getRoles);
router.get('/getRaces',                       cardDataController.getRaces);
router.get('/getElements',                    cardDataController.getElements);
router.get('/getAllCards',                    cardDataController.getAllCards);
router.get('/getLores',                       cardDataController.getLores);

router.post('/getUserDecks',    jsonParser,   cardDataController.getUserDecks);
router.post('/updateDeck',      jsonParser,   cardDataController.updateDeck);
router.post('/saveDeck',        jsonParser,   cardDataController.saveDeck);
router.post('/deleteDeck',      jsonParser,   cardDataController.deleteDeck);

// router.post('/playerLogin',  jsonParser,   playerController.playerLogin);
// router.post('/playerlogout', jsonParser,   playerController.playerLogout);

router.post('/userLogIn',       jsonParser,   playerController.playerLogIn);

// router.get('/home',                  viewController.home);
router.get('/deckBuilder',              viewController.deckBuilder);
router.get('/cardBrowser',              viewController.cardBrowser);
router.get('/card',                     viewController.card);
// router.get('/theGameInfo',           viewController.theGameInfo);
router.get('/playMenu',                 viewController.playMenu);
router.get('/gameWindow',               viewController.gameWindow);
router.get('/selectRace',               viewController.selectRace);
router.get('/selectElement',            viewController.selectElement);

module.exports = router;