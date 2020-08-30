/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

export const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Animation = require('Animation');
const Movements = require("./movements.js");
const TouchGestures = require('TouchGestures');
const Instruction = require('Instruction');

export var effectState = 0;

export const FAR_LEFT_X = -0.5;
export const FAR_RIGHT_X = 0.5; 
export const TOP_Y = 1;
export const BOTTOM_Y = 0;
export const TOP_PARACHUTE_Y = 1.4;
export const BOTTOM_PARACHUTE_Y = 0.4;

TouchGestures.onTap().subscribe(moveToNextState);
TouchGestures.onPan().subscribe(retrackPlane);
Instruction.bind(true, 'tap_to_start'); 

export function moveVertically(object, begin, end) {
	var baseDriverParameters = {
	  durationMilliseconds: 1500,
	  loopCount: 1,
	  mirror: true
	};
	var driver = Animation.timeDriver(baseDriverParameters);
	var sampler = Animation.samplers.linear(begin, end);
	object.transform.y = Animation.animate(driver, sampler);

	driver.onCompleted().subscribe(function () {
    	bounce(object);
	});

	//object.hidden = false;

	driver.start();
}

export function parachute(object) {
	moveVertically(object, TOP_Y, BOTTOM_Y);
	Scene.root.findFirst('parachute').then((result) => moveVertically(result, TOP_PARACHUTE_Y, BOTTOM_PARACHUTE_Y));
}

export function bounce(object) {
	var baseDriverParameters = {
	  durationMilliseconds: 400,
	  loopCount: Infinity,
	  mirror: true
	};
	var driver = Animation.timeDriver(baseDriverParameters);
	var sampler = Animation.samplers.linear(object.transform.y.lastValue, object.transform.y.lastValue + 0.02);
	object.transform.y = Animation.animate(driver, sampler);
	driver.start();
}

export function retrackPlane(gesture) {
	Scene.root.findFirst('planeTracker').then(function(planeTracker) {
		planeTracker.trackPoint(gesture.location, gesture.state);
	});
}

export function moveToNextState() {
	switch (effectState) {
		case 0:
			showPikachuBack();
			break;
		case 1:
			showPikachuFront();
			break;
		case 2:
			switchCamera();
			break;
		default:
			break;
	}
	++effectState;
}

function showPikachuBack() {
	Scene.root.findFirst('pikachu').then(parachute);
}