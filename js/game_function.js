import { rules, choices } from './game_options';
import { scoreboard } from './game_dom';

export let score = { WON: 0, LOST: 0, Tie: 0 };
export let round = 0;
export let isGameOver;
export const refreshInfo = generateMessage();

export const checkRules = new Proxy(rules, {
  get: (target, val) =>
    target[Object.keys(target).filter(key => new RegExp(key).test(val))]
});
export function resetGame() {
  scoreboard.innerHTML = '';
  score = { WON: 0, LOST: 0, Tie: 0 };
  round = 0;
}
export function letsPlay(choice) {
  let player = choice;
  let computer = choices[Math.floor(Math.random() * choices.length)];
  let result = player + computer;
  let beatsResult = checkRules[result];
  let isMaxScore = score[beatsResult] === choices.length - 1;
  isGameOver = isMaxScore && beatsResult !== 'Tie';

  score[beatsResult] += 1;
  round++;

  refreshInfo.boadr(round, player, computer);

  if (isGameOver) {
    refreshInfo.gameover(beatsResult);
    score = { WON: 0, LOST: 0, Tie: 0 };
    round = 0;
  }
}
function generateMessage() {
  return {
    boadr: function (round, plr1, plr2) {
      let result = plr1 + plr2;
      let info = `Round ${round}, ${plr1} vs ${plr2}, ${this.result(result)}`;
      const p = document.createElement('p');
      p.innerText = info;
      scoreboard.append(p);
    },
    gameover: function (value) {
      const p = document.createElement('p');
      p.setAttribute('class', 'gameover');
      p.innerText =
        value === 'WON' ? "You're a winner 🏆" : "You're a loser 😭";
      scoreboard.prepend(p);
    },
    result: result =>
      checkRules[result] === 'Tie'
        ? "It's a DRAW!"
        : `You've ${checkRules[result]}!`
  };
}
