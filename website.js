const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth - 20;
canvas.height = innerHeight - 20;

const divSolider = document.getElementById('divSolider');
const soliders = [
	{
		code: 'ido',
		name: "עידו רז",
		desc: "עידו חושב שאת הכול אפשר לפתור בכוח, לא סתם המטוס שלו נקרא - שליחות קטלנית",
		img: "../img/website/Ido_Raz.jpg",
		adventages: ['מתקפת טילים קטלנית', 'מתמרן מהר בסיבובים'],
		disadventages: ['מטוס איטי', 'קיבולת של 40 טילים','טווח טילים קצר']
	},
	{
		code: 'saar',
		name: "סער לוי",
		desc: "סער תמיד נמצא צעד אחד לפני אוייביו, כאשר עבורו דיוק זה שם המשחק",
		img: "../img/website/Saar_Levi.jpg",
		adventages: ['טילים מתכווננים'],
		disadventages: ['מטוס איטי', 'קיבולת של 40 טילים']
	},
	{
		code: 'noah',
		name: "נועה הדר",
		desc: "נועה היא טייסת מסוק קרב מוכשרת, שמקוריות חשובה בשבילה הרבה יותר מציוד מתקדם",
		img: "../img/website/Noah_Hadar.jpg",
		adventages: ['מסוק קטן ומהיר', 'קיבולת של 150 טילים','טווח טילים ארוך'],
		disadventages: ['צריך לכוון']
	},
	{
		code: 'roi',
		name: "רועי שוורץ",
		desc: "רועי שוחר שלום מטבעו. הוא מאמין שההתקפה הכי טובה היא הגנה",
		img: "../img/website/Roi_Scwartz.jpg",
		adventages: ['בעל 6 לבבות', 'לא צריך כדורים'],
		disadventages: ['אין אפשרות לפגוע במדויק', 'רק 60 שניות של הגנה']
	},
	{
		code: 'cheater',
		name: "גיורא משה",
		desc: "גיורא הוא טייס אגדי. הוא חזר מהמתים כדי להוכיח שמוות זו לא סיבה לפרוש",
		img: "../img/website/Giyora_Moshe.jpg",
		adventages: ['הכול'],
		disadventages: ['אין']
	},

]
for (let i = 0; i < soliders.length; i++) {
	if (soliders[i].code === 'cheater') {
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
		adventages: ['חימוש מהיר וקטלני','טווח טילים ארוך'],
		disadventages: ['חיילים פשוטים בלבד']
	},
	{
		code:'khalid',
		name:'חאליד רהמן',
		desc:'חאליד הוא אלוף הלוחמה הבנויה. הוא משתקם מהר ובהפתעה',
		img:'../img/website/Khalid_Rahman.jpg',
		adventages: ['תותחים חזקים','משתקם במהירות'],
		disadventages: ['מעט יחידות','טווח טילים קצר']
	}

]
for (let i = 0; i < enemies.length; i++) {
	divEnemy.innerHTML += `<a class="dropdown-item" onclick="changeCharacter(${i},false)">${enemies[i].name}</a>`
}


const name = {
	player: '',
	enemy: ''
}

console.log(' ברכות, אתה מספיק חכם בשביל לפתוח את המסוף. תכניס דמות_סודית() בשביל לקבל את הדמות הסודית')

function דמות_סודית() {
	changeSol(4)
}

function changeCharacter(index,player){
	let id = player ? 'tzahal' : 'hamas';
	let list = player ? soliders : enemies;
	document.getElementById(id +'-name').innerHTML = list[index].name;
	document.getElementById(id +'-img').src = list[index].img;
	document.getElementById(id+'-img').alt = list[index].name;
	document.getElementById(id+'-desc').innerHTML = list[index].desc;

	document.getElementById(id+'-list').innerHTML = `<li class="list-group-item active">יתרונות</li>`;
	for (let el of list[index].adventages) {
		document.getElementById(id+'-list').innerHTML += `
		<li class="list-group-item">${el}</li>`
	}

	document.getElementById(id+'-list').innerHTML += `<li class="list-group-item bg-danger">חסרונות</li>`;
	for (let el of list[index].disadventages) {
		document.getElementById(id+'-list').innerHTML += `
		<li class="list-group-item">${el}</li>`
	}
	if(player){
		const RoiInst = document.getElementById('isRoi')
		if (soliders[index].code == 'roi') RoiInst.hidden = false;
		else RoiInst.hidden = true;
	}
	name[player?'player':'enemy'] = list[index].code
}
changeCharacter(0,true)
changeCharacter(0,false)


Math.randomBetween = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const setting = {
	score: 0,
	frame: 0,
	speedGame: 30,  //The game will be updated every 50 ms.
	lose: false,
	theme : new Audio('./sound/battleThemeA_0.mp3'),
	sound:false
}

setting.theme.muted = true;

const soundSwith = document.getElementById('soundSwith');
soundSwith.onchange = () => {
	setting.sound = !setting.sound;
}