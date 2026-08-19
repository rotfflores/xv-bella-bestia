// Personaliza aquí los datos principales de la invitación.
const eventDate = new Date('2026-12-19T13:00:00-06:00');

const units = {
  days: document.querySelector('#days'),
  hours: document.querySelector('#hours'),
  minutes: document.querySelector('#minutes'),
  seconds: document.querySelector('#seconds')
};

function updateCountdown() {
  const distance = Math.max(0, eventDate.getTime() - Date.now());
  const values = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor(distance / 3600000) % 24,
    minutes: Math.floor(distance / 60000) % 60,
    seconds: Math.floor(distance / 1000) % 60
  };
  Object.entries(values).forEach(([key, value]) => {
    units[key].textContent = String(value).padStart(key === 'days' ? 3 : 2, '0');
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

const music = document.querySelector('#music');
const musicButton = document.querySelector('#musicButton');
const floatingMusicButton = document.querySelector('#floatingMusicButton');
const musicLabel = document.querySelector('#musicLabel');
music.volume = 0.48;
let playerIsVisible = true;
let musicHasStarted = false;

async function toggleMusic() {
  if (music.paused) {
    try {
      await music.play();
    } catch {
      musicLabel.textContent = 'No se pudo reproducir';
    }
  } else {
    music.pause();
  }
}

function updateMusicControls() {
  const isPlaying = !music.paused;
  if (isPlaying) musicHasStarted = true;

  musicButton.classList.toggle('playing', isPlaying);
  musicButton.setAttribute('aria-pressed', String(isPlaying));
  musicButton.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Reproducir música');
  musicLabel.textContent = isPlaying ? 'Reproduciendo · presiona para pausar' : 'Presiona para reproducir';

  floatingMusicButton.classList.toggle('playing', isPlaying);
  floatingMusicButton.setAttribute('aria-pressed', String(isPlaying));
  floatingMusicButton.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Reanudar música');
  floatingMusicButton.hidden = playerIsVisible || !musicHasStarted;
}

musicButton.addEventListener('click', toggleMusic);
floatingMusicButton.addEventListener('click', toggleMusic);
music.addEventListener('play', updateMusicControls);
music.addEventListener('pause', updateMusicControls);

const playerObserver = new IntersectionObserver(([entry]) => {
  playerIsVisible = entry.isIntersecting;
  updateMusicControls();
}, { threshold: 0.15 });

playerObserver.observe(musicButton);
updateMusicControls();
