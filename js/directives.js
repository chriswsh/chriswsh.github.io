`use strict`;
angular.module(`portfolioApp`).directive(`smallPrint`, function() {
// Set Up Small Print Directive
   return {
       restrict: `E`,
       templateUrl: `directives/smallprint.html`
   }
}).directive(`portfolioSite`, function() {
// Set Up Portfolio Site Directive
   return {
       restrict: `E`,
       require: `^parentController`,
       scope: {
           data: '='
       },
       templateUrl: `directives/portfoliosite.html`
   } 
}).directive(`wshDialog`, function() {
// Set up Dialog Box Directive
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