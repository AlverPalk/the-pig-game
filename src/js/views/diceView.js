import { elements, status } from '../index';

export const renderDice = () => {
    if (status.isRunning) {
        elements.dice.forEach((el, i) => {
            const dice = document.querySelector(el);
            (dice.style.visibility === 'hidden') ? dice.style.visibility = 'visible' : '';
            dice.src = `img/dice-${status.dice[i]}.png`
        })
    }
};

export const removeDice = () => {
    document.querySelector(elements.dice[0]).style.visibility = 'hidden';
    document.querySelector(elements.dice[1]).style.visibility = 'hidden';
};