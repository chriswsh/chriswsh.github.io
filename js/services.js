`use strict`;
angular.module(`portfolioApp`).service(`emailService`, [`$http`, function($http){
// E-mail service. Still under construction, not currently in use
    
    var _address = ``;
    
    this.setAddress = function (newAddress) {
        if (typeof newAddress === `string`) {
            _address = newAddress;
            return true;
        }
        else {
            return false;
        }
    }
}]).service(`redirectService`, [`$timeout`, `$q`, function ($timeout, $q) {
    var _active = false;
    var _currentCall = null;
    var _defer = null;
    
    // Bind a then to the promise so that angular won't ignore notify calls
    // This should never be called before the angular context is active, so not necessary
    // _defer.promise.then(null, null, angular.noop);
    
    var _timer = function(count, path) {
        if (!_active) _defer.reject('Timer cancelled');
        
        if (count <= 0) {
            // Resolve with the redirect path
            _defer.resolve(path);
        }
        else {
            // Notify the controller of counting down
            _defer.notify(count--);
            // Store the current timeout promise so it can be cancelled
            // only one of these should be in a deferred Promise state at one time,
            // so I'm reassigning it each time the function runs
            // dirty model checking is false, because this doesn't touch the angular model
            _currentCall = $timeout(_timer, 1000, false, count, path);
        }
    }
    
    // Initiate the timer
    // Expects a delay (in seconds) and a new path (string)
    this.initTimer = function(delay, path) {
        // If the timer is already active, notify
        if (_active) {
            _defer.notify(`Timer already active - cannnot initiate`);
        }
        
        // check for correct types
        if (typeof delay !== `number` || typeof path !== `string`) return false;
        
        // turn delay into an integer >= 0
        delay = delay >> 0;
        if (delay < 0) delay = 0;

        // set active state
        _active = true;
        
        // set up deferral so we can use notify()
        _defer = $q.defer();
        
        // start the timer...using a delay of 1ms so the initial notify will trigger
        // dirty model checking is false, because this doesn't touch the angular model
        $timeout(_timer, 1, false, delay, path);
        
        // return the deferred promise
        return _defer.promise;
    }
    
    // Cancel the timer and reject promise
    this.cancelTimer = function() {
        if (!_active)
        _active = false;
        $timeout.cancel(_currentCall);
        _currentCall = null;
        _defer.reject(`Timer cancelled`);
        
    }
    
    // Reset the timer
    /*
    I'm not sure if this functionality adds anything beyond cancelTimer and initTimer.
    It may confuse the issue in the controller. Making the calls to cancelTimer and initTimer
    explicit may help keep the logic clearer. I'm still up in the air on this one.
    this.resetTimer = function(delay, path) {
    } */
    
    // Check if the timer is active
    this.isActive = function() {
        if (_active) return true;
        return false;
    }
}]);