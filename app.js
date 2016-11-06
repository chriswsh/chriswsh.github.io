/* Note - For ease of download and display, I've got the JavaScript in one file      */
/* For a production environment, separation into modules and minification, of course */

`use strict`;
var myApp = angular.module(`portfolioApp`, [`ngRoute`], function($httpProvider) {
/* from http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/ */
    
    $httpProvider.defaults.headers.post[`Content-Type`] = `application/x-www-form-urlencoded;charset=utf-8`;

 /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */ 
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for(name in obj) {
      value = obj[name];

      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];

});

// Set Up Routes
myApp.config([`$routeProvider`, function($routeProvider) {
    $routeProvider
    .when ("/", {
        templateUrl: `pages/landing.html`,
        controller: `subController`
    })
    .when ("/ui", {
        templateUrl: `pages/ui.html`,  
        controller: `subController`
    })
    .when ("/responsive", {
        templateUrl: `pages/responsive.html`,
        controller: `subController`
    })
    .when ("/techdoc", {
        templateUrl: `pages/tech.html`,
        controller: `subController`
    })
    .when ("/contact", {
        templateUrl: `pages/contact.html`,
        controller: `subController`
    })
    .when ("/404", {
        templateUrl: `pages/404.html`,
        controller: `subController`
    })
    .otherwise({
        redirectTo: `/404`
    });
}])
// Config Nav Bar - Will Pull from DB Later/Defining Data Structures/Hard Coded for Now
.config([`navProviderProvider`, function(navProviderProvider) {
    navProviderProvider.configNav([
                      {text: `UX/UI Design`, url: `/ui`},
                      {text: `Responsive Web Development`, url: `/responsive`},
                      {text: `Technical Documentation`, url: `/techdoc`},
                      {text: `Contact Me`, url: `/contact`}]);
}])
// Config Portfolio Sites - Will Pull from DB Later/Defining Data Structures/Hard Coded for Now
.config([`portfolioProviderProvider`, function(portfolioProviderProvider) {
    portfolioProviderProvider.configPortfolio([{
        title: `The Long Shot Photography Contest`,
        imgSmall: `/images/longshot-med.png`,
        imgSmallAlt: `The Long Shot Photography Contest`,
        imgLarge: `/images/longshot-large.png`,
        imgLargeAlt: `The Long Shot Photography Contest`,
        text: [`For the Long Shot Photography Contest, I created an online home: user profiles, uploadable image galleries, and automated contest scheduling. All in an unassuming, dark frame to accentuate the art.`,
               `I built the front end with HTML/CSS/Javascript (jQuery), and the back end with PHP/MySQL.`]},
        
        {title: `Gunborn: The Cygnei Saga`,
        imgSmall: `/images/gunborn-med.png`,
        imgSmallAlt: `Gunborn: The Cygnei Saga`,
        imgLarge: `/images/gunborn-large.png`,
        imgLargeAlt: `Gunborn: The Cygnei Saga`,
        text: [`Gunborn was a collaboration with Idaho area web developer/sci-fi nerd John Ammon. He had a costume idea and wanted a universe to go with it.`,
               `Photoshop design by John Ammon. Custom theming over Drupal (HTML/CSS/PHP) by Chris Wong Sick Hong.`]},
        
        {title: `My Author Website`,
        imgSmall: `/images/book-med.png`,
        imgSmallAlt: `My Author Website`,
        imgLarge: `/images/book-large.png`,
        imgLargeAlt: `My Author Website`,
        text: [`I'm not just the paid shill. I'm also a client. (Does that line still work?)`,
               `Custom theming over Drupal (HTML/CSS/PHP). Icon fonts. Dreams.`]}
    ]);
}])
// Config Dialog Box Entries - Will Pull from DB Later/Defining Data Structures/Hard Coded for Now
.config([`dialogProviderProvider`, function(dialogProviderProvider) {
    dialogProviderProvider.configDialog([{
        key: `emailSuccess`,
        titleFirstWord: `Email`,
        titleRestWords: `Sent`,
        message: [`Thanks for contacting me! I'll reach out to you shortly with a reply.`],
        okLabel: `Cool!`,
        retryLabel: ``,
        cancelLabel: ``},
       
        {key: `emailMalformed`,
        titleFirstWord: `Email`,
        titleRestWords: `Not Sent`,
        message: [`Hmm...something about your e-mail doesn't smell right.`, `Did you remember to fill out all fields?`],
        okLabel: ``,
        retryLabel: ``,
        cancelLabel: `Return`},
        
        {key: `emailFailure`,
        titleFirstWord: `Email`,
        titleRestWords: `Not Sent`,
        message: [`Uh-oh. E-mail services are down right now, but we're working to fix this as soon as possible.`, `In the meantime, feel free to contact me at chris (at) chriswsh (dot) com or (918) 271-9352.`],
        okLabel: ``,
        retryLabel: ``,
        cancelLabel: `Return`}                                        
    ]);

/*
    dialogProviderProvider.configDialog([{
        key: `emailSuccess`,
        titleFirstWord: `Email`,
        titleRestWords: `Sent`,
        message: `<p>Thanks for emailing! A confirmation will be sent shortly.</p><p>(Check your spam folder if it doesn't arrive.)</p>`,
        okLabel: `Cool!`,
        retryLabel: ``,
        cancelLabel: ``},
       
        {key: `emailMalformed`,
        titleFirstWord: `Email`,
        titleRestWords: `Not Sent`,
        message: `<p>Hmm...something about your e-mail doesn't smell right.</p><p>Did you remember to fill out all fields</p>`,
        okLabel: ``,
        retryLabel: ``,
        cancelLabel: `Return`},
        
        {key: `emailFailure`,
        titleFirstWord: `Email`,
        titleRestWords: `Not Sent`,
        message: `<p>Uh-oh. E-mail services are down right now, but we're working to fix this as soon as possible.</p><p>In the meantime, feel free to contact me at chris (at) chriswsh (dot) com or (918) 271-9352.</p>`,
        okLabel: ``,
        retryLabel: ``,
        cancelLabel: `Return`}                                        
    ]);
*/

}]);

