/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

export const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Animation = require('Animation');
const Movements = require("./movements.js");
const TouchGestures = require('TouchGestures');

Scene.root.findFirst('Pikachu3d').then(Movements.parachute);

TouchGestures.onPan().subscribe(retrackPlane);

export function retrackPlane(gesture) {
	Scene.root.findFirst('planeTracker').then(function(planeTracker) {
		planeTracker.trackPoint(gesture.location, gesture.state);
	});
}

TouchGestures.onTap().subscribe(resetAllAnimation);

export function resetAllAnimation() {
	Diagnostics.log("Reset");
	Scene.root.findFirst('Pikachu3d').then(Movements.parachute);
}