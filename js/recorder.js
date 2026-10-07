(() => {
  const recBtn = document.querySelector("#rec-btn");
  const playBtn = document.querySelector("#play-btn");
  const clearBtn = document.querySelector("#clear-btn");
  const recStatus = document.querySelector("#rec-status");

  if (!recBtn || !playBtn || !clearBtn || !recStatus) {
    return;
  }

  let beatQueue = [];
  let recordStart = 0;
  let isRecording = false;
  let isPlaying = false;
  let playbackTimers = [];

  const clearPlaybackTimers = () => {
    playbackTimers.forEach((timerId) => {
      window.clearTimeout(timerId);
    });

    playbackTimers = [];
    isPlaying = false;
  };

  const updatePlayButton = () => {
    playBtn.disabled = isRecording || beatQueue.length === 0;
  };

  recBtn.addEventListener("click", () => {
    const shouldRecord = recBtn.getAttribute("aria-pressed") !== "true";

    recBtn.setAttribute("aria-pressed", String(shouldRecord));

    if (shouldRecord) {
      clearPlaybackTimers();
      beatQueue.length = 0;
      recordStart = performance.now();
      isRecording = true;
      recStatus.textContent = "Recording… 0 beat(s)";
      updatePlayButton();
      return;
    }

    isRecording = false;
    recStatus.textContent = `Stopped. ${beatQueue.length} beat(s) recorded.`;
    updatePlayButton();
  });

  window.addEventListener("drum:hit", () => {
    if (!isRecording) {
      return;
    }

    const event = arguments[0];
  });

  window.addEventListener("drum:hit", (event) => {
    if (!isRecording) {
      return;
    }

    beatQueue.push({
      key: event.detail.key,
      t: performance.now() - recordStart
    });

    recStatus.textContent = `Recording… ${beatQueue.length} beat(s)`;
  });

  playBtn.addEventListener("click", () => {
    if (isRecording || isPlaying || beatQueue.length === 0) {
      return;
    }

    const queue = [...beatQueue];
    const beatCount = queue.length;

    isPlaying = true;
    playBtn.disabled = true;
    recStatus.textContent = `Playing ${beatCount} beat(s)…`;

    while (queue.length > 0) {
      const beat = queue.shift();

      const timerId = window.setTimeout(() => {
        window.playSound(beat.key);
      }, beat.t);

      playbackTimers.push(timerId);
    }

    const lastBeatTime = beatCount > 0 ? beatQueue[beatCount - 1].t : 0;

    const completionTimer = window.setTimeout(() => {
      playbackTimers = [];
      isPlaying = false;
      recStatus.textContent = "Playback complete.";
      updatePlayButton();
    }, lastBeatTime);

    playbackTimers.push(completionTimer);
  });

  clearBtn.addEventListener("click", () => {
    clearPlaybackTimers();
    beatQueue.length = 0;
    isRecording = false;
    recordStart = 0;

    recBtn.setAttribute("aria-pressed", "false");
    recStatus.textContent = "Cleared.";
    playBtn.disabled = true;

    window.setTimeout(() => {
      recStatus.textContent = "";
    }, 0);
  });

  recBtn.setAttribute("aria-pressed", "false");
  playBtn.disabled = true;
  recStatus.textContent = "";
})();
