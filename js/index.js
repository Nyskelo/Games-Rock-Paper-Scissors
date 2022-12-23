import { resetGame, letsPlay, isGameOver } from './game_function';
import { buttonsPlay, reset } from './game_dom';
import { rulesInfo, showInfo, hideInfo, linkRules } from './game_dom';
import './game_set_images';
import '@sass/main';
import '@sass/game_style';

[...buttonsPlay].forEach(button =>
  button.addEventListener('click', e => {
    const choice = e.target.getAttribute('data-player');
    if (isGameOver) {
      resetGame();
    }
    letsPlay(choice);
  })
);
linkRules.onclick = () => {
  rulesInfo.classList.toggle('hidden');
  showInfo.classList.toggle('hidden');
  hideInfo.classList.toggle('hidden');
};
reset.onclick = resetGame;
