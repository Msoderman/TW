javascript: 
/* ####################### NOTE: Original scripts altered to K-divided Random FakeScript, no cookies atm Author: Bertil/Tw-Noodle/Punkrock (.se) Email: prefix_@hotmail.com ####################### */ 
/* Author : Dale McKay Email : dalesmckay@gmail.com Notes : This is a rewrite of another script (thanks for the idea whoever the original author is) TODO : 

* Configuration Options ____________________________________________________________ 
Copyright (coffee) 2010 Dale McKay, all rights reserved version 1.0, 13 June 2010 This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software. Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions: 
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required. Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software. 
This notice may not be removed or altered from any source distribution. ____________________________________________________________ 
/
* Borrowed some code from Fluffy88 http://www.fluffy88.com/TW/op_gen.js */ 

function fnExecuteScript(){ 
	try{ 
	var eleDoc = (window.frames.length > 0)?window.main.document:document; 
	if(!eleDoc.URL.match(/screen\=info_player/i)){ throw('This script must be run from the\nPlayer Information Screen!'); } 
	
	var choice = prompt("Vanlig? (y/n)", "y"); 
	var coords;
	if (choice == "y") { var coords = $("table[id=villages_list]").html().match(/\d+\|\d+/g); 
	if(!coords || (coords.length <= 0)){ throw('This player has no villages'); }
	}
	else {
	var coords = new Array();
	$("table[id=villages_list] tbody tr td:nth-child(3)").each(function(index, element) {
		coords.push($(element).html());
	}); }

	function fnGenerateScript(){ 
		var scriptSource = ""; 
		scriptSource += "\t\t Alla byar"; 
		scriptSource += "\t\t<textarea cols=\"80\" rows=\"10\" style=\"width:100%;\" onfocus=\"this.select();\">javascript:"; 
		scriptSource += "var coords='" + coords.join(" ") + "';"; 
		scriptSource += "var fang = false; var basicSpy = 5; var maxSpy = 10; var maxCatapult = 100; var maxLight = 15; var maxAxe = 25; var maxSpear = 25; var maxSword = 25; var maxArcher = 25; var maxMarcher = 10; var maxHeavy = 10; var points = 10000; $.getScript('https://dl.dropboxusercontent.com/u/105358872/newFake.js?');void(0);"; 
		scriptSource += "\t\t</textarea><br><br>\n\n"; 
		return scriptSource; 
	} 
	
	var docSource = ""; 
	docSource += "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">\n"; 
	docSource += "<html>\n"; 
	docSource += "\t<head>\n"; 
	docSource += "\t\t<title>Speciellt fejkscript</title>\n"; 
	docSource += "\t\t<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"/>\n"; 
	docSource += "\t</head>\n"; 
	docSource += "\n"; 
	docSource += "\t<body>\n"; 
	docSource += "\t\t<h3>Special Fake Script Generator</h3>\n"; 
	docSource += "\t\t<hr>\n"; 
	docSource += fnGenerateScript();
	docSource += "\t</body>\n"; 
	docSource += "</html>\n"; 
	var popup = window.open('about:blank', 'TwNoodle_tw_fakegen', 'width=640,height=480,scrollbars=yes'); 
	popup.document.open('text/html', 'replace'); 
	popup.document.write(docSource); 
	popup.document.close(); void(0); } catch(objError){ var dbgMsg="Error: " + String(objError.message||objError); /* fnDebugMessage(dbgMsg); */ alert(dbgMsg); }} fnExecuteScript();