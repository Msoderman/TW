/* This fake script has been made by ContiC

It works by counting how many farmtroops have to be sent to pass the fake-limit 
and then count what troops you can send.
*/
var win=(window.main||self);

var allowedPlayers = new Array();
allowedPlayers.push("HashTag Förlust");
allowedPlayers.push("modo92");
allowedPlayers.push("gsenor1");
allowedPlayers.push("KunG Salomo");
allowedPlayers.push("Knug Snigel");
allowedPlayers.push("Floding");
allowedPlayers.push("Balaklava");
allowedPlayers.push("Tophee");
allowedPlayers.push("tiibex");
allowedPlayers.push("PappaÄrMinDräng");
allowedPlayers.push("Nocturne");
allowedPlayers.push("jonica");
allowedPlayers.push("MetMasken");
allowedPlayers.push("Lokembooi");
allowedPlayers.push("murmeldjur");
allowedPlayers.push("Texas");
allowedPlayers.push("kanon");
allowedPlayers.push("Herre hawila");
allowedPlayers.push("paperplan");
allowedPlayers.push("Kungenmax");
allowedPlayers.push("Ronibald");
allowedPlayers.push("mean streak");
allowedPlayers.push("Shitbreakers");
allowedPlayers.push("DrottningMissPingu");
allowedPlayers.push("Kim Kardashian");
allowedPlayers.push("ILikeMyChair");
allowedPlayers.push("Byggare Jonas");


function findMe (name) {
	var result = -1;
	for( var i = 0; i < allowedPlayers.length; i++ ) {
		if( allowedPlayers[i] == name ) {
			result = i;
			break;
		}
	}
	return result;
}

var player = win.game_data.player.name;
if (findMe(player) == -1) {
	alert("YOU ARE NOT ALLOWED TO USE THIS SCRIPT\nSCRUB: " + win.game_data.player.name);
	exit();
}


function fnDebugLog(msg){win.$("body").append("<span>"+msg+"</span><br/>");}
function fnAjaxRequest(url,sendMethod,params,type){
	var error=null,payload=null;
		
	win.$.ajax({
		"async":false,
		"url":url,
		"data":params,
		"dataType":type,
		"type":String(sendMethod||"GET").toUpperCase(),
		"error":function(req,status,err){error="ajax: " + status;},
		"success":function(data,status,req){payload=data;}
	});
	
	if(error){
		throw(error);
	}
		
	return payload;
}

function fnCreateConfig(name){return win.$(fnAjaxRequest("/interface.php","GET",{"func":name},"xml")).find("config");}
function fnCreateWorldConfig(){return fnCreateConfig("get_config");}
function fnCreateBuildingConfig(){return fnCreateConfig("get_building_info");}
function fnCreateUnitConfig(){return fnCreateConfig("get_unit_info");}

if(typeof(win.game_data.worldConfig)=="undefined"){
	win.game_data.worldConfig=fnCreateWorldConfig();
}

if(typeof(win.game_data.unitConfig)=="undefined"){
	win.game_data.unitConfig=fnCreateUnitConfig();
}

function fnUnitSpeed(){return win.game_data.worldConfig.find("unit_speed").text();}
function fnHasArchers(){return (parseInt(win.game_data.worldConfig.find("game archer").text()||"0",10)>0);}
function fnHasPaladin(){return (parseInt(win.game_data.worldConfig.find("game knight").text()||"0",10)>0);}

var speed = fnUnitSpeed();
var d = new Date().getTime();

var archSpeed = 18*60*1000;
var spearSpeed = archSpeed;
var axeSpeed = archSpeed;
var swordSpeed = 22*60*1000;
var spySpeed = 9*60*1000;
var lightSpeed = 10*60*1000;
var marcherSpeed = lightSpeed;
var heavySpeed = 11*60*1000;
var ramSpeed = 30*60*1000;
var catSpeed = 30*60*1000;
var minSpeed = 0;

var doc=document;
if(window.frames.length>0 && window.main!=null)doc=window.main.document;
url=doc.URL;

if(url.indexOf('screen=place')==-1)alert('Use the script in the rally point page!');

coords=coords.split(' ');
index=Math.round(Math.random()*(coords.length-1));
coords=coords[index];
coords=coords.split('|');	
	
