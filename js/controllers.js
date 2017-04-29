`use strict`;
angular.module(`portfolioApp`).controller(`parentController`, [`$scope`, `$location`, `$http`, `$window`, `navProvider`, `portfolioProvider`, `dialogProvider`, `redirectService`, function($scope, $location, $http, $window, navProvider, portfolioProvider, dialogProvider, redirectService) {
// Parent Controller
    
    let _responseCode = {
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
        if ($location.path()) $location.path(path);
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
}]).controller(`subController`, [`$scope`, `$location`, function($scope, $location) {
// Child Contoller - All it currently does is notify the parent controller of the path change
// Will add more, based on $location.path(), as page gets more complex
    $scope.$emit(`pathChange`, $location.path());
}]);
