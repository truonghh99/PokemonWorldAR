/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

export const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Animation = require('Animation');
const pokemonList = ['Pikachu3d', 'Charmander3d', 'Bulbasaur3d', 'Spheal3d', 'Whimsicott3d'];

Scene.root.findFirst('Pikachu3d').then((result) => moveVertically(result, 1.5, -0.5));
Scene.root.findFirst('Parachute3d').then((result) => moveVertically(result, 1.9, -0.2));

Scene.root.findFirst('Charmander3d').then((result) => moveHorizontally(result, -0.5, 0.5));

function moveHorizontally(object, begin, end) {
	var baseDriverParameters = {
	  durationMilliseconds: 4000,
	  loopCount: 10,
	  mirror: true
	};
	var driver = Animation.timeDriver(baseDriverParameters);
	var sampler = Animation.samplers.linear(begin, end);
	object.transform.x = Animation.animate(driver, sampler);
	driver.start();
}

function moveVertically(object, begin, end) {
	var baseDriverParameters = {
	  durationMilliseconds: 3000,
	  loopCount: 10,
	  mirror: true
	};
	var driver = Animation.timeDriver(baseDriverParameters);
	var sampler = Animation.samplers.linear(begin, end);
	object.transform.y = Animation.animate(driver, sampler);

	driver.start();
}