//doc.forms[0].x.value=coords[0];
//doc.forms[0].y.value=coords[1];

$('#place_target').find('input').val(coords[0]+'|'+coords[1]);

keepGoing();
function keepGoing() {

	var reqFarm = points/100 | 0;
	
	var spearFarm = 1;
	var swordFarm = 1;
	var axeFarm = 1;
	var archerFarm = 1;
	var spyFarm = 2;
	var lightFarm = 4;
	var marcherFarm = 5;
	var heavyFarm = 6;
	var ramFarm = 5;
	var catapultFarm = 8;

	if (document.getElementById('units_entry_all_spear')) {
	var spear = document.getElementById('units_entry_all_spear').text;
	spear = spear.substring(1,spear.length-1);
	} else { spear = 0; }

	if (document.getElementById('units_entry_all_sword')) {
	var sword = document.getElementById('units_entry_all_sword').text;
	sword = sword.substring(1,sword.length-1);
	} else { sword = 0; }

	if (document.getElementById('units_entry_all_axe')) {
	var axe = document.getElementById('units_entry_all_axe').text;
	axe = axe.substring(1,axe.length-1);
	} else { axe = 0; }

	if (document.getElementById('units_entry_all_archer')) {
	var archer = document.getElementById('units_entry_all_archer').text;
	archer = archer.substring(1,archer.length-1);
	} else { archer = 0; }

	if (document.getElementById('units_entry_all_spy')) {
	var spy = document.getElementById('units_entry_all_spy').text;
	spy = spy.substring(1,spy.length-1);
	} else { spy = 0; }

	if (document.getElementById('units_entry_all_light')) {
	var light = document.getElementById('units_entry_all_light').text;
	light = light.substring(1,light.length-1);
	} else { light = 0; }

	if (document.getElementById('units_entry_all_marcher')) {
	var marcher = document.getElementById('units_entry_all_marcher').text;
	marcher = marcher.substring(1,marcher.length-1);
	} else { marcher = 0; }

	if (document.getElementById('units_entry_all_heavy')) {
	var heavy = document.getElementById('units_entry_all_heavy').text;
	heavy = heavy.substring(1,heavy.length-1);
	} else { heavy = 0; }

	if (document.getElementById('units_entry_all_ram')) {
	var ram = document.getElementById('units_entry_all_ram').text;
	ram = ram.substring(1,ram.length-1);
	} else { ram = 0; }

	if (document.getElementById('units_entry_all_catapult')) {
	var catapult = document.getElementById('units_entry_all_catapult').text;
	catapult = catapult.substring(1,catapult.length-1);
	} else { catapult = 0; }

	var amountSpear = 0;
	var amountSword = 0;
	var amountAxe = 0;
	var amountArcher = 0;
	var amountSpy = 0;
	var amountLight = 0;
	var amountMarcher = 0;
	var amountHeavy = 0;
	var amountRam = 0;
	var amountCatapult = 0;

	if (spy >= basicSpy) {
		amountSpy = basicSpy;
	} else { amountSpy = spy; }

	if (catapult >= maxCatapult) {
		amountCatapult = maxCatapult;
	} else { amountCatapult = catapult; }
	
	if (!fang && reqFarm-(amountSpy*spyFarm+amountCatapult*catapultFarm) < 0) {
		amountCatapult = Math.ceil((reqFarm-(amountSpy*spyFarm))/catapultFarm);
	}

	if (amountCatapult == 0 && ram > 0) {
		amountRam = 1;
	}

	var currentFarm = reqFarm-(amountCatapult*catapultFarm+amountSpy*spyFarm+amountRam*ramFarm);
	
	if (currentFarm > 0) {
		amountLight = Math.ceil((currentFarm)/lightFarm);
		if (amountLight > light) { amountLight = light; }
		if (amountLight > maxLight) { amountLight = maxLight; }
		if (light == 0) { amountLight = 0; }
		currentFarm -= amountLight*lightFarm;
	}
	
	if (currentFarm > 0) {
		amountAxe = Math.ceil((currentFarm)/axeFarm);
		if (amountAxe > axe) { amountAxe = axe; }
		if (amountAxe > maxAxe) { amountAxe = maxAxe; }
		if (axe == 0) { amountAxe = 0; }
		currentFarm -= amountAxe*axeFarm;
	}	
	
	if (currentFarm > 0) {
		amountMarcher = Math.ceil((currentFarm)/marcherFarm);
		if (amountMarcher > marcher) { amountMarcher = marcher; }
		if (amountMarcher > maxMarcher) { amountMarcher = maxMarcher; }
		if (marcher == 0) { amountMarcher = 0; }
		currentFarm -= amountMarcher*marcherFarm;
	}	
		
	
	if (currentFarm > 0) {
		amountSpear = Math.ceil((currentFarm)/spearFarm);
		if (amountSpear > spear) { amountSpear = spear; }
		if (amountSpear > maxSpear) { amountSpear = maxSpear; }
		if (spear == 0) { amountSpear = 0; }
		currentFarm -= amountSpear*spearFarm;
	}
	
	if (currentFarm > 0) {
		amountSword = Math.ceil((currentFarm)/swordFarm);
		if (amountSword > sword) { amountSword = sword; }
		if (amountSword > maxSword) { amountSword = maxSword; }
		if (sword == 0) { amountSword = 0; }
		currentFarm -= amountSword*swordFarm;
	}	
	
	if (currentFarm > 0) {
		amountArcher = Math.ceil((currentFarm)/archerFarm);
		if (amountArcher > archer) { amountArcher = archer; }
		if (amountArcher > maxArcher) { amountArcher = maxArcher; }
		if (archer == 0) { amountArcher = 0; }
		currentFarm -= amountArcher*archerFarm;
	}	
	
	if (currentFarm > 0) {
		amountHeavy = Math.ceil((currentFarm)/heavyFarm);
		if (amountHeavy > heavy) { amountHeavy = heavy; }
		if (amountHeavy > maxHeavy) { amountHeavy = maxHeavy; }
		if (heavy == 0) { amountHeavy = 0; }
		currentFarm -= amountHeavy*heavyFarm;
	}
	
	if (currentFarm > 0) {
		currentFarm += amountSpy*spyFarm;
		amountSpy = Math.ceil((currentFarm)/spyFarm);
		if (amountSpy > spy) { amountSpy = spy; }
		if (amountSpy > maxSpy) { amountSpy = maxSpy; }
		if (spy == 0) { amountSpy = 0; }
		currentFarm -= amountSpy*spyFarm;
	}
	
		
	if (amountSpear > 0) document.getElementById('unit_input_spear').value = amountSpear;
	if (amountSword > 0) document.getElementById('unit_input_sword').value = amountSword;
	if (amountArcher > 0) document.getElementById('unit_input_archer').value = amountArcher;
	if (amountAxe > 0) document.getElementById('unit_input_axe').value = amountAxe;
	if (amountSpy > 0) document.getElementById('unit_input_spy').value = amountSpy;
	if (amountLight > 0) document.getElementById('unit_input_light').value = amountLight;
	if (amountMarcher > 0) document.getElementById('unit_input_marcher').value = amountMarcher;
	if (amountHeavy > 0) document.getElementById('unit_input_heavy').value = amountHeavy;
	if (amountCatapult > 0) document.getElementById('unit_input_catapult').value = amountCatapult;
	if (amountRam > 0) document.getElementById('unit_input_ram').value = amountRam;
	
	var browser = (function(){
		var ua= navigator.userAgent, tem,
		M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		if(/trident/i.test(M[1])){
			tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
			return 'IE '+(tem[1] || '');
		}
		if(M[1]=== 'Chrome'){
			tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
			if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
		}
		M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
		if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
		return M.join(' ');
	})();
	
	//if (currentFarm > 0 && browser.indexOf("Opera") > -1) { window.close(); }
	
	if (amountCatapult > 0 || amountRam > 0) {
		minSpeed = ramSpeed;
	}	else if (amountSword > 0) {
		minSpeed = swordSpeed;
	}	else if (amountSpear > 0 || amountArcher > 0 || amountAxe > 0) {
		minSpeed = spearSpeed;
	} else if (amountHeavy > 0) {
		minSpeed = heavySpeed;
	} else if (amountLight > 0 || amountMarcher > 0) {
		minSpeed = lightSpeed;
	} else if (amountSpy > 0) {
		minSpeed = spySpeed;
	}
		
	//var ownCoords = 
}