// Set Up Nav Bar Provider
// Entry Text Provided During Config Phase
myApp.provider(`navProvider`, function(){
    var _defaultEntry = {firstWord: `Error`, nextWords: `Nav Config`, url: `#`, active: false};
    var _navEntries = [];
    var _activePath = ``;
    var _tmpText = ``;
    
    // Parses Nav Entry Objects Into the Format Expected by ng-repeat on index.html
    // Expects arguments[0].text to be the link text
    // Expects arguments[0].url to be the url
    var _parseNavEntry = function() {
        // Add failure message if expected data isn't present
        if (typeof arguments[0].text !== `string` || typeof arguments[0].url !== `string`) {
            _navEntries.push(_defaultEntry);
        }
        else {
            if (arguments[0].text.indexOf(` `) === -1) {
                _navEntries.push({firstWord: arguments[0].text,
                                  nextWords: ``,
                                  url: arguments[0].url,
                                  active: false});              
            }
            else {
                // Slice at first space
                _navEntries.push({firstWord: arguments[0].text.slice(0, arguments[0].text.indexOf(` `)),
                                  nextWords: arguments[0].text.slice(arguments[0].text.indexOf(` `)),
                                  url: arguments[0].url,
                                  active: false});
            }
        }
    }
    
    // Set the Active State on a Nav Bar Entry if it Matches Current Path
    var _setActiveIfActive = function(navEntry) {
        // navEntry.url now begins with `/`, and _active path begins with `/`
        if (navEntry.url === _activePath) {
            navEntry.active = true;
        }
        else {
            navEntry.active = false; 
        }
    }
 
    // Set the nav bar text
    // Expects an array of objects {text: `full text`, url: `#SPAurl`}
    this.configNav = function(aNavObjects){
        // Make sure we've got an array
        // If that fails, we'll only see one
        if (!Array.isArray(aNavObjects)) {
            _navEntries.push(_defaultEntry);
            return false;
        }
        
        // Now, do the stuff that's magic
        aNavObjects.forEach(_parseNavEntry);
    } 
    
    this.$get = function() {
        return {
            // Lets the controller get the nav bar entries
            getNavBar: function() {
                return _navEntries;
            },
            
            // Lets the controller set the active link
            setActiveLink: function(path) {
                _activePath = path;
                _navEntries.forEach(_setActiveIfActive);
            }
        }
    }
    
});

// Set Up Portfolio Site Provider
// Information Provided During Config Phase
myApp.provider(`portfolioProvider`, function() {
    var _defaultEntry = {
        title: `Portfolio Provider Config Error`,
        imgSmall: ``,
        imgSmallAlt: ``,
        imgLarge: ``,
        imgLargeAlt: ``,
        text: [`Please check the config code for portfolioProvider.`]
    }
    var _portfolioEntries = [];
    
    // Expects that the passed object follows the data format of _defaultEntry
    // TO DO: Upgrade to TypeScript interface
    var _parsePortfolioEntry = function() {
        if (typeof arguments[0].title !== `string` || typeof arguments[0].imgSmall !== `string` || typeof arguments[0].imgSmallAlt !== `string`
            || typeof arguments[0].imgLarge !== `string` || typeof arguments[0].imgLargeAlt !== `string` || !Array.isArray(arguments[0].text)) {
            _portfolioEntries.push(_defaultEntry);
        }
        else {
            _portfolioEntries.push(arguments[0]);
        }
    }
    
    // Set website portfolio info
    // Expects an array of objects formatted according to the default entry
    this.configPortfolio = function(aPortfolioObjects) {        
        // Make sure we've got an array
        // If that fails, we'll only see one
        if (!Array.isArray(aPortfolioObjects)) {
            _portfolioEntries.push(_defaultEntry);
            return false;
        }
        
        // Now, add each individually so the objects can be checked for proper formatting
        aPortfolioObjects.forEach(_parsePortfolioEntry);
    }
    
    this.$get = function () {
        return {
            getPortfolio: function () {
                return _portfolioEntries;
            }
        }
    }
});

