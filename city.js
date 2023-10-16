import Building from "./classes/Building.js"
// map of 12x5
let cities = {
	abdul: [
		[0, 0, 0, 1, 0, 0, 0, 3, 2, 0, 0, 0],
		[4, 0, 0, 1, 0, 0, 3, 3, 0, 1, 0, 0],
		[0, 3, 0, 1, 0, 0, 2, 0, 0, 4, 0, 0],
		[0, 3, 0, 0, 0, 0, 0, 4, 0, 0, 0, 2],
		[0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
	],
	khalid: [
		[ 0, 0,13, 0, 0, 0, 0, 0,11, 0, 0, 0],
		[14, 0, 0, 0, 1, 0,14, 0, 0, 2, 1, 0],
		[ 0, 0, 3, 2, 0, 0, 0, 0, 0,11, 0, 2],
		[ 0, 0, 0, 0, 0, 0, 0, 0,13, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0,12],
		[ 0, 0, 0, 0,14, 0, 0, 2, 1, 0, 0, 3],
	],
	aisha:[
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	]
}

export default function createCity() {
	if(setting.enemy == 'aisha') canvas.style.backgroundImage = "url('./img/sea.png')";

	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 12; j++) {
			const element = cities[setting.enemy][i][j];
			if (element !== 0) {
				if (setting.enemy === 'khalid' && element > 10)
					Building.create(j * 100, i * 100, element - 10, true)

				else Building.create(j * 100, i * 100, element, false)

			}
		}
	}
	setting.theme = new Audio(`./sound/battleTheme-${setting.enemy}.mp3`);
	// setting.theme.muted = true;
	if (setting.sound && !canvas.hidden) setting.theme.play();
	setting.theme.volume = 0.15;
}