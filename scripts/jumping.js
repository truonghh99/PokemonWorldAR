/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

export const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Animation = require('Animation');
const pokemonList = ['Pikachu3d', 'Charmander3d', 'Bulbasaur3d', 'Spheal3d', 'Whimsicott3d'];

for (var pokemon of pokemonList) {
	Scene.root.findFirst(pokemon).then(jump);
}

function jump(object) {
	var baseDriverParameters = {
	  durationMilliseconds: 400,
	  loopCount: Infinity,
	  mirror: true
	};
	var driver = Animation.timeDriver(baseDriverParameters);
	var sampler = Animation.samplers.linear(0, 0.05);
	object.transform.y = Animation.animate(driver, sampler);
	driver.start();
}