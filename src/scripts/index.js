const playlist = [
  { title: "Song 1", src: "/src/songs/musicbyaden-alive.mp3" },
  { title: "Song 2", src: "/src/songs/musicbyaden-bliss.mp3" },
  { title: "Song 3", src: "/src/songs/musicbyaden-feel-good.mp3" },
  { title: "Song 4", src: "/src/songs/musicbyaden-jurgance-beach.mp3" },
  { title: "Song 5", src: "/src/songs/musicbyaden-tubebackr-limitless.mp3" },
];

const player = document.querySelector("#player");
const playButton = document.querySelector(".player__button--play");
const pauseButton = document.querySelector(".player__button--pause");
const progressBar = document.querySelector(".player__progress-bar");

const links = document.querySelectorAll(".playlist__item a");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
      e.preventDefault();
      const source = link.getAttribute("data-src");
      player.setAttribute("src", source);
      playSong();

      links.forEach((link) => link.classList.remove("active-song"));
      link.classList.add("active-song");
  });
});

const playSong = () => {
  if (player.paused) {
      player.play();
      toggleButtons();
  } else {
      player.pause();
      toggleButtons();
  }

  player.addEventListener("timeupdate", () => {
      const progress = (player.currentTime / player.duration) * 100;
      progressBar.style.width = `${progress}%`;
  });

  progressBar.addEventListener("click", (e) => {
      const progressWidth = progressBar.offsetWidth;
      const clickedWidth = e.offsetX;
      const percent = (clickedWidth / progressWidth) * 100;
      player.currentTime = (player.duration / 100) * percent;
      progressBar.style.width = `${percent}%`;
  });
};

const playFirstSong = () => {
  const firstSong = playlist[0].src;
  player.setAttribute("src", firstSong);
  playSong();
};

const toggleButtons = () => {
  if (player.paused) {
      playButton.classList.add("active");
      pauseButton.classList.remove("active");
  } else {
      playButton.classList.remove("active");
      pauseButton.classList.add("active");
  }
};

playButton.addEventListener("click", () => {
  player.play();
  toggleButtons();
});

pauseButton.addEventListener("click", () => {
  player.pause();
  toggleButtons();
});

player.addEventListener("play", toggleButtons);
player.addEventListener("pause", toggleButtons);

playFirstSong();
