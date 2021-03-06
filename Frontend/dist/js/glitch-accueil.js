$( function() {
            $( ".hacker" ).mgGlitch({
              destroy : false, // set 'true' to stop the plugin
              glitch: true, // set 'false' to stop glitching
              scale: false, // set 'false' to stop scaling
              blend : true, // set 'false' to stop glitch blending
              blendModeType : 'hue', // select blend mode type
              glitch1TimeMin : 1200, // set min time for glitch 1 elem
              glitch1TimeMax : 1800, // set max time for glitch 1 elem
              glitch2TimeMin : 20, // set min time for glitch 2 elem
              glitch2TimeMax : 230, // set max time for glitch 2 elem
              zIndexStart : 8, // because of absolute position, set z-index base value
            });
        });

        $( function() {
            $( ".date" ).mgGlitch({
              destroy : false, // set 'true' to stop the plugin
              glitch: true, // set 'false' to stop glitching
              scale: false, // set 'false' to stop scaling
              blend : true, // set 'false' to stop glitch blending
              blendModeType : 'hue', // select blend mode type
              glitch1TimeMin : 1800, // set min time for glitch 1 elem
              glitch1TimeMax : 4400, // set max time for glitch 1 elem
              glitch2TimeMin : 45, // set min time for glitch 2 elem
              glitch2TimeMax : 520, // set max time for glitch 2 elem
              zIndexStart : 8, // because of absolute position, set z-index base value
            });
        });

    /* ----------------------- 
        GLOBALS 
     -------------------------*/
    var i = 0;
    var j = 0;
    var k = 0;
    var lengthSentence = 0;
    var forward = false;
    var beginning = "Festival des arts numériques";
    var currentPart = "";
    var interval = 150; // interval letter
    var opening = false;
    var pauseEnd = 2500; // pause end sentence

    /* ----------------------- 
        TYPING 
    -------------------------*/
    function writing(text) {
        var body = $("body");
        if (!opening) { // first part
            setTimeout(function() {
                if (k < beginning.length) {
                    if (beginning[k] === "<") {
                        k = k + 4;
                    }
                    currentPart += beginning[k];
                    text.html(currentPart);
                    k++;
                    writing(text);
                } else if (k === (beginning.length)) {
                    text.html(currentPart);
                    opening = true;
                    writing(text);
                }
            }, interval);
        }
    }

    /* ----------------------- 
        BACKGROUND LOOP 
    -------------------------*/
    function rand(min, max) {
        return min + Math.random() * (max - min);
    }

    /* ----------------------- 
        NOOB SHIT 
    -------------------------*/

    $(document).ready(function() {
        /*--------------------
            TYPING 
        ----------------------*/
        var firstTimer = 1500;
        var text = $(".jstext");
        setTimeout(function() {
            writing(text);
        }, firstTimer);

    });