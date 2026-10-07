(() => {
  const pads = document.querySelectorAll(".drum-pad");

  if (!pads.length) {
    return;
  }

  const padMap = new Map(
    [...pads].map((pad) => [pad.dataset.key, pad])
  );

  const playSound = (key) => {
    const pad = padMap.get(key);

    if (!pad) {
      return;
    }

    const audio = new Audio(pad.dataset.sound);
    audio.play().catch(() => {});

    pad.classList.add("active");
    setTimeout(() => {
      pad.classList.remove("active");
    }, 120);

    window.dispatchEvent(
      new CustomEvent("drum:hit", {
        detail: { key }
      })
    );
  };

  window.playSound = playSound;

  pads.forEach((pad) => {
    pad.addEventListener("click", () => {
      playSound(pad.dataset.key);
    });
  });
})();
