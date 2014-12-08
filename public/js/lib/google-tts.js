var kacrut = [];
var kacruthtml = [];
var queue = [];
var renderqueue = [];
var isPlaying = false;
var i = 0;
var renderIdx = 0;
var kacruthtmllgt = 0;
var kacruthtmlidx = 0;

var audios = [];
var firstTime = true;
var muted = "";

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

  
function playAudio(i){
	console.log("i: " + i + ", audios: " +  audios.length);
	if (i < audios.length){
		console.log("playing");
		
		
    
		audios[i].muted = muted;
		
		audios[i].play();
    var delay ;
    if (firstTime){
      delay = 0;
      firstTime = false;
    }else{
      delay = 0;
    }
    var kacrut1 = ''; 
    var kacrut2 = '';
    var print = '';
    var isNotOnRenderArea = false;
    var currRenderArea = $(renderArea);
    
    debugger;
    // renderqueue.shift();
    kacrut1 = kacrut.shift();
    kacrut1 = kacrut1.trim();
    kacrut2 = kacruthtml.shift();
    kacrut2 = kacrut2.trim();
    kacruthtmlidx++;
    while(kacrut2.length!=kacrut1.length){
      var close = '';
      var lastItem = undefined;
      if(kacrut2.substring(kacrut2.length-2, kacrut2.length) == '/>' ){
        print+= kacrut2;
      }
      else{
        if(renderqueue.length >0){
          if(kacrut2.substring(0,2) == '</'){
            var strIdx = Math.max(0,(renderqueue.length/2)-1);
            lastItem = renderqueue[strIdx];
            close = '<'+'/'+lastItem.substring(1, lastItem.indexOf(' ') == -1 ? lastItem.length - 1 : lastItem.indexOf(' ')) + '>';
            if(kacrut2 == close){
              idx = renderqueue.length-1;
              do{
                renderqueue.pop();
                idx--;
              }while(idx>=strIdx)
              lastItem = renderqueue[idx];
              if(lastItem){
                debugger;
                currRenderArea = $("#"+lastItem.substring((lastItem.indexOf("id")+4),(lastItem.indexOf(">")-1)-lastItem.indexOf("id")+4));
              }else{
                currRenderArea = $(renderArea);
              }
            }
            else{
              var strIdx = Math.max(0,(renderqueue.length/2));
              idx = renderqueue.length-1;
              do{
                renderqueue.pop();
                idx--;
              }while(idx>=strIdx)
              lastItem = renderqueue[idx];
              if(lastItem){
                debugger;
                currRenderArea = $("#"+lastItem.substring((lastItem.indexOf("id")+4),(lastItem.indexOf(">")-1)-lastItem.indexOf("id")+4));
              }else{
                currRenderArea = $(renderArea);
              }
            }
            
          }
          else if(kacrut2.substring(0,1) == '<'){
            var parentId = "item"+kacruthtmlidx;
            lastItem = renderqueue[(renderqueue.length/2)-1];
            var parent = renderqueue[((renderqueue.length/2)-1)-1];
            if(parent!=undefined){
              debugger;
              currRenderArea = $("#"+parent.substring((parent.indexOf("id")+4),(parent.indexOf(">")-1)-parent.indexOf("id")+4)).parent();
              currRenderArea.splice( ((renderqueue.length/2)-1)+2, 0, " id='item"+kacruthtmlidx+"'" );
              print += renderqueue[((renderqueue.length/2)-1)+2];
            }
            else{  
              debugger;
              kacrut2 = kacrut2.splice( kacrut2.length-1, 0, " id='item"+kacruthtmlidx+"'" );
              renderqueue.push(kacrut2);
              print += renderqueue[renderqueue.length-1];
            }
          }
        }
        else{
          debugger;
          kacrut2 = kacrut2.splice( kacrut2.length-1, 0, " id='item"+kacruthtmlidx+"'" );
          renderqueue.push(kacrut2); 
          print += renderqueue[renderqueue.length-1];       
        }
      }      
      kacrut2 = kacruthtml.shift();
      kacrut2 = kacrut2.trim()
      kacruthtmlidx++;
    };
    var renderIdx = kacruthtmlidx - 1;
    for(var idx = renderqueue.length-1; idx >=0 ; idx--){
      debugger;
      var close = '<'+'/'+renderqueue[idx].substring(1,renderqueue[idx].indexOf(" ")) + '>';
      close = close.replace(" id='item"+(renderIdx)+"'", "");
      renderqueue.push(close);
      if(renderIdx == kacruthtmlidx-1)
        print += close;
      renderIdx--;
    }
    
    currRenderArea.append(print);
    debugger;
    $('#item'+(kacruthtmlidx-1)).typer([kacrut2],{
              char: '',
              delay: delay,
              duration: 605,
              typeSpeed: 10,
              endless: false,
              onType: $.noop,
              afterAll: $.noop,
              afterPhrase: $.noop
          });
   
    
    
	}else{
		$("#btnPlay").removeAttr("disabled");
	}
}
  
