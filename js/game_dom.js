const scoreboard = document.getElementById('scoreboard');
const rulesInfo = document.getElementById('rules');
const linkRules = document.getElementById('link-rules');
const showInfo = document.getElementById('show');
const hideInfo = document.getElementById('hide');
const paperImg = document.getElementById('paper');
const rockImg = document.getElementById('rock');
const scissorImg = document.getElementById('scissor');
const buttonsPlay = document.querySelectorAll('[data-player]');
const reset = document.getElementById('reset');

export {
  scoreboard,
  rulesInfo,
  showInfo,
  hideInfo,
  linkRules,
  paperImg,
  rockImg,
  scissorImg,
  buttonsPlay,
  reset
};
