`use strict`;
angular.module(`portfolioApp`, [`ngRoute`], function($httpProvider) {
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

// Config Nav Bar - Will Pull from DB Later/Defining Data Structures/Hard Coded for Now
angular.module(`portfolioApp`).config([`navProviderProvider`, function(navProviderProvider) {
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
}]);