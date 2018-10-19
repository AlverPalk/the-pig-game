import { elements, status } from '../index';

export const generateDiceValues = () => {
    status.dice[0] = Math.floor((Math.random() * 6) + 1);
    status.dice[1] = Math.floor((Math.random() * 6) + 1);
};

export const validate = () => {
    if ((status.dice[0] === 1) || (status.dice[1] === 1)) {
        return 0;
    } else if ((status.dice[0] === 6) && (status.dice[1] === 6)) {
        return 1;
    } else {
        return -1;
    }
};