// Set Up Dialog Provider
// Info Provided During Config Phase
myApp.provider(`dialogProvider`, function() {
    var _defaultEntry = {
        titleFirstWord: `Dialog`,
        titleRestWords: `Config Error`,
        message: [`There was an error configuring the dialog provider.`],
        okLabel: `OK`,
        retryLabel: `Retry`,
        cancelLabel: `Cancel`
    }
    
    var _dialog = {}
    
    // Expects that the passed object follows the data format of _defaultEntry, in addition to a key
    // TO DO: Upgrade to TypeScript interface
    var _parseDialogEntry = function () {
        if (typeof arguments[0].key !== `string` || typeof arguments[0].titleFirstWord !== `string` || typeof arguments[0].titleRestWords !== `string` || !Array.isArray(arguments[0].message) || typeof arguments[0].okLabel !== `string` || typeof arguments[0].retryLabel !== `string` || typeof arguments[0].cancelLabel !== `string`) return false;
        
        // Add the items to the argument object under the appropriate key
        // Overwrite if the key already exists
        _dialog[arguments[0].key] = arguments[0];
    }
    
    // Sets dialog items
    // Expects an array of objects formatted according to the default entry,
    // along with a key to add to the object
    this.configDialog = function(aDialogObjects) {
        // Make sure we've got an array
        // If not, abort
        
        if (!Array.isArray(aDialogObjects)) {
            alert('Not Array');
            return false;
        }
        
        aDialogObjects.forEach(_parseDialogEntry);
    }

    this.$get = function () {
        return {
            getDialog: function(key) {
                // Return the dialog entry if the key exists
                // Otherwise, return the default entry
                var _o = {}
                if (_dialog.hasOwnProperty(key)) {
                    _o = _dialog[key];
                }
                else {
                    _o = _defaultEntry;
                }
                
                // Default to modal
                if (typeof arguments[1] === `boolean`) {
                    _o.modal = arguments[1];
                }
                else {
                    _o.modal = true;
                }

                return _o;
            }
        }
    }
});

// Set Up Small Print Directive
myApp.directive(`smallPrint`, function() {
   return {
       restrict: `E`,
       templateUrl: `directives/smallprint.html`
   }
});

// Set Up Portfolio Site Directive
myApp.directive(`portfolioSite`, function() {
   return {
       restrict: `E`,
       require: `^parentController`,
       scope: {
           data: '='
       },
       templateUrl: `directives/portfoliosite.html`
   } 
});

// Set up Dialog Box Directive
myApp.directive(`wshDialog`, function($compile) {
    return {
        restrict: `E`,
        require: `^parentController`,
        scope: {
            data: `=`,
            close: `&`
        },
        templateUrl: `directives/wshdialog.html`
    }
});

/*
// Set up Dialog Box Directive - more complicated version, in progress for now
myApp.directive(`wshDialog`, function($compile) {
    var linker = function(scope, elem, attrs, controllers) { 
        alert ('linker');
        var el = angular.element(scope.data.message);
        console.log(elem);
        elem.append(el);

        document.querySelector('.wsh-Dialog-message').append("<b>Test</b>");
    }
    
    return {
        restrict: `E`,
        transclude: true,
        require: `^parentController`,
        scope: {
            data: `=`,
            close: `&`
        },
        templateUrl: `directives/wshdialog2.html`,
        link: linker,
        controller: [`$scope`, function wshDialogController($scope) {
            $scope.test = $scope.data.message;
        }]
    }
});
*/

// Testing AJAX service
myApp.service(`contactService`, [`$log`, `$http`, function($log, $http){
    
}]);

// Redirect Service
myApp.service(`redirectService`, [`$timeout`, `$q`, function ($timeout, $q) {
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
        
        // turn delay into an integer >= 1
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
    
    // Reset the timer
    this.resetTimer = function(delay, path) {
        
    }
    
    // Cancel the timer and reject promise
    this.cancelTimer = function() {
        if (!_active)
        _active = false;
        $timeout.cancel(_currentCall);
        _currentCall = null;
        _defer.reject(`Timer cancelled`);
        
    }
    
    // Check if the timer is active
    this.isActive = function() {
        if (_active) return true;
        return false;
    }
}]);