function pauseAudio(){
	// debugger;
	if (audios.length>0 && audios != undefined)
		audios[i].pause();
}
  
function resumeAudio(){
	// debugger;
	if (audios.length>0 && audios != undefined)
		audios[i].resume();
}

/*! google-tts v1.0.0 | https://github.com/hiddentao/google-tts */
(function (name, definition){
  'use strict';

  if ('function' === typeof define){ // AMD
    define(definition);
  } else if ('undefined' !== typeof module && module.exports) { // Node.js
    module.exports = definition();
  } else { // Browser
    var global = window || this,
      old = global[name],
      theModule = definition();

    theModule.noConflict = function () {
      global[name] = old;
      return theModule;
    };
    global[name] = theModule;
  }
})('GoogleTTS', function () {
  'use strict';

  /**
   * The API instance.
   *
   * @param defaultLanguage Optional. The language to use when not specified. 'en' is default.
   * @constructor
   */
  var TTS = function(defaultLanguage) {
    var self = this;


    /**
     * Maximum no. of characters which can be be submitted in a single request.
     *
     * This value was found through trial-and-error, see https://github.com/hiddentao/google-tts/issues/9
     * @type {Number}
     */
    var MAX_CHARS_PER_REQUEST = 100;
	


    /**
     * Default language (code).
     * @type {String}
     */
    self.defaultLanguage = defaultLanguage || 'en';

    /**
     * Full list of languages.
     * @type {Object}
     */
    var languages = {
      'af' : 'Afrikaans',
      'sq' : 'Albanian',
      'ar' : 'Arabic',
      'hy' : 'Armenian',
      'ca' : 'Catalan',
      'zh-CN' : 'Mandarin (simplified)',
      'zh-TW' : 'Mandarin (traditional)',
      'hr' : 'Croatian',
      'cs' : 'Czech',
      'da' : 'Danish',
      'nl' : 'Dutch',
      'en' : 'English',
      'eo' : 'Esperanto',
      'fi' : 'Finnish',
      'fr' : 'French',
      'de' : 'German',
      'el' : 'Greek',
      'ht' : 'Haitian Creole',
      'hi' : 'Hindi',
      'hu' : 'Hungarian',
      'is' : 'Icelandic',
      'id' : 'Indonesian',
      'it' : 'Italian',
      'ja' : 'Japanese',
      'ko' : 'Korean',
      'la' : 'Latin',
      'lv' : 'Latvian',
      'mk' : 'Macedonian',
      'no' : 'Norwegian',
      'pl' : 'Polish',
      'pt' : 'Portuguese',
      'ro' : 'Romanian',
      'ru' : 'Russian',
      'sr' : 'Serbian',
      'sk' : 'Slovak',
      'es' : 'Spanish',
      'sw' : 'Swahili',
      'sv' : 'Swedish',
      'ta' : 'Tamil',
      'th' : 'Thai',
      'tr' : 'Turkish',
      'vi' : 'Vietnamese',
      'cy' : 'Welsh'
    };


    /**
     * Available players.
     * @type {Array}
     * @private
     */
    self._players = [
      new TTS.HTML5Player,
      new TTS.SM2Player
    ];


    /**
     * Add in a playback mechanism.
     *
     * @param pm TTS.Player a concrete subclass instance.
     * @throws Error if passed-in item is not an instance of GoogleTTS.Player
     */
    self.addPlayer = function(pm) {
      if (!(pm instanceof TTS.Player))
        throw new Error('Must be a instance of base Player class');

      self._players.push(pm);
    };



    /**
     * Get supported languages.
     * @return {Object} hashtable (language code -> description)
     */
    self.languages = function() {
      return languages;
    };


    /**
     * Get first available player.
     *
     * If the resulting playback mechanism is null then it means no playback mechanism is available for use.
     *
     * @param cb Function Result callback (Error err, TTS.Player pm)
     */
    self.getPlayer = function(cb) {
      if (self.availablePlayer) {
        return cb(null, self.availablePlayer);
      }

      var _testNextMechanism,
          index = -1;

      (_testNextMechanism = function() {
        // none available?
        if (self._players.length <= (++index)) {
          return cb();
        }

        self._players[index].available(function(canPlay) {
          if (canPlay) {
            self.availablePlayer = self._players[index];
            return cb(null, self.availablePlayer);
          } else {
            _testNextMechanism();
          }
        });
      }).call();
    };


    /**
     * Construct the URLs to fetch the speech audio for given text and language.
     * @param txt {String} the text.
     * @param lang {String} the language of the text. If omitted then default language is used.
     */
    self.urls = function(txt, lang) {
      lang = lang || self.defaultLanguage;

      if (!txt || 0 >= txt.length)
        throw new Error('Need some text');

      var slices = self._sliceInput(txt, MAX_CHARS_PER_REQUEST),
        urls = [];

      for (var i=0; i<slices.length; ++i) {
        var slice = slices[i];
		
		var wCount = slice.split(" ").length;
		
        urls.push(
          //'http://translate.google.com/translate_tts?ie=UTF-8&tl=' + lang + '&q=' + encodeURIComponent(slice)
          'homeStream/' + encodeURIComponent(slice)
        );
		// + '&total=' + (slices.length )
      }

      return urls;
    };



    /**
     * Slice up given input text.
     * @param txt {String} the input text.
     * @param maxSliceLength {Integer} maximum length of each slice.
     * @return {Array} list of slices.
     * @private
     */
    self._sliceInput = function(txt, maxSliceLength) {
      var slices = [],
        start = 0;

      /*do {
        slices.push(txt.slice(start, start + maxSliceLength));
        start += maxSliceLength;
      } while (txt.length > start);*/
	  
	  
  	 //  var delimiter = " ";
  		// do{
  		// 	var tempMax = maxSliceLength + 1;
  		// 	if (txt.indexOf(".") > -1 && txt.indexOf(".") < tempMax){
  			
  		// 		  kacrut.push(txt.substring(0, txt.indexOf(".")+1));
  		// 		  slices.push(txt.substring(0, txt.indexOf(".")+1).trim());

  				  
  		// 		  txt = txt.substring(txt.indexOf(".")+1, txt.length);
  		// 	}else if (txt.indexOf(",") > -1 && txt.indexOf(",") < tempMax){
  			
  		// 		  kacrut.push(txt.substring(0, txt.indexOf(",")+1));
  		// 		  slices.push(txt.substring(0, txt.indexOf(",")+1).trim());
  				  
  		// 		  txt = txt.substring(txt.indexOf(",")+1, txt.length);
  		// 	}else{
  		// 		  do {
  		// 				tempMax--;
  		// 				var c = txt.charAt(tempMax);
  		// 		  }while(c != delimiter);
  				  
  		// 		  slices.push(txt.substring(0, tempMax));
  		// 		  kacrut.push(txt.substring(0, tempMax + 1));
  				  
  		// 		  txt = txt.substring(tempMax+1, txt.length);
  		// 	}
  			  
  		// }while (txt.length > 100);

  	 //  kacrut.push(txt);
  	 //  slices.push(txt.trim());
     

      // var startSlideIdx = 0;
      // var curTxt = txt;
      // var toKacrut = '';
      // var toSlice = '';
      // var toKacrut2 = '';
      // var tempCloseTag = '';
      // var tag = '';
      // var openTag = '';
      // var isMustToCloseTag = false;
      // var closeTagIsFounded = false;
      // var curChar = '';
      // var tagqueue = [];
      // for (var i = 0; i < txt.length; i++) {
      //   curChar = txt.substr(i).charAt(0);
      //   if((curChar != '\n') && (curChar != '\r'))
      //   {
      //     if (txt.substr(i).charAt(0) === '<') {
      //       while (txt.substr(i).charAt(0) !== '>') {
      //         tag += txt.substr(i).charAt(0);
      //         i++;
      //       }
      //       i++;
      //       tag += '>';
      //       if(tag.substring(0, 2) == '</' ){
      //         closeTagIsFounded = true;
      //         isMustToCloseTag = false;
      //         tempCloseTag = tag; 
      //         i--;
      //       }
      //       else if(tag.substring(tag.length-2, tag.length) == '/>' ){
      //         closeTagIsFounded = true;
      //         isMustToCloseTag = false; 
      //         i--;
      //       }
      //       else{
      //         isMustToCloseTag = true;  
      //         openTag = tag; 
      //       }
      //     }
      //     curChar = txt.substr(i).charAt(0);

      //     if(tag != ''){
      //       toKacrut2 += tag;
      //       tag = '';
      //     }

          
      //     if(!closeTagIsFounded && ((curChar != '\n') && (curChar != '\r'))){
      //       toKacrut2 += txt.substr(i).charAt(0);
      //       toKacrut += txt.substr(i).charAt(0);
      //       toSlice += txt.substr(i).charAt(0);
      //     }

          

      //     if(((toSlice.length + 1) >= maxSliceLength) || (i >= (txt.length - 1)) || closeTagIsFounded || (curChar == '.') || (curChar == ',')){
            
      //       if((toKacrut != '') && ((toSlice.length + 1) == maxSliceLength) && ((curChar != '.') || (curChar != ','))){
      //         var decreaseIdx = toSlice.length-1;
      //         var tmpChar = '';
      //         var found = false;
      //         while((decreaseIdx>0) && !found){
      //           tmpChar = toSlice.substr(decreaseIdx).charAt(0);
      //           if(tmpChar == '.'){
      //             found = true;
      //           }
      //           else{
      //             decreaseIdx--;
      //           }
                
      //         }
      //         if(!found){
      //           decreaseIdx = toSlice.length-1;
      //           while((decreaseIdx>0) && !found){
      //             tmpChar = toSlice.substr(decreaseIdx).charAt(0);
      //             if(tmpChar == ','){
      //               found = true;
      //             }
      //             else{
      //               decreaseIdx--;
      //             }
                  
      //           }
      //         }
      //         if(!found){
      //           decreaseIdx = toSlice.length-1;
      //           while((decreaseIdx>0) && !found){
      //             tmpChar = toSlice.substr(decreaseIdx).charAt(0);
      //             if(tmpChar == ' '){
      //               found = true;
      //             }
      //             else{
      //               decreaseIdx--;
      //             }
      //           }
      //         }
      //         if(found){
      //           var decreaseNum = (toSlice.length-1) - decreaseIdx;
      //           var sliceLength = toSlice.length;
      //           i -= decreaseNum;
      //           toSlice = toSlice.substring(0, decreaseIdx+1);
      //           toKacrut = toKacrut.substring(0, decreaseIdx+1);
      //           if(closeTagIsFounded){
      //             toKacrut2 = toKacrut2.replace(tempCloseTag,'');
      //             toKacrut2 = toKacrut2.substring(0, decreaseIdx + 1 + (toKacrut2.length - sliceLength));
      //             toKacrut2 += tempCloseTag;
      //           }else{
      //             toKacrut2 = toKacrut2.substring(0, decreaseIdx+1+ (toKacrut2.length - sliceLength));
      //           }
      //         }
      //       }
      //       if(closeTagIsFounded){
      //         closeTagIsFounded = false;
      //       }
      //       if(toKacrut != '')
      //         kacrut.push(toKacrut);
      //       if(toSlice != '')
      //         slices.push(toSlice.trim());
      //       if(isMustToCloseTag){
      //         var closeTag = '<'+'/'+openTag.substr(1);
              
      //         toKacrut2 += closeTag;
      //         i++;
      //         txt = txt.splice( i, 0, closeTag );
      //         i += closeTag.length-1;
      //         curChar = txt.substr(i).charAt(0);
      //         i ++;
      //         curChar = txt.substr(i).charAt(0);
      //         txt = txt.splice( i, 0, openTag );
      //         curChar = txt.substr(i).charAt(0);

      //         openTag = '';
      //         tag = '';
      //         openTag = '';
      //         isMustToCloseTag = false;
      //         i--;

      //       }
      //       if(toKacrut == '')
      //         kacruthtml[kacruthtml.length-1] += toKacrut2;
      //       else
      //         kacruthtml.push(toKacrut2);
      //       toKacrut2 = '';
      //       toKacrut = '';
      //       toSlice = '';
      //     }
      //   }    
      // }

      var startSlideIdx = 0;
      var curTxt = txt;
      var toKacrut = '';
      var toSlice = '';
      var toKacrut2 = '';
      var tag = '';
      var prevtag = '';
      var isSingleTag = false;
      var curChar = '';
      var tagqueue = [];
      var closeTagIsFounded = false;
      
      var i = 0;
      // debugger;
      for (i = 0; i < txt.length; i++) {
        curChar = txt.substr(i).charAt(0);
        if((curChar != '\n') && (curChar != '\r'))
        {
          if (txt.substr(i).charAt(0) === '<') {
            // debugger;
            while (txt.substr(i).charAt(0) !== '>') {
              tag += txt.substr(i).charAt(0);
              i++;
            }
            tag += '>';
            // debugger;
            if(tag.substring(0, 2) == '</' ){
              // debugger;
              closeTagIsFounded = true;
            }
            else if(tag.substring(tag.length-2, tag.length) == '/>' ){
              isSingleTag = true;
            }
            tagqueue.push(tag);
          }
        }
        curChar = txt.substr(i).charAt(0);
        if((curChar != '\n') && (curChar != '\r'))
        {
          // debugger;
          if(tag != ''){
            if(toKacrut2.trim()==''){
              toKacrut2 = '';
            }
            else if(toKacrut2!=''){
              kacruthtml.push(toKacrut2);
              toKacrut2 = '';
            }
            toKacrut2 += tag;
            tag = '';
          }
          else{
            if(toKacrut2.trim()==tagqueue[tagqueue.length-1]){
              kacruthtml.push(toKacrut2);
              toKacrut2 = '';
            }
            toKacrut += txt.substr(i).charAt(0);
            toSlice += txt.substr(i).charAt(0);
            toKacrut2 += txt.substr(i).charAt(0);
          }

          if(isSingleTag)
          {
            if(kacruthtml.length > 0){
              kacruthtml.push(toKacrut2);
              toKacrut2 = '';
            }
            isSingleTag = false;
            tagqueue.pop(tag);
          }
          else if(((toSlice.length + 1) >= maxSliceLength) || (i >= (txt.length - 1)) || closeTagIsFounded){
            // debugger;
            var mustToClostTag = false;
            if ((((toSlice.length + 1) >= maxSliceLength) || (i >= (txt.length - 1))) && (!closeTagIsFounded)){
              mustToClostTag = true;
            }
            if((toKacrut != '') && ((toSlice.length + 1) == maxSliceLength) && ((curChar != '.') || (curChar != ','))){
              var decreaseIdx = toSlice.length-1;
              var tmpChar = '';
              var found = false;
              while((decreaseIdx>0) && !found){
                tmpChar = toSlice.substr(decreaseIdx).charAt(0);
                if(tmpChar == '.'){
                  found = true;
                }
                else{
                  decreaseIdx--;
                }
                
              }
              if(!found){
                decreaseIdx = toSlice.length-1;
                while((decreaseIdx>0) && !found){
                  tmpChar = toSlice.substr(decreaseIdx).charAt(0);
                  if(tmpChar == ','){
                    found = true;
                  }
                  else{
                    decreaseIdx--;
                  }
                  
                }
              }
              if(!found){
                decreaseIdx = toSlice.length-1;
                while((decreaseIdx>0) && !found){
                  tmpChar = toSlice.substr(decreaseIdx).charAt(0);
                  if(tmpChar == ' '){
                    found = true;
                  }
                  else{
                    decreaseIdx--;
                  }
                }
              }
              if(found){
                // debugger;
                var decreaseNum = (toSlice.length-1) - decreaseIdx;
                var sliceLength = toSlice.length;
                i -= decreaseNum;
                curChar = txt.substr(i).charAt(0);
                toSlice = toSlice.substring(0, decreaseIdx+1);
                toKacrut = toKacrut.substring(0, decreaseIdx+1);
                if(closeTagIsFounded){
                  toKacrut2 = toKacrut2.replace(tagqueue[tagqueue.length-1],'');
                  toKacrut2 = toKacrut2.substring(0, toKacrut2.length - decreaseNum );
                  toKacrut2 += tagqueue[tagqueue.length-1];
                }else{
                  // debugger;
                  toKacrut2 = toKacrut2.substring(0, toKacrut2.length - decreaseNum);
                }
              }
            }
            //
            // debugger;
            var tmpCloseTag = '';
              
            if(mustToClostTag){
              // debugger;
              tmpCloseTag = '<'+'/'+tagqueue[tagqueue.length-1].substring(1, tagqueue[tagqueue.length-1].indexOf(' ')) + '>';
              
              // toKacrut2 += tmpCloseTag;
              i++;
              txt = txt.splice( i, 0, tmpCloseTag );
              i += tmpCloseTag.length-1;
              curChar = txt.substr(i).charAt(0);
              i ++;
              curChar = txt.substr(i).charAt(0);
              txt = txt.splice( i, 0, tagqueue[tagqueue.length-1] );
              curChar = txt.substr(i).charAt(0);
              mustToClostTag = false;
              tagqueue.pop(tag);
              i--;
            }

            if(closeTagIsFounded){
              if(toSlice.trim()!=''){
                kacrut.push(toKacrut);
                slices.push(toSlice.trim());  
              }
              kacruthtml.push(toKacrut2);

              closeTagIsFounded = false;
              tagqueue.pop(tag);
              tagqueue.pop(tag);
            }else{
              kacrut.push(toKacrut);
              slices.push(toSlice.trim());
              kacruthtml.push(toKacrut2);
              if(tmpCloseTag!=''){
                kacruthtml.push(tmpCloseTag);
              }
            }              
            toKacrut2 = '';
            toKacrut = '';
            toSlice = '';
            tmpCloseTag ='';
          }

        }
      }
      kacruthtmllgt = kacruthtml.length;
      debugger;
      return slices;
    };



    /**
     * Fetch and play the speech audio for given text and language.
     *
     * @param txt the text.
     * @param lang the language of the text. If omitted then default language is used.
     * @param cb Completion callback with signature (err).
     */
    self.play = function(txt, lang, cb) {
      self.getPlayer(function (err, player) {
        if (err) return cb(err);
        if (!player) return cb(new Error('No playback mechanism is available'));

        var urls = self.urls(txt, lang),
          _playFn = null;

        (_playFn = function(err) {
          if (err) return cb(err);
          if (0 >= urls.length) return cb();

				/*if (audios.length > 0){
					var a = audios.shift();
					a.play();
				}*/
			  //draw text
			
				player.play(urls.shift(), _playFn);
			
        }).call();
      });
    };
  };


  // OOP inheritance
  var _inherits = function( childConstructor, ParentClassOrObject ) {
    childConstructor.prototype = new ParentClassOrObject;
    childConstructor.prototype.constructor = childConstructor;
    childConstructor.prototype.parent = ParentClassOrObject.prototype;
  };


  /**
   * Represents a playback mechanism.
   * @constructor
   */
  TTS.Player = function() {
    var self = this;

    /**
     * Get whether this playback mechanism is available for use.
     * @param cb Function Result callback (Boolean available)
     */
    self.available = function(cb) { throw new Error('Not yet implemented'); };


    /**
     * Play given URL.
     * @param url String
     * @param cb Function Called after we finish playing (Error err)
     */
    self.play = function(url, cb) { throw new Error('Not yet implemented'); };


    /**
     * Get name of this player.
     */
    self.toString = function() { throw new Error('Not yet implemented'); };
  };

  /**
   * Playback using HTML5 Audio.
   * @constructor
   */
  TTS.HTML5Player = function() {
    var self = this;

    self._available = null;

    self.available = function(cb) {
      if (null === self._available) {

        // check if HTML5 audio playback is possible
        (function(next) {
          try {
            if ('undefined' === typeof window.Audio)
              return next(null, false);

            var audio = new Audio();

            //Shortcut which doesn't work in Chrome (always returns ""); pass through
            // if "maybe" to do asynchronous check by loading MP3 data: URI
            if('probably' === audio.canPlayType('audio/mpeg'))
              return next(null, true);

            //If this event fires, then MP3s can be played
            audio.addEventListener('canplaythrough', function() {
              next(null, true);
            }, false);

            //If this is fired, then client can't play MP3s
            audio.addEventListener('error', function() {
              next(null, false);
            }, false);

            //Smallest base64-encoded MP3 I could come up with (less than 0.000001 seconds long)
            audio.src = "data:audio/mpeg;base64,/+MYxAAAAANIAUAAAASEEB/jwOFM/0MM/90b/+RhST//w4NFwOjf///PZu////9lns5GFDv//l9GlUIEEIAAAgIg8Ir/JGq3/+MYxDsLIj5QMYcoAP0dv9HIjUcH//yYSg+CIbkGP//8w0bLVjUP///3Z0x5QCAv/yLjwtGKTEFNRTMuOTeqqqqqqqqqqqqq/+MYxEkNmdJkUYc4AKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";

            audio.load();
          }
          catch(e){
            next(e);
          }
        })(function (err, canPlay) {
          if (err) console.log(err);

          self._available = canPlay;

          cb(self._available);
        });

        return;
      }

      cb(self._available);
    };

    self.play = function(url, cb) {
      // load the MP3
	  try {
        var audio = new Audio();
        audio.src = url;
		
        audio.addEventListener('ended', function() {
			playAudio(i);
			i++;
        });
        audio.addEventListener('play', function() {
        });
        audio.addEventListener('canplay', function() {
			console.log("loading another audio...");
			cb();
        });
		//console.log("asep: " + i);
		//i++;
        //audio.play();
		audios.push(audio);
		
		// debugger;
		if (i==0){
			playAudio(i);
			i++;
		}
		/*$("#frame").attr("src",url);
		$("#frame").on("load", function(){
			debugger;
			cb();
		});*/
      } catch (e) {
        return cb(e);
      }
    };

    self.toString = function() { return 'HTML5 Audio'; };
  };
  _inherits(TTS.HTML5Player, TTS.Player);


  /**
   * Playback using SoundManager2 (https://github.com/scottschiller/SoundManager2).
   * @constructor
   */
  TTS.SM2Player = function() {
    var self = this;

    self._available = null;
    self._soundId = 0;
    self._unique_instance_id = parseInt(Math.random() * 1000, 10);

    self.available = function(cb) {
      if (null === self._available) {
        if ('undefined' !== typeof window.soundManager && 'function' === typeof window.soundManager.ok) {
          self._available = window.soundManager.ok();
        }
      }

      cb(self._available);
    };

    self.play = function(url, cb) {
      try {
        (window.soundManager.createSound({
          id: 'googletts-' + self._unique_instance_id + '-' + (++self._soundId),
          url: url,
          onfinish: cb
        })).play();
      } catch (err) {
        cb(err);
      }
    };

    self.toString = function() { return 'SoundManager2'; };
  };
  _inherits(TTS.SM2Player, TTS.Player);


  return TTS;
});
