import {player} from '../game.js'

export default class Circle{
	constructor(x, y, r,type) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.type = type;
		
		switch(this.type){
			case 'right':
				this.onclick = ()=> player.rotate = player.rotateAmount;
				this.stopclick = () => player.rotate = 0;
				break;
			case 'left':
				this.onclick = ()=> player.rotate = -player.rotateAmount;
				this.stopclick = () => player.rotate = 0;
				break;
			case 'shoot':
				this.onclick = ()=> player.shoot();
				this.stopclick = () => {}
		}

	}

	click(x, y) {
		let dis = Math.sqrt((this.y-y)**2+(this.x-x)**2);
		if(dis <= this.r)this.onclick()
	}

	onstopclick(x, y) {

		let dis = Math.sqrt((this.y-y)**2+(this.x-x)**2);
		if(dis <= this.r)this.stopclick()
	}

	draw(ctx){
		ctx.save();
		ctx.fillStyle = "#696969"
		ctx.beginPath();
		ctx.globalAlpha = 0.6;
		ctx.arc(this.x,this.y,this.r, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();

		ctx.fillStyle = "#000000"
		ctx.globalAlpha = 1;
		let d = 17 * setting.SCALE
		switch(this.type){
			case 'right':
				ctx.fillText('➡️',this.x +d,this.y +d)
				break;
			case 'left':
				ctx.fillText('⬅️',this.x +d,this.y +d)
				break;
			case 'shoot':
				ctx.fillText('🔥',this.x +d,this.y+d)

		}
		
		ctx.restore();
	}
}