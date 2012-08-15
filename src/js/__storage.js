/*jslint browser:true, devel:true, jquery:true, smarttabs:true*//*global gui, Form, Modernizr*/

/* !Storage Class */
/**
 * @constructor
 * Function (Class): Storage
 *
 * description
 *
 * Returns:
 *
 *   return description
 */
function StorageLocal(){
	"use strict";
	var RESERVED_KEYS = ['__settings', 'null','__history', 'Firebug', 'undefined', '__bookmark', '__counter'];

	var localStorage = window.localStorage;
	// Could be replaced by Modernizr function if Modernizr remains used in final version
	this.isSupported = function() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
		return false;
		}
	};
	
	//used for testing
	this.getForbiddenKeys = function(){
		return RESERVED_KEYS;
	};
		
	// saves a data object in JSON format (string)
	// ADD CONSIDER separating this function for surveyData and other record types as there seems very little that is shared between record types
	/**
	 * [setRecord description]
	 * @param {string} newKey    [description]
	 * @param {(string|object)} data      [description]
	 * @param {boolean=} del [description] used to change name of existing record and delete old record
	 * @param {boolean=} overwrite [description] overwrite is only used when there is *another* record with the same new name (not when simply updating current form)
	 * @param {string=} oldKey    [description]
	 */
	this.setRecord = function(newKey, record, del, overwrite, oldKey) {
		if (!newKey || newKey.length < 1){
			console.error('no key provided for record');
			return 'require';
		}
		newKey = newKey.trim();
		oldKey = (typeof oldKey === 'string') ? oldKey.trim() : null;
		overwrite = (typeof overwrite !== 'undefined' && overwrite === true) ? true : false;
		
		// ADD: CATCH ERROR WHEN LOCALSTORAGE SPACE IS FULL
		
		//using the knowledge that only survey data is provided as a "data" property (and is  a string)
		if (typeof record.data === 'string' && isReservedKey(newKey)){
			return 'forbidden';
		}
		// if the record has an existing key, but was not loaded from the store with this key, do not overwrite
		if (typeof record.data === 'string' && oldKey !== newKey && isExistingKey(newKey) && overwrite !== true) {
			
			//if (oldKey !== newKey && overwrite === false) {
			return 'existing';
			//}
		}
		try {
			//add timestamp to survey data
			if (typeof record.data === 'string'){
				record.lastSaved = (new Date()).getTime();
			}
			//console.log('lastSaved: '+data['lastSaved']);
			localStorage.setItem(newKey, JSON.stringify(record));
			
			console.debug('saved: '+newKey+', old key was: '+oldKey);
			//if the record was loaded from the store (oldKey != null) and the key's value was changed during editing
			//delete the old record if del=true
			if (oldKey !== null && oldKey!=='' && oldKey !== newKey){
				if(del){
					console.log('going to remove old record with key:' + oldKey);
					this.removeRecord(oldKey);
				}
			}
			//if (newKey == this.getCounterValue() ){
			localStorage.setItem('__counter', JSON.stringify({counter: this.getCounterValue()}));
			//}
			return 'success';
		}
		catch(e){
			console.log('error in store.setRecord:'+e.message);
			return 'error';
		}
	};
	
	// returns form data as an object
	this.getRecord = function(key){
		var record;
		try{
			record = JSON.parse(localStorage.getItem(key));
			//console.log('found data:'+JSON.stringify(data)); //DEBUG
			return record;// returns null if item cannot be found
		}
		catch(e){
			console.log('error with loading data from store: '+e.message);
			return null;
		}
	};

	// removes a record
	this.removeRecord = function(key){
		try{
			localStorage.removeItem(key);
			//console.log('removed record with key:'+key) // DEBUG
			return true;
		}
		catch(e){
			console.log('error with removing data from store: '+e.message);
			return false;
		}
	};

