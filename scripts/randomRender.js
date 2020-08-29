/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

export const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Animation = require('Animation');
const Movements = require("./movements.js");
const TouchGestures = require('TouchGestures');
const pokemonList = ['Bulbasaur3d', 'Spheal3d', 'Torchic3d', 'Fennec3d'];

Scene.root.findFirst('Pikachu3d').then(Movements.parachute);
Scene.root.findFirst('Charmander3d').then((result) => Movements.moveHorizontally(result, Movements.FAR_LEFT_X, Movements.FAR_RIGHT_X));
Scene.root.findFirst('Whimsicott3d').then((result) => Movements.moveHorizontally(result, Movements.FAR_RIGHT_X, Movements.FAR_LEFT_X));

for (var pokemon of pokemonList) {
	Scene.root.findFirst(pokemon).then(Movements.bounce);
}

TouchGestures.onPan().subscribe(trackPlane);

export function trackPlane(gesture) {
	Scene.root.findFirst('planeTracker').then(function(planeTracker) {
		planeTracker.trackPoint(gesture.location, gesture.state);
	});
}