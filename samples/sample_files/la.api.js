var AsciiTextClean = function(str){
	str = str.replace('\\u2019', '\'').replace('\\u2018', '\'').replace('\u2019', '\'').replace('\u2018', '\'');
	str = str.replace('\\u2022', '•').replace('\u2022', '•');
	str = str.replace('\\u00B1', '±').replace('\\u00b1', '±').replace('\u00B1', '±').replace('\u00b1', '±');
	str = str.replace('\\u00B0', '°').replace('\\u00b0', '°').replace('\u00B0', '°').replace('\u00b0', '°');
	str = str.replace('\\u2013', '-').replace('\u2013', '-');
	str = str.replace('\\u03c0', 'π').replace('\u03c0', 'π');
	str = str.replace('\\u00d8', 'Ø').replace('\u00d8', 'Ø');
	return str;
};

var DetectIE = function(){
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) { return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10); }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
  	var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) { return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10); }

  return false;
}

var UseAPIProxy = function(){
	var blnUseProxy = false;
	var ieVersion = DetectIE();
	if( typeof ieVersion === "boolean" ){ 
		blnUseProxy = false; 
	} else {
		if( typeof ieVersion === "number" && ieVersion <= 9 ){
			blnUseProxy = true;
		}
	}
	/*temp for cors*/
	blnUseProxy = true;
	return blnUseProxy;
}

var objAPI = {

	init: function(){
		var self = this;
	},

	GetAuthToken: function(){
		var self = this;
		return strMasterData.stuAPI.AuthToken; 
	},

	Authenticate: function(){
		var self = this;
		if( 'LastAuthenticated' in strMasterData.stuAPI && strMasterData.stuAPI.LastAuthenticated.length ){
			var dtNow = new Date();
			var dtLastAuthenticated = new Date(strMasterData.stuAPI.LastAuthenticated);
			var dtExpiry = new Date(dtLastAuthenticated.getTime());
			dtExpiry.setMinutes(dtExpiry.getMinutes() + 15);
			if( dtNow > dtExpiry ){
				self.AuthenticateAPICall();
			}
		} else {
			self.AuthenticateAPICall();
		}

		return self.GetAuthToken();
	},

	AuthenticateAPICall: function(){
		var self = this;

		$.ajax({
			cache: false,
			type: "POST",
			url: "/views/ajax/general.cfc?_cf_nodebug=false&ts=" + (new Date()).getTime(),
			dataType: "json",
			data: {
				method: 'APIAuthenticate',
				returnFormat: 'json'
			},
			success: function(response){
				strMasterData['stuAPI'] = response;
			},
			error: function(error){
				UIFunctions.ShowErrorModal();
			},
			async: false
		});
	},

	Call: function(servicePath, serviceMethod, dataFieldName, dataPacket, async, successCallback, errorCallback){
		var self = this;

		var isAsync = ( typeof async === "boolean" ? async : true );
		var serviceURL = strMasterData.stuAPI.URL + servicePath + '?method=' + serviceMethod + '&ts=' + (new Date()).getTime();
		var data = {}; data[dataFieldName] = AsciiTextClean(dataPacket);
		var DefaultErrorFunction = ( typeof UIFunctions === 'undefined' || typeof UIFunctions.ShowErrorModal === 'undefined' ? function(){ alert('An error has occurred'); } : UIFunctions.ShowErrorModal );

		//console.log('isAsync', isAsync);

		if( UseAPIProxy() ){

			//console.log('API: Using Proxy - IE9 or below detected.');

			$.ajax({
				cache: false,
				type: "POST",
				url: "/views/ajax/general.cfc?&ts=" + (new Date()).getTime(),
				dataType: "json",
				data: {
					method: 'APIProxy',
					returnFormat: 'json',
					servicePath: servicePath,
					serviceMethod: serviceMethod,
					dataFieldName: dataFieldName,
					dataPacket: dataPacket
				},
				success: function(response){
					//console.log('response', response);

					if( response.result == 'success' ){
						if( $.isFunction(successCallback) ){ successCallback(response.data); }
					} else {
						if( $.isFunction(errorCallback) ){ errorCallback(response.errorMessages); } else { DefaultErrorFunction(); }
					}
				},
				error: function(error){
					//console.log('error', error);
					if( $.isFunction(errorCallback) ){ errorCallback(); } else { DefaultErrorFunction(); }
				},
				async: isAsync
			});


		} else {

			//console.log('API: Direct Call');

			$.ajax({
				cache: false,
				type: "POST",
				url: serviceURL,
				dataType: "json",
				data: data,
				success: function(response){
					if( response.result == 'success' ){
						if( $.isFunction(successCallback) ){ successCallback(response.data); }
					} else {
						if( $.isFunction(errorCallback) ){ errorCallback(response.errorMessages); } else { DefaultErrorFunction(); }
					}
				},
				error: function(error){
					//console.log(error);
					if( $.isFunction(errorCallback) ){ errorCallback(); } else { DefaultErrorFunction(); }
				},
				async: isAsync
			});
		}
	}

};