//	this.setRecordStatus = function (key, status){
//		var record = this.getRecord(key);
//		record.ready = status;
//		this.setRecord(key, record, false, true, key);
//	};
	
	//returns an ordered array of objects with form keys and final variables {{"key": "name1", "final": true},{"key": "name2", etc.
	this.getFormList = function(){
		var i, ready, record,
			formList=[],
			records = this.getSurveyRecords(false);
		//console.log('data received:'+JSON.stringify(data)); // DEBUG
		for (i=0 ; i<records.length ; i++){
			record = records[i];
			record.ready = (record.ready === 'true' || record.ready === true) ? true : false;
			formList.push({key: record.key, ready: record.ready, lastSaved: record.lastSaved});
		}
		//console.debug('formList returned with '+formList.length+' items'); //DEBUG
		//order formList by lastSaved timestamp
		formList.sort(function(a,b){
			return b.lastSaved-a.lastSaved;
		});
		return formList;//returns empty object if no form data in storage or error was thrown
	};
	
	// retrieves all survey data
	this.getSurveyRecords = function(finalOnly, excludeName){
		var i, key,
			records = [],
			record  = {};
		finalOnly = finalOnly || false;
		excludeName = excludeName || null;
		//try{
			//console.log(localStorage.length+' records found'); // DEBUG
			for (i=0; i<localStorage.length; i++) {
				key = localStorage.key(i);
				//console.debug('found record with with key:'+key);
				record = localStorage.getItem(key);
				// get record - all non-reserved keys contain survey data
				if (!isReservedKey(key)){
					//console.debug('record with key: '+key+' is survey data');
					try{
						record = JSON.parse(record);
						/* although the key is also available as one of the record parameters
							this should not be relied upon and the actual storage key should be used */
						record.key = key;
						//if (record.recordType === recordType){
							//console.log('this record is surveyData: '+JSON.stringify(record)); // DEBUG
						if (key !== excludeName && (!finalOnly || record.ready === 'true' || record.ready === true )){//} && (record.key !== form.getKey()) ){
							records.push(record);
						}
					}
					catch(e){
						console.log('record found that was probably not in the correct JSON format'+
							' (e.g. Firebug settings or corrupt record) (error: '+e.message+'), record was ignored');
					}
				}
			}
		//}
		//catch(e){
		//	console.log('error with retrieving all survey data data from storage');
		//	data = [];
		//}
		//console.debug('getSurveyRecords() returns: '+JSON.stringify(records)); // DEBUG
		return records;
	};

	this.getSurveyDataArr = function(finalOnly, excludeName){
		var i, records,
			dataArr = [];
		finalOnly = finalOnly || true;
		records = this.getSurveyRecords(finalOnly, excludeName);
		for (i=0 ; i<records.length ; i++){
			dataArr.push({name: records[i].key, data: records[i].data});//[records[i].key, records[i].data]
		}
		//console.debug('returning data array: '+JSON.stringify(dataArr));
		return dataArr;
	};

	this.getSurveyDataXMLStr = function(finalOnly){
		var i,
			dataObjArr = this.getSurveyDataArr(finalOnly),
			dataOnlyArr =[];
		for (i=0 ; i<dataObjArr.length ; i++){
			dataOnlyArr.push(dataObjArr[i].data);
		}
		return '<exported>'+dataOnlyArr.join('')+'</exported>';
	};
	
	
	// MOVE TO STORE?
	//function to get settings from the store - all settings or one particular setting
	//this.getSettings = function(name){
//		var settings={};
//		var settingsRec = this.getRecord('settings');
//		//console.log('settings record:'+settingsRec);
//		if (settingsRec){
//			settings = settingsRec;
//		}
//		else {
//			settings = DEFAULT_SETTINGS;
//		}
//		if (name){
//			settings = settings[name]; // still to be tested
//		}
//		// console.log('returning settings: '+settings); //DEBUG
//		return settings;
//	};

	// private function to check if key is forbidden
	function isReservedKey(k) {
		var i;
		for (i=0 ; i<RESERVED_KEYS.length ; i++){
			if (k === RESERVED_KEYS[i]){
				return true;
			}
		}
		return false;
	}

	// private function to check if the key exists
	function isExistingKey(k) {
		if (localStorage.getItem(k)){
			//console.log('existing key');// DEBUG
			return true;
		}
		//console.log('not existing key');// DEBUG
		return false;
	}
	
	this.getCounterValue = function(){
		var record = this.getRecord('__counter'),
			number = (record) ? Number(record.counter) : 0,
			numberStr = (number+1).toString().pad(4);
		//this.setRecord('__counter', numberStr);
		return numberStr;
	};

}