let r,g,b,kotak,data,tempat,warna,hitamb;
hitamb = 1;
kotak = document.getElementById("ktk");
data = document.getElementById("data");
tempat = document.getElementById("tempat");
let prima = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127];
tmpl();

function getHex(value){
var hex = parseInt(value).toString(16);
return hex.length == 1 ? "0" + hex : hex;
}

function tmpl(){
r = document.getElementById("r").value;
g = document.getElementById("g").value;
b = document.getElementById("b").value;
warna = "#" + getHex(r) + getHex(g) + getHex(b);
var isi = "("+r+","+g+","+b+") "+warna;
kotak.style.backgroundColor = warna;
data.innerHTML = isi;
}

function perbandingan(){
	var kpkper = kpk(pysn(r),pysn(g),pysn(b));
	var perb = (parseInt(r)/kpkper)+":"+(parseInt(g)/kpkper)+":"+(parseInt(b)/kpkper);
	var isi = " && Perbandingan = "+perb;
	data.innerHTML += isi;
	return perb;

}

function property(element){
	element.innerHTML = element.style.backgroundColor;
}

function clearpp(element){
	element.innerHTML = "";
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

function optimal(){
	document.getElementById("r").value = opfunc(r);
	document.getElementById("g").value = opfunc(g);
	document.getElementById("b").value = opfunc(b);
	tmpl();
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

let selectedColor = [];
function propClick(el){
	var dataWarna = el.style.backgroundColor;
	var a = dataWarna.substr(4);
	a = a.replace(")","");
	const dataWar = a.split(",");
	document.getElementById("r").value = parseInt(dataWar[0]);
	document.getElementById("g").value = parseInt(dataWar[1]);
	document.getElementById("b").value = parseInt(dataWar[2]);
	selectedColor = dataWar.map(parseFloat);
	tmpl();
}
function ambil(){
var div = "<td><div style='width: 75px;height: 75px;background-color: "+warna+"' onclick='propClick(this)' onmouseover='property(this)' onmouseout='clearpp(this)'></div></td>";
if(hitamb%10==0){

}
tempat.innerHTML += div;
hitamb++;
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

function inArray(arr,x){
	let has = false;
	for(let a of arr){
		if(a==x){
			has = true;
		}
	}
	return has;
}

function kpk(){
	var daf = arguments;
	var kpki = [1];
	for(let b of daf[0]){
		if(!inArray(kpki,b)){
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

let JumlahWarna = [0,0,0];
var banyakJumlah = 0;
function tambah(){
	var div = "<td>"+JSON.stringify(selectedColor,null,1)+"</td>";
document.getElementById("tambah").innerHTML += div;
	JumlahWarna = JumlahWarna.map(tambahkan);
	y=0;
	banyakJumlah++;
	var jw = JumlahWarna.map(x => parseInt(x/banyakJumlah));
	document.getElementById("jumlah").innerHTML=jw;
	var warnaCampur = "#" + getHex(jw[0]) + getHex(jw[1]) + getHex(jw[2]);
	document.getElementById("jlhwarna").innerHTML="<td><div style='width: 75px;height: 75px;background-color: "+warnaCampur+"' onclick='propClick(this)' onmouseover='property(this)' onmouseout='clearpp(this)'></div></td>";
}
y = 0;
function tambahkan(x){
	var c = selectedColor[y];
	y++
	return x+c;
}