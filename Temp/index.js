let liveR, liveG, liveB;
const kotak = document.getElementById("ktk");
const data = document.getElementById("data");
const tempat = document.getElementById("tempat");
let prima = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127];
let colorList = [];
tmpl();

class campurWarna{
	constructor(RGBarr){
		RGBarr = RGBarr.map(parseFloat);
		var r,g,b;
		[r,g,b] = RGBarr;
		this.basic = [r,g,b];
		this.total = [r,g,b];
		this.r = r;
		this.g = g;
		this.b = b;
		this.hex = "#" + getHex(this.r) + getHex(this.g) + getHex(this.b);
		this.perRGB = perbandingan(r,g,b);
		this.count = 1;
		this.colorArr = [];
		this.colorArr.push(this.basic);
	}
	tambah(RGBarr){
		RGBarr = RGBarr.map(parseFloat);
		var r,g,b;
		[r,g,b] = RGBarr;
		this.colorArr.push(RGBarr);
		this.count++;
		this.total[0] += r;
		this.total[1] += g;
		this.total[2] += b;
		this.r =  this.total[0]/this.count;
		this.g =  this.total[1]/this.count;
		this.b =  this.total[2]/this.count;
		this.hex = "#" + getHex(this.r) + getHex(this.g) + getHex(this.b);
		this.perRGB = perbandingan(this.r,this.g,this.b);
	}
	optimal(){
		this.r = opfunc(this.r.toString());
		this.g = opfunc(this.g.toString());
		this.b = opfunc(this.b.toString());
		this.perRGB = perbandingan(this.r,this.g,this.b);
	}
	RGB(){
		return [this.r,this.g,this.b];
	}
	toWarna(){
		return new warna(this.RGB());
	}
	reset(){
		this.count = 1;
		this.colorArr = [];
		this.r = this.basic[0];
		this.g = this.basic[1];
		this.b = this.basic[2];
	}
}

class warna{
	constructor(RGBarr){
		RGBarr = RGBarr.map(parseFloat);
		var r,g,b;
		[r,g,b] = RGBarr;
		this.r = r;
		this.g = g;
		this.b = b;
		this.hex = "#" + getHex(this.r) + getHex(this.g) + getHex(this.b);
		this.perRGB = perbandingan(r,g,b);
	}
	optimal(){ 
		this.r = opfunc(this.r.toString());
		this.g = opfunc(this.g.toString());
		this.b = opfunc(this.b.toString());
		this.perRGB = perbandingan(r,g,b);
	}
	RGB(){
		return [this.r,this.g,this.b];
	}
}

function getHex(value){
var hex = parseInt(value).toString(16);
return hex.length == 1 ? "0" + hex : hex;
}

function getCurrentRGB(){
	liveR = document.getElementById("r").value;
	liveG = document.getElementById("g").value;
	liveB = document.getElementById("b").value;
	return [liveR,liveG,liveB];
}

function ambil(){
	var xw = new warna(getCurrentRGB());
	colorList.push(xw);
	var nCL_now = colorList.length - 1;
	const div = "<td><div style='width: 75px;height: 75px;background-color: "+xw.hex+"' onclick='propClick("+nCL_now+")' onmouseover='property(this,"+nCL_now+")' onmouseout='clearpp(this)'></div></td>"; 
	tempat.innerHTML += div;
}
//
function perbandingan(rx,gx,bx){
	var kpkper = kpk(pysn(rx),pysn(gx),pysn(bx));
	var perb = [(parseInt(rx)/kpkper),(parseInt(gx)/kpkper),(parseInt(bx)/kpkper)];
	return perb;

}
let select;

function propClick(data){
	objWarna = colorList[data];
	document.getElementById("r").value = objWarna.r;
	document.getElementById("g").value = objWarna.g;
	document.getElementById("b").value = objWarna.b;
	select = data;
	tmpl();
}

function opfunc(dwar){
	var dp = parseInt(dwar.split("")[dwar.length-1]);
	var intd = parseInt(dwar);
	if(dp>=0 && dp<=2){
		return intd-dp;
	}else if(dp>=3&&dp<=7){
		return intd+(5-dp);
	}else if(dp>=8){
		return intd+(10-dp);
	}
}


function tmpl(){
r = document.getElementById("r").value;
g = document.getElementById("g").value;
b = document.getElementById("b").value;
var rna = "#" + getHex(r) + getHex(g) + getHex(b);
var isi = "("+r+","+g+","+b+") "+rna;
kotak.style.backgroundColor = rna;
data.innerHTML = isi;
}



function property(element,data){
	var dw = colorList[data];
	element.innerHTML = dw.RGB();
}

function clearpp(element){
	element.innerHTML = "";
}



function optimalb(){
	optimal();
	var has = perbandingan();
	has = has.split(":");
	var hr,hg,hb;
	hr = opfunc(has[0]);
	hg = opfunc(has[1]);
	hb = opfunc(has[2]);
	var hasper = 5;
	var er = (hr/hasper);
	var kali = parseInt(parseInt(r)/er);
	var ge = (hg/hasper);
	var be = (hb/hasper);
	document.getElementById("r").value = er*kali;
	document.getElementById("g").value = ge*kali;
	document.getElementById("b").value = be*kali;
	tmpl();perbandingan();
}


function pysn(bil){
	let kpka=[];
	if(bil==0){
		return [];
	}
	for(let x of prima){
		while(bil%x==0){
			bil /= x;
			kpka.push(x);
		}
	}
	return kpka;
}

function kpk(){
	var daf = arguments;
	var kpki = [1];
	for(let b of daf[0]){
		if(!kpki.includes(b)){
			kpki.push(b);
		}
	}
	var panjang = arguments.length;
	var banyak = [];
	for(let ob = 0;ob < panjang;ob++){
		if(!daf[ob][0]){continue;}
		for(let fil = 0; fil< kpki.length;fil++){
			if(!banyak[fil]){banyak.push([]);}
			var pan = daf[ob].filter(x=>x==kpki[fil]).length;
				banyak[fil].push(pan);
		}
	}
	var has = 1;
	for(let ish = 0; ish<banyak.length;ish++){
		var ban = Math.min.apply(null,banyak[ish]);
		while(ban>0){
			has *= kpki[ish];
			ban--;
		}
	}
	return has;
}

