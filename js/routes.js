`use strict`;
angular.module(`portfolioApp`).config([`$routeProvider`, function($routeProvider) {
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
}]);