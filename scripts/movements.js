/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

export const Diagnostics = require('Diagnostics');

const FAR_LEFT_X = -0.5;
const FAR_RIGHT_X = 0.5; 

const TOP_Y = 1.5;
const BOTTOM_Y = 0;

const TOP_PARACHUTE_Y = 1.9;
const BOTTOM_PARACHUTE_Y = 0.4;

const Scene = require('Scene');
const Animation = require('Animation');
const pokemonList = ['Bulbasaur3d', 'Spheal3d', 'Torchic3d', 'Fennec3d'];

Scene.root.findFirst('Pikachu3d').then(parachute);

Scene.root.findFirst('Charmander3d').then((result) => moveHorizontally(result, FAR_LEFT_X, FAR_RIGHT_X));

Scene.root.findFirst('Whimsicott3d').then((result) => moveHorizontally(result, FAR_RIGHT_X, FAR_LEFT_X));

for (var pokemon of pokemonList) {
	Scene.root.findFirst(pokemon).then(bounce);
}

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