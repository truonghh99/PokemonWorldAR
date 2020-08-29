/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

export const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Animation = require('Animation');

export const FAR_LEFT_X = -0.5;
export const FAR_RIGHT_X = 0.5; 
export const TOP_Y = 1.5;
export const BOTTOM_Y = 0;
export const TOP_PARACHUTE_Y = 1.8;
export const BOTTOM_PARACHUTE_Y = 0.4;

export function moveHorizontally(object, begin, end) {
	var baseDriverParameters = {
	  durationMilliseconds: 4000,
	  loopCount: Infinity,
	  mirror: true
	};
	var driver = Animation.timeDriver(baseDriverParameters);
	var sampler = Animation.samplers.linear(begin, end);
	object.transform.x = Animation.animate(driver, sampler);
	driver.start();
}

export function moveVertically(object, begin, end) {
	var baseDriverParameters = {
	  durationMilliseconds: 3000,
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
	Scene.root.findFirst('Parachute3d').then((result) => moveVertically(result, TOP_PARACHUTE_Y, BOTTOM_PARACHUTE_Y));
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