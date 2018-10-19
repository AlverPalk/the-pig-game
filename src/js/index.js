require('../css/main.scss');

import * as Dice from './models/Dice';
import * as Player from './models/Player';
import * as diceView from './views/diceView';
import * as playerView from './views/playerView';
import * as messageView from './views/messageView';

export const elements = {
    dice: ['.game__control-dice--0', '.game__control-dice--1'],
    scores: ['.game__player-total--0', '.game__player-total--1'],
    currents: ['.game__player-current--0', '.game__player-current--1'],
    players: ['.game__player-name--0', '.game__player-name--1'],
    playerPanels: ['.game__player-panel--0', '.game__player-panel--1'],
    winningScoreContainer: '.game__control-goal',
    winningScore: '.game__control-goal-input',
    messageContainer: '.game__message',
    messageContainerToggled: '.game__message--toggled',
    btnNew: '.game__control-btn-new',
    btnRoll: '.game__control-btn-roll',
    btnHold: '.game__control-btn-hold'
};

export const status = {
    activePlayer: 0,
    currentScore: 0,
    scores: [0, 0],
    dice: [0, 0],
    winningScore: 100,
    isRunning: false,
    msgDisplayed: false
};

function init() {
    status.activePlayer = 0;
    status.currentScore = 0;
    status.scores = [0, 0];
    status.dice = [0, 0];
    status.isRunning = false;
    disBtns();

    setWinningScore();
    diceView.removeDice();


    elements.players.forEach((el, i) => {
        document.querySelector(el).textContent = `Player ${i + 1}`
    });

    playerView.renderScores();
    playerView.renderCurrent();
}

function roll() {
    if (status.isRunning) {
        Dice.generateDiceValues();
        diceView.renderDice();
        switch (Dice.validate()) {
            case 0:
                // If one of the numbers rolled is 1
                switchPlayer();
                break;
            case 1:
                // If both numbers rolled are 6
                status.scores[status.activePlayer] = 0;
                playerView.renderScores();
                switchPlayer();
                break;
            default:
                // If validation was successful
                Player.calcCurrentScore();
                playerView.renderCurrent();
                break;
        }
    }
}

function hold() {
    if (status.isRunning){
        Player.calcScore();
        playerView.renderScores();
        status.currentScore = 0;
        playerView.renderCurrent();
        if (status.scores[status.activePlayer] >= status.winningScore) {
            status.isRunning = false;
            playerView.declareWinner();
            playerView.toggleActivePlayer();
            disBtns();
        } else {
            switchPlayer();
        }
    }
}

function setWinningScore() {
    if (!status.isRunning) {
        playerView.removoeActivePlayer();
        document.querySelector(elements.winningScoreContainer).style.display = 'block';
        document.querySelector(elements.winningScoreContainer).addEventListener('keypress', e => {
            if (e.which === 13) {
                enaBtns();
                playerView.addActivePlayer();
                const winningScore = document.querySelector(elements.winningScore).value;
                (winningScore >= 1) ? status.winningScore = winningScore : status.winningScore = 100;
                status.isRunning = true;
                document.querySelector(elements.winningScoreContainer).style.display = 'none';
                document.querySelector(elements.btnRoll).addEventListener('click', roll);
                document.querySelector(elements.btnHold).addEventListener('click', hold);
             }
        });
    }
}

function disBtns() {
    document.querySelector(elements.btnHold).classList.add('disabled');
    document.querySelector(elements.btnRoll).classList.add('disabled');
}

function enaBtns() {
    document.querySelector(elements.btnHold).classList.remove('disabled');
    document.querySelector(elements.btnRoll).classList.remove('disabled');
}

function switchPlayer() {
    diceView.removeDice();
    status.currentScore = 0;
    playerView.renderCurrent();
    playerView.toggleActivePlayer();
    Player.switchPlayer();
    playerView.toggleActivePlayer();
}


document.querySelector(elements.btnNew).addEventListener('click', init);

init();
