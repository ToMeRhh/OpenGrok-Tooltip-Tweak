javascript:(function (){
	(function CREATE_NAV_MENU(){
		if (document.getElementById("grok-menu-hack")==null) {
			shortcut = {'all_shortcuts':{},'add': function(shortcut_combination,callback,opt) {var default_options = {'type':'keydown','propagate':false,'disable_in_input':false,'target':document,'keycode':false};if (!opt) opt = default_options;else {for(var dfo in default_options) {if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];}};var ele = opt.target;if (typeof opt.target == 'string') ele = document.getElementById(opt.target);var ths = this;shortcut_combination = shortcut_combination.toLowerCase();var func = function(e) {e = e || window.event;if(opt['disable_in_input']) { var element;if(e.target) element=e.target;else if(e.srcElement) element=e.srcElement;if(element.nodeType==3) element=element.parentNode;if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;};if (e.keyCode) code = e.keyCode;else if (e.which) code = e.which;var character = String.fromCharCode(code).toLowerCase();if(code == 188) character=","; if(code == 190) character="."; var keys = shortcut_combination.split("+");var kp = 0;var shift_nums = {"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":"\"",",":"<",".":">","/":"?","\\":"|"};var special_keys = {'esc':27,'escape':27,'tab':9,'space':32,'return':13,'enter':13,'backspace':8,'scrolllock':145,'scroll_lock':145,'scroll':145,'capslock':20,'caps_lock':20,'caps':20,'numlock':144,'num_lock':144,'num':144,'pause':19,'break':19,'insert':45,'home':36,'delete':46,'end':35,'pageup':33,'page_up':33,'pu':33,'pagedown':34,'page_down':34,'pd':34,'left':37,'up':38,'right':39,'down':40,'f1':112,'f2':113,'f3':114,'f4':115,'f5':116,'f6':117,'f7':118,'f8':119,'f9':120,'f10':121,'f11':122,'f12':123};var modifiers = { shift: { wanted:false, pressed:false},ctrl : { wanted:false, pressed:false},alt  : { wanted:false, pressed:false},meta : { wanted:false, pressed:false}};                        if(e.ctrlKey)modifiers.ctrl.pressed = true;if(e.shiftKey)modifiers.shift.pressed = true;if(e.altKey)modifiers.alt.pressed = true;if(e.metaKey)   modifiers.meta.pressed = true;                        for(var i=0; k=keys[i],i<keys.length; i++) {if(k == 'ctrl' || k == 'control') {kp++;modifiers.ctrl.wanted = true;} else if(k == 'shift') {kp++;modifiers.shift.wanted = true;} else if(k == 'alt') {kp++;modifiers.alt.wanted = true;} else if(k == 'meta') {kp++;modifiers.meta.wanted = true;} else if(k.length > 1) { if(special_keys[k] == code) kp++;} else if(opt['keycode']) {if(opt['keycode'] == code) kp++;} else {if(character == k) kp++;else {if(shift_nums[character] && e.shiftKey) { character = shift_nums[character]; if(character == k) kp++;}}}}if(kp == keys.length && modifiers.ctrl.pressed == modifiers.ctrl.wanted &&modifiers.shift.pressed == modifiers.shift.wanted &&modifiers.alt.pressed == modifiers.alt.wanted &&modifiers.meta.pressed == modifiers.meta.wanted) {callback(e);if(!opt['propagate']) { e.cancelBubble = true;e.returnValue = false;if (e.stopPropagation) {e.stopPropagation();e.preventDefault();}return false;}}};this.all_shortcuts[shortcut_combination] = {'callback':func, 'target':ele, 'event': opt['type']};if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);else ele['on'+opt['type']] = func;},'remove':function(shortcut_combination) {shortcut_combination = shortcut_combination.toLowerCase();var binding = this.all_shortcuts[shortcut_combination];delete(this.all_shortcuts[shortcut_combination]);if(!binding) return;var type = binding['event'];var ele = binding['target'];var callback = binding['callback'];if(ele.detachEvent) ele.detachEvent('on'+type, callback);else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);else ele['on'+type] = false;}};
			shortcut.add("Ctrl+I",function() { document.getElementById('grok-menu-hack').focus(); }, { 'type':'keydown', 'propagate':true, 'target':document} ); 
			sym_list = get_sym_list();
			code = "<select id=\"grok-menu-hack\" style=\"color:black;text-aligh:center;width:300px;background:#9494FF\" autofocus=\"true\" onchange=\"(function goToAnchor() { var anchorSelect = document.getElementById(\'grok-menu-hack\');   window.location.hash = anchorSelect.options[anchorSelect.selectedIndex].value; anchorSelect.focus();})()\">";
			code += "<option label=\"Grok-Hack\"></option>";
			
			for (j=0; j<sym_list.length;j++){
				/* If you want the list to be ordered by line-numbers, uncomment this 'lst' decleration, and comment the next one
				lst = sym_list[j][2].sort(function(a, b) {
					return parseInt(a[1]) - parseInt(b[1]);
				});*/
				lst = sym_list[j][2].sort(function compare(a, b) {
											if (a[0] < b[0]) {
												return -1;
											}
											if (a[0]>b[0]) {
												return 1;
											}
												return 0; }
										);					
										
				code += "<option label=\"" + sym_list[j][0] + "\" style=\"color:white\" disabled=\"true\"></option>";
				for (i=0; i<lst.length; i++){
					code += "<option value=\"#";
					code += lst[i][0];
					code += "\">";
					code += lst[i][0];
					code += "</option>";
				}
			}
			code += "<option label=\"Made By Tomer Hodadi :)\" disabled=\"true\"></option>";
			code += "</select>";
			document.getElementById("Masthead").insertAdjacentHTML("beforeEnd", code);
		}	
		else{
			document.getElementById('grok-menu-hack').focus();
		}
	})();
	
	(function CREATE_TOOLTIP_TITLES() {		
		src = document.getElementById("src").childNodes[1].childNodes;
		elements = Array.prototype.slice.call( src, 0 );
		lines = elements.filter(function (e){ return (e.className==="l" || e.className==="hl"); } );
		
		function get_text_between_lines(n,m){
				start_line = lines.filter(function (e) { return (e.getAttribute("name")==n); });
				if (start_line == null){
					return "";
				}		
				i = elements.indexOf(start_line[0]);
				
				end_line = lines.filter(function (e) { return (e.getAttribute("name")==m); });
				if (end_line == null){
					return "";
				}
				j = elements.indexOf(end_line[0]);
				
				line_str = "";
				for (;i<j;i++){
					if (elements[i].className!="l" && elements[i].className!="hl")
						line_str += elements[i].textContent;
				}
				return line_str;
		}
		
		function clean_tabs_spaces(str){
			ans = str;
			while (ans.indexOf('\t')!=-1) { 
				ans = ans.replace('\t',' '); 
			}
			while (ans.indexOf("  ")!=-1) { 
				ans = ans.replace("  "," "); 
			}
			return ans;
		}
		
		function get_line_number_by_element(e){
			x = elements.indexOf(e);
			if (x==-1)
				return -1;
			else {
				for (i=x; i>=0; i--){
					if (elements[i].className=="l" || elements[i].className=="hl")
						return elements[i].textContent;
				}
			}
			return -1;
		}

		d_list = Array.prototype.slice.call( document.getElementsByClassName("d"), 0 );
		sym_lists = get_sym_list();
		for (d_i in d_list){
			if (!d_list[d_i].hasAttribute("title")) {
				for (list_i in sym_lists){
					arr_list = Array.prototype.slice.call(sym_lists[list_i][2], 0);
					item = arr_list.find(function (e) { return e[0] == d_list[d_i].innerText ; });
					if (item){
						line = get_text_between_lines(item[1], (parseInt(item[1])+1).toString());
						console.log("Cleaning: " + line);
						line = clean_tabs_spaces(line);
						console.log("Result: " + line);
						d_list[d_i].setAttribute("title", line!=null ? line : "ERROR");
						break;
					}
				}
				if (!d_list[d_i].hasAttribute("title") && d_list[d_i].href.indexOf("#")!=-1){
					elem = document.getElementsByName(d_list[d_i].innerText);
					if (elem.length == 0)
						continue;
					line_number = get_line_number_by_element(elem[0]);
					line = get_text_between_lines(line_number, (parseInt(line_number)+1).toString());
					console.log("Cleaning: " + line);
					line = clean_tabs_spaces(line);
					console.log("Result: " + line);
					d_list[d_i].setAttribute("title", line!=null ? line : "ERROR");
				}
			}
		}
	}
	)();
})();
