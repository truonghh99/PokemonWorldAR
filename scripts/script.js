// Load in the required modules
/*

const FaceTracking = require("FaceTracking");
const Reactive = require("Reactive");
const Diagnostics = require("Diagnostics");
const Audio = require("Audio");

// Load in the patches module
const Patches = require("Patches");

// Get the 'myText' string from the Patch Editor

// Store a reference to the mouth openness of a detected face which returns a ScalarSignal
(async function () {
  // Get the 'myString' string value from the Patch Editor
  let pokemon = await Patches.outputs.getScalar("Pokemon");
  if (pokemon.gt(0)) {
    if (FaceTracking.face(0).mouth.openness.gt(0.2)) {
      Audio.getAudioPlaybackController("bulbasaur").then(
        (playbackController) => {
          // Play and loop the playback controller
          playbackController.setPlaying(true);
        }
      );
    }
  }

  Diagnostics.watch("Mouth Openness - ", FaceTracking.face(0).mouth.openness);
  Diagnostics.watch("Pokemon - ", pokemon);

  // Enable async/await in JS [part 2]
})();
*/