// Parent Controller
myApp.controller(`parentController`, [`$scope`, `$location`, `$http`, `$window`, `navProvider`, `portfolioProvider`, `dialogProvider`, `redirectService`, function($scope, $location, $http, $window, navProvider, portfolioProvider, dialogProvider, redirectService) {
    _responseCode = {
        yes: 1,
        no: 0,
        cancel: -1
    }
    
    $scope.navBar = navProvider.getNavBar();
    $scope.portfolio = portfolioProvider.getPortfolio();
    $scope.rerouteTimer = 0;
        
    $scope.dialog = {}
    $scope.email = {
        contact: ``,
        contactError: ``,
        from: ``,
        fromError: ``,
        message: ``,
        messageError: ``,
        success: true
    }
    $scope.emailDirty = false;
    
    $scope.changePath = function(path) {
        if ($location.path())
        $location.path(path);
    }
    
    $scope.resetEmail = function () {
        $scope.email = {
            contact: ``,
            contactError: ``,
            from: ``,
            fromError: ``,
            message: ``,
            messageError: ``,
            success: true
        }
        
        document.getElementById(`contact-name`).focus();
    }

    // Setting object equality to true in order to check for changes in object properties
    $scope.$watch(`email`, function(newValue, oldValue, scope) {
        if (newValue.contact !== `` || newValue.from !== `` || newValue.message !== ``) {
            $scope.emailDirty = true;
        } else {
            $scope.emailDirty = false;
        }
        
        if ($scope.email.contact === ``) {
            $scope.email.contactError = `Please enter your name.`;
        }
        else {
            $scope.email.contactError = ``;
        }
        
        if (($scope.email.from === `` || typeof $scope.email.from === `undefined`)) {
            $scope.email.fromError = `Please enter your e-mail address.`;
        }
        else {
            $scope.email.fromError = ``;
        }
        
        if ($scope.email.message === ``) {
            $scope.email.messageError = `We'd prefer not to send a blank message.`;
        }
        else {
            $scope.email.messageError = ``;
        }
    }, true);
    
    // Catch the path change event emitted from the subcontroller
    $scope.$on(`pathChange`, function (event, newPath) {
        // Cancel the redirect timer if it's active
        if (redirectService.isActive()) redirectService.cancelTimer();
        
        // Cancel any dialog boxes
        if ($scope.dialog.active) $scope.dialog.active = false;

        navProvider.setActiveLink(newPath);
        
        /* Initiate reload timer if this is the 404 page */
        if (newPath === `/404`) {            
            // Set a timer for 30 seconds until redirect to '/'
            redirectService.initTimer(30, `/`)
            .then(function onSuccess(newPath) {
                $scope.rerouteTimer = 0;
                $scope.changePath(newPath);
            }, function onFailure(message) {
                $scope.rerouteTimer = 0;
            }, function onNotify(message) {
                $scope.rerouteTimer = message;
            });
        }
        
        if (newPath === `/contact`) {
            
        }

        // Scroll to the top of each page on change
        $window.scrollTo(0,0);
    });
    
    // Send e-mail - put in email service later
    $scope.sendEmail = function() {
        var _ok = true;
        // Data validation errors go higher
        // Check for empty fields
        if ($scope.email.contact === ``) _ok = false;
        
        if ($scope.email.from === `` || typeof $scope.email.from === `undefined`) _ok = false;
        
        if ($scope.email.message === ``) _ok = false;

        if (!_ok) {
            $scope.dialog = dialogProvider.getDialog(`emailMalformed`, true);
            $scope.dialog.active = true;
            return false;
        }
        
        $http.post(`https://www.chriswsh.com/php/email.php`, $scope.email).then(function onSuccess(response) {
            if (response.data === `1`) {
                $scope.dialog = dialogProvider.getDialog(`emailSuccess`, true);
                $scope.dialog.active = true;
            }
            else {
                $scope.dialog = dialogProvider.getDialog(`emailFailure`, true);
                $scope.dialog.active = true;
            }
        })
        .catch(function onFailure(response) {
            $scope.dialog = dialogProvider.getDialog(`emailFailure`, true);
            $scope.dialog.active = true;
        });
    }
    
    // Close the dialog box by unsetting the object, and ng-if takes care of the rest
    // $scope.dialog.active no longer exists, ng-if evaluates as false
    $scope.closeDialog = function (responseCode) {
        if ($scope.dialog.key === `emailSuccess` && responseCode === 1) {
            $scope.resetEmail();
        }
        $scope.dialog = null;
    }
}]);

// Child Contoller - All it currently does is notify the parent controller of the path change
// Will add more, based on $location.path(), as page gets more complex
myApp.controller(`subController`, [`$scope`, `$location`, function($scope, $location) {
    $scope.$emit(`pathChange`, $location.path());
}]);
