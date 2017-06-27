var doc=(window.frames.length>0)?window.main.document:document;
table=doc.getElementById("commands_table");

var snipe = prompt("Snipelayout? (y/n)", "n"); 

var villages = [[]];
var spear, sword, axe, scout, lc, hc, ram, cat, noble, coord;
var op = 0;
var first = true;

var win=(window.main||self);
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
	
function fnHasArchers(){return (parseInt(win.game_data.worldConfig.find("game archer").text()||"0",10)>0);}
function fnHasPaladin(){return (parseInt(win.game_data.worldConfig.find("game knight").text()||"0",10)>0);}

var hasPaladin = fnHasPaladin();
var hasArchers = fnHasArchers();

function overView(){

	var eleTrs=table.rows;
	var headers=eleTrs[0].getElementsByTagName("th");
	
	function getHeader(ele){
		for(j=0;j<headers.length;j++){
			if(headers[j].innerHTML.match(ele))return j;
		}
	}
	
	var g=$('a.rename-icon').get(),n=g.length,newName="";
	
	for(var i=0;i<n;i++){
		g[i].click();
		y=$('.quickedit-edit input').get();
		k=y[i].value;
			
		if(k.match(/Assistans/i)){
			spear=parseInt(eleTrs[i+1].cells[getHeader('spear')].innerHTML);
			sword=parseInt(eleTrs[i+1].cells[getHeader('sword')].innerHTML);
			axe=parseInt(eleTrs[i+1].cells[getHeader('axe')].innerHTML);
			scout=parseInt(eleTrs[i+1].cells[getHeader('spy')].innerHTML);
			lc=parseInt(eleTrs[i+1].cells[getHeader('light')].innerHTML);
			hc=parseInt(eleTrs[i+1].cells[getHeader('heavy')].innerHTML);
			ram=parseInt(eleTrs[i+1].cells[getHeader('ram')].innerHTML);
			cat=parseInt(eleTrs[i+1].cells[getHeader('catapult')].innerHTML);
			noble=parseInt(eleTrs[i+1].cells[getHeader('snob')].innerHTML);
			coord=k.match(/\d+\|\d+/g);
			arrival=eleTrs[i+1].cells[getHeader('command_date_arrival')].innerHTML;
			
			if (findMe(coord) == -1 || snipe == "y") {
				villages.push(coord);
				p = villages.length-1;
				villages[p].push(arrival);
				villages[p].push(arrival);
				villages[p].push(spear);
				villages[p].push(sword);
				villages[p].push(axe);
				villages[p].push(scout);
				villages[p].push(lc);
				villages[p].push(hc);
				villages[p].push(ram);
				villages[p].push(cat);
				villages[p].push(noble);
				first = false;
			} else if (findMe(coord) > -1) {
				var p = findMe(coord);
				villages[p][2] = arrival;
				villages[p][3] += spear;
				villages[p][4] += sword;
				villages[p][5] += axe;
				villages[p][6] += scout;
				villages[p][7] += lc;
				villages[p][8] += hc;
				villages[p][9] += ram;
				villages[p][10] += cat;
				villages[p][11] += noble;
			}		
		}
		
		y[i+1].click();
	}
}
overView();

function findMe (coord) {
	var result = -1;
	if (!first) {
		for( var i = 0; i < villages.length; i++ ) {
			if( villages[i][0] == coord ) {
				result = i;
				break;
			}
		}
	}
	return result;
}

var docSource = "";
var spearFarm = 1;
var swordFarm = 1;
var axeFarm = 1;
var spyFarm = 2;
var lightFarm = 4;
var heavyFarm = 4;
var ramFarm = 5;
var catapultFarm = 8;

if (snipe == "y") {
	for (var qp = 1; qp < villages.length; qp++) {
		villages[qp][2] = villages[qp][2].replace('<span class="grey small">', "[b]");
		villages[qp][2] = villages[qp][2].replace('</span>', "[/b]");
	}
}

for (var q = 1; q < villages.length; q++) {
	docSource += "[coord]" + villages[q][0] + "[/coord]";
	if (snipe == "n") {docSource += "[b]" + villages[q][1] + " - ";}
	docSource += villages[q][2] + "<br>";
	if (snipe == "n") {docSource += "[/b]";}
	if(villages[q][3] !== 0) {docSource += "[unit]spear[/unit]" + villages[q][3] + " ";}
	if(villages[q][4] !== 0) {docSource += "[unit]sword[/unit]" + villages[q][4] + " ";}
	if(villages[q][5] !== 0) {docSource += "[unit]axe[/unit]" + villages[q][5] + " ";}
	if(villages[q][6] !== 0) {docSource += "[unit]spy[/unit]" + villages[q][6] + " ";}
	if(villages[q][7] !== 0) {docSource += "[unit]light[/unit]" + villages[q][7] + " ";}
	if(villages[q][8] !== 0) {docSource += "[unit]heavy[/unit]" + villages[q][8] + " ";}
	if(villages[q][9] !== 0) {docSource += "[unit]ram[/unit]" + villages[q][9] + " ";}
	if(villages[q][10] !== 0) {docSource += "[unit]catapult[/unit]" + villages[q][10] + " ";}
	if(villages[q][11] !== 0) {docSource += "[unit]snob[/unit]" + villages[q][11] + "";}
	docSource += " = ";
	var farm = parseInt(parseInt(villages[q][3])*spearFarm+parseInt(villages[q][4])*swordFarm+parseInt(villages[q][5])*axeFarm+parseInt(villages[q][6])*spyFarm+parseInt(villages[q][7])*lightFarm+parseInt(villages[q][8])*heavyFarm+parseInt(villages[q][9])*ramFarm+parseInt(villages[q][10])*catapultFarm);
	docSource += farm + "[building]farm[/building]";
	docSource += "<br><br>";
}

var popup = window.open('ContiC Assistance-Counter', 'ContiC Assistance-Counter', 'width=640,height=480,scrollbars=yes'); 
popup.document.open('text/html', 'replace'); 
popup.document.write(docSource); 
popup.document.close();