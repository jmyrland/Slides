window.swipemotion = (function(){

    var listeners = {};

	var events = {
        "left" : "swipe-left",
        "right" : "swipe-right"
	}

    var raiseEvent = function(eventName, swipe){
        var listenersToNotify = listeners[eventName] || [];
        for(var i in listenersToNotify){
            listenersToNotify[i](swipe);
        }
    }

    var handleGesture = function(gesture){
        if(gesture.type === "swipe"){
            var startFrameID;
            if(gesture.state === 'stop'){
                var eventName;

                if (gesture.direction[0] > 0){
                    eventName = events.right;
                }else{
                    eventName = events.left;
                }

                raiseEvent(eventName, gesture)
            }
        }
    }

    var init = function(){                
        // listen to Leap Motion gestures
        Leap.loop({enableGestures: true}, function(obj) {
            if (obj.gestures.length > 0) {
                obj.gestures.forEach(handleGesture);
            }
        });
    }

    var injectLeapJsApi = function(){        
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = '//js.leapmotion.com/0.2.1/leap.js';
        s.onload = init;
        document.getElementsByTagName('head')[0].appendChild(s)
    }

    injectLeapJsApi();

	return {
		on : function(eventName, cb){
			listeners[eventName] = listeners[eventName] || [];
			listeners[eventName].push(cb);
		}
	}

})();