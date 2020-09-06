const Patches = require("Patches");
const Audio = require("Audio");
const FaceGestures = require("FaceGestures");
const FaceTracking = require("FaceTracking");
const CameraInfo = require("CameraInfo");

// Enables async/await in JS [part 1]

export var action = -1;
export var camera = "BACK";

(async function () {
  Patches.outputs.getScalar("action").then((event) => {
    event.monitor().subscribe(function (values) {
      action = values.newValue;
    });
  });

  CameraInfo.captureDevicePosition.monitor().subscribe(function (e) {
    camera = e.newValue;
  });
  const face = FaceTracking.face(0);
  const hasMouthOpen = FaceGestures.hasMouthOpen(face);
  hasMouthOpen.onOn().subscribe(() => {
    playSound();
  });
})();

export function playSound() {
  if (camera === "FRONT") {
    playPikachuSounds();
  }

  if (camera === "BACK") {
    playPokemonSounds();
  }
}

export function playPokemonSounds() {
  switch (action) {
    case 0:
      Audio.getAudioPlaybackController("bulbasaur").then(
        (playbackController) => {
          // Play  the playback controller
          playbackController.setPlaying(true);
          playbackController.reset();
        }
      );

      break;

    case 1:
      Audio.getAudioPlaybackController("squirtle").then(
        (playbackController) => {
          // Play  the playback controller
          playbackController.setPlaying(true);
          playbackController.reset();
        }
      );

      break;
    case 2:
      Audio.getAudioPlaybackController("charmander").then(
        (playbackController) => {
          // Play  the playback controller
          playbackController.setPlaying(true);
          playbackController.reset();
        }
      );
      break;
    case 3:
      Audio.getAudioPlaybackController("eevee").then((playbackController) => {
        // Play  the playback controller
        playbackController.setPlaying(true);
        playbackController.reset();
      });
      break;
  }
}

export function playPikachuSounds() {
  let reaction = getRandomIntInclusive(0, 2);

  switch (reaction) {
    case 0:
      Audio.getAudioPlaybackController("pikachu1").then(
        (playbackController) => {
          // Play  the playback controller
          playbackController.setPlaying(true);
          playbackController.reset();
        }
      );

      break;

    case 1:
      Audio.getAudioPlaybackController("pikachu2").then(
        (playbackController) => {
          // Play  the playback controller
          playbackController.setPlaying(true);
          playbackController.reset();
        }
      );

      break;
    case 2:
      Audio.getAudioPlaybackController("pikachu3").then(
        (playbackController) => {
          // Play  the playback controller
          playbackController.setPlaying(true);
          playbackController.reset();
        }
      );
      break;
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
