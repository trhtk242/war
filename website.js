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
		disadventages: ['מטוס איטי', 'קיבולת של 40 טילים']
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
		adventages: ['מסוק קטן ומהיר', 'קיבולת של 180 טילים'],
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
		adventages: ['טילים מתכווננים', 'קיבולית של אינסוף טילים', '100 חיים'],
		disadventages: ['אין']
	},

]


for (let i = 0; i < soliders.length; i++) {
	if (soliders[i].code === 'cheater') {
		divSolider.innerHTML += `<!--<a class="dropdown-item" onclick="changeSol(${i})">${soliders[i].name}</a> -->`
		continue;
	}
	divSolider.innerHTML += `<a class="dropdown-item" onclick="changeSol(${i})">${soliders[i].name}</a>`
}
const name = {
	player: '',
	enemy: 'abdul'
}

console.log(' ברכות, אתה מספיק חכם בשביל לפתוח את המסוף. תכניס דמות_סודית() בשביל לקבל את הדמות הסודית')

function דמות_סודית() {
	changeSol(4)
}



function changeSol(index) {
	document.getElementById('tzahal-name').innerHTML = soliders[index].name;
	document.getElementById('tzahal-img').src = soliders[index].img;
	document.getElementById('tzahal-img').alt = soliders[index].name;
	document.getElementById('tzahal-desc').innerHTML = soliders[index].desc;

	document.getElementById('tzahal-list').innerHTML = `<li class="list-group-item active">יתרונות</li>`;
	for (let el of soliders[index].adventages) {
		document.getElementById('tzahal-list').innerHTML += `
		<li class="list-group-item">${el}</li>
		`
	}
	document.getElementById('tzahal-list').innerHTML += `<li class="list-group-item bg-danger">חסרונות</li>`;
	for (let el of soliders[index].disadventages) {
		document.getElementById('tzahal-list').innerHTML += `
		<li class="list-group-item">${el}</li>
		`
	}
	const RoiInst = document.getElementById('isRoi')
	if (soliders[index].code == 'roi') RoiInst.hidden = false;
	else RoiInst.hidden = true;
	name.player = soliders[index].code;
}
changeSol(0)

Math.randomBetween = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const setting = {
	score: 0,
	frame: 0,
	speedGame: 30,  //The game will be updated every 50 ms.
	lose: false,
	theme : new Audio('./sound/battleThemeA_0.mp3')
}