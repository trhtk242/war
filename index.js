import {setup,loop} from './game.js'

const opening = document.getElementById('opening-screen')
const button = document.getElementById('btn-start')


button.onclick = () => {
	opening.hidden = true;
	canvas.hidden = false;
	setup();
}

const portrait = window.matchMedia("(orientation: portrait)").matches;
if (portrait) {
	Swal.fire({
		icon: 'error',
		title: '...אופס',
		text: 'אנא סובב את הטלפון למצב אנכי',
	})
}

window.addEventListener("resize", (event) => {
	canvas.width = innerWidth - 20;
	canvas.height = innerHeight - 20;

	setting.SCALE = canvas.width / 1260;
});


setup();

let game  = setInterval(()=>{
	loop();
},setting.speedGame)
