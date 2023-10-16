const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const soundSwith = document.getElementById('soundSwith');

canvas.width = innerWidth - 20;
canvas.height = innerHeight - 20;

const sound = document.cookie
	.split("; ")
	.find((row) => row.startsWith("sound="))
	?.split("=")[1];

soundSwith.checked = !(/^false$/i.test(sound));

const setting = {
	score: 0,
	frame: 0,
	speedGame: 30,  //The game will be updated every 50 ms.
	lose: false,
	theme: new Audio('./sound/battleTheme-abdul.mp3'),
	sound : (sound) ? sound : true,
	player: '',
	enemy: '',
	SCALE: canvas.width / 1260,
	controllers: []
}


const divSolider = document.getElementById('divSolider');
const soliders = [
	{
		code: 'ido',
		name: "עידו רז",
		desc: "עידו חושב שאת הכול אפשר לפתור בכוח, לא סתם המטוס שלו נקרא - שליחות קטלנית",
		img: "../img/website/Ido_Raz.jpg",
		adventages: ['מתקפת טילים קטלנית', 'מתמרן מהר בסיבובים'],
		disadventages: ['מטוס איטי', 'קיבולת של 40 טילים', 'טווח טילים קצר']
	},
	{
		code: 'noah',
		name: "נועה הדר",
		desc: "נועה היא טייסת מסוק קרב מוכשרת, שמקוריות חשובה בשבילה הרבה יותר מציוד מתקדם",
		img: "../img/website/Noah_Hadar.jpg",
		adventages: ['מסוק קטן ומהיר', 'קיבולת של 150 טילים', 'טווח טילים ארוך'],
		disadventages: ['צריך לכוון']
	},
	{
		code: 'saar',
		name: "סער לוי",
		desc: "סער תמיד נמצא צעד אחד לפני אוייביו, כאשר עבורו דיוק זה שם המשחק",
		img: "../img/website/Saar_Levi.jpg",
		adventages: ['טילים מתכווננים'],
		disadventages: ['מטוס איטי']
	},
	{
		code: 'boaz',
		name: "בעז שוורץ",
		desc: "בעז שוחר שלום מטבעו. הוא מאמין שההתקפה הכי טובה היא הגנה",
		img: "../img/website/Boaz_Scwartz.jpg",
		adventages: ['בעל 5 לבבות', 'לא צריך כדורים'],
		disadventages: ['אין אפשרות לפגוע במדויק', 'רק 60 שניות של הגנה']
	},
	{
		code: 'giora',
		name: "גיורא משה",
		desc: "גיורא הוא טייס אגדי. הוא חזר מהמתים כדי להוכיח שמוות זו לא סיבה לפרוש",
		img: "../img/website/Giora_Moshe.jpg",
		adventages: ['הכול'],
		disadventages: ['אין']
	},
	{
		code:'yehoka',
		name:'יהוקפץ עוז',
		desc: 'יהוקפץ בכלל אסטרונאוט שנשלח לתגבורת. החללית שלו משנה את כללי המשחק',
		img: '../img/website/Yehoka_oz.jpg',
		adventages:['יריות חזקות ומסוכנות','קופץ בגבולות המפה'],
		disadventages:['חללית איטית','צריך לכוון']
	},
	{
		code:'winner',
		name:'רועי שטיין',
		desc: 'רועי טייס עקשן שמכור לטיסה. השם שלו נישא בהערצה גם בפי חבריו וגם בפי אוייביו',
		img: '../img/website/Roi_Stein.jpg',
		adventages:['כדורים נטענים אוטומתית','מטוס קטן ומהיר'],
		disadventages:['צריך לכוון']
	}

]
for (let i = 0; i < soliders.length; i++) {
	if (soliders[i].code === 'giora') {
		divSolider.innerHTML += `<!--<a class="dropdown-item" onclick="changeCharacter(${i},true)">${soliders[i].name}</a> -->`
		continue;
	}
	divSolider.innerHTML += `<a class="dropdown-item" onclick="changeCharacter(${i},true)">${soliders[i].name}</a>`
}

const divEnemy = document.getElementById('divEnemy');
const enemies = [
	{
		code: 'abdul',
		name: "עבדול מאליק",
		desc: "עבדול מומחה בטילי קרקע אוויר. הכוחות שלו הם חתיכת כאב ראש",
		img: "../img/website/Abdul_Malik.jpg",
		adventages: ['חימוש מהיר וקטלני', 'טווח טילים ארוך'],
		disadventages: ['חיילים פשוטים בלבד']
	},
	{
		code: 'khalid',
		name: 'חאליד רהמן',
		desc: 'חאליד הוא אלוף הלוחמה הבנויה. הוא משתקם מהר ובהפתעה',
		img: '../img/website/Khalid_Rahman.jpg',
		adventages: ['תותחים חזקים', 'משתקם במהירות'],
		disadventages: ['מעט יחידות', 'טווח טילים קצר']
	},
	{
		code: 'aisha',
		name: 'עיישה אלדין',
		desc: 'מאז ומעולם עיישה אהבה את הים. זהו ביתה השני ושם היא כמעט בלתי מנוצחת',
		img: '../img/website/Aisha_AlDin.jpg',
		adventages: ['תותחים חזקים', 'משתקם במהירות'],
		disadventages: ['מעט יחידות', 'טווח טילים קצר']
	},

]
for (let i = 0; i < enemies.length; i++) {
	divEnemy.innerHTML += `<a class="dropdown-item" onclick="changeCharacter(${i},false)">${enemies[i].name}</a>`
}

function* charGenerator(x) {
	for (let i = 0; i < x; i++)
		yield;
	changeCharacter(4, true);
	gen = charGenerator(1);
}
let gen = charGenerator(1);

function changeCharacter(index, player) {
	let id = player ? 'tzahal' : 'hamas';
	let list = player ? soliders : enemies;
	document.getElementById(id + '-name').innerHTML = list[index].name;
	document.getElementById(id + '-img').src = list[index].img;
	document.getElementById(id + '-img').alt = list[index].name;
	document.getElementById(id + '-desc').innerHTML = list[index].desc;

	const info = document.createElement('ul');
	info.innerHTML = `<li class="list-group-item active">יתרונות</li>`;
	for (let el of list[index].adventages) {
		info.innerHTML += `<li class="list-group-item">${el}</li>`
	}

	info.innerHTML += `<li class="list-group-item bg-danger">חסרונות</li>`;
	for (let el of list[index].disadventages) {
		info.innerHTML += `<li class="list-group-item">${el}</li>`
	}

	document.getElementById(id + '-info').onclick = () => {
		Swal.fire({
			icon: 'info',
			title: list[index].name,
			html: info,
			confirmButtonText: 'אחלה'
		})
	}




	if (player) {
		const boazInst = document.getElementById('isboaz')
		if (soliders[index].code == 'boaz') boazInst.hidden = false;
		else boazInst.hidden = true;
	}
	setting[player ? 'player' : 'enemy'] = list[index].code
}
changeCharacter(0, true)
changeCharacter(0, false)


Math.randomBetween = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


setting.theme.muted = true;

soundSwith.onchange = () => {
	setting.sound = !setting.sound;
	document.cookie = `sound=${setting.sound}`	
	const sound = document.cookie
	.split("; ")
	.find((row) => row.startsWith("sound="))
	?.split("=")[1];

soundSwith.checked = (/^true$/i.test(sound));
}