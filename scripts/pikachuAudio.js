const Patches = require("Patches");
const Audio = require("Audio");
const FaceGestures = require("FaceGestures");
const FaceTracking = require("FaceTracking");

// Enables async/await in JS [part 1]

export var action = -1;

(async function () {
  //const signal = await Patches.outputs.getScalar("action");
  Patches.outputs.getScalar("action").then((event) => {
    event.monitor().subscribe(function (values) {
      action = values.newValue;
    });
  });
  //action = signal.pinLastValue();

  const face = FaceTracking.face(0);
  const hasMouthOpen = FaceGestures.hasMouthOpen(face);
  hasMouthOpen.onOn().subscribe(() => {
    playSound();
  });
})();

export function playSound() {
  switch (action) {
    case 0:
      Audio.getAudioPlaybackController("action1").then((playbackController) => {
        // Play  the playback controller
        playbackController.setPlaying(true);
        playbackController.reset();
      });

      break;

    case 1:
      Audio.getAudioPlaybackController("action2").then((playbackController) => {
        // Play  the playback controller
        playbackController.setPlaying(true);
        playbackController.reset();
      });
      break;
    case 2:
      Audio.getAudioPlaybackController("action3").then((playbackController) => {
        // Play  the playback controller
        playbackController.setPlaying(true);
        playbackController.reset();
      });
      break;
  }
}
