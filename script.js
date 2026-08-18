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
const musicLabel = document.querySelector('#musicLabel');

musicButton.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.classList.add('playing');
      musicButton.setAttribute('aria-pressed', 'true');
      musicLabel.textContent = 'Pausar música';
    } catch {
      musicLabel.textContent = 'Agrega musica.mp3';
    }
  } else {
    music.pause();
    musicButton.classList.remove('playing');
    musicButton.setAttribute('aria-pressed', 'false');
    musicLabel.textContent = 'Reproducir música';
  }
});
