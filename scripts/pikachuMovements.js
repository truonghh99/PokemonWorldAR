/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

export const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Animation = require('Animation');
const Movements = require("./movements.js");
const TouchGestures = require('TouchGestures');
const Instruction = require('Instruction');
const CameraInfo = require('CameraInfo');

export var effectState = 0;
export var camera = "BACK";

export const FAR_LEFT_X = -0.5;
export const FAR_RIGHT_X = 0.5; 
export const TOP_Y = 0.5;
export const BOTTOM_Y = 0;
export const TOP_PARACHUTE_Y = 0.9;
export const BOTTOM_PARACHUTE_Y = 0.4;

TouchGestures.onTap().subscribe(moveToNextState);
TouchGestures.onPan().subscribe(retrackPlane);
Scene.root.findFirst('sittingPikachu').then(hide);
Instruction.bind(true, 'tap_to_start'); 

CameraInfo.captureDevicePosition.monitor().subscribe(function (e) {
   camera = e.newValue;
   if (effectState === 2 && camera == "BACK") {
   		moveToNextState();
   }
});

export function reset() {
	Scene.root.findFirst('sittingPikachu').then(hide);
	Scene.root.findFirst('planeTracker').then(hide);
	Instruction.bind(true, 'tap_to_start');
	effectState = 0;
}

export function moveVertically(object, begin, end) {
	var baseDriverParameters = {
	  durationMilliseconds: 1000,
	  loopCount: 1,
	  mirror: true
	};
	var driver = Animation.timeDriver(baseDriverParameters);
	var sampler = Animation.samplers.linear(begin, end);
	object.transform.y = Animation.animate(driver, sampler);

	driver.onCompleted().subscribe(function () {
    	bounce(object);
	});
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
			Instruction.bind(true, 'tap_to_advance'); 
			break;
		case 1:
			showPikachuFront();
			Instruction.bind(true, 'flip_camera');
			break;
		case 2:
			Instruction.bind(true, 'find_face');
			break;
		default:
			break;
	}
	++effectState;
}

function showPikachuBack() {
	Scene.root.findFirst('pikachu').then(parachute);
}

function showPikachuFront() {
	Scene.root.findFirst('planeTracker').then(hide);
	Scene.root.findFirst('sittingPikachu').then(show);
}

function hide(object) {
	object.hidden = true;
}

function show(object) {
	object.hidden = false;
}