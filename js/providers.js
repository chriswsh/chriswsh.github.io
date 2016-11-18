`use strict`;
angular.module(`portfolioApp`).provider(`navProvider`, function(){
// Set Up Nav Bar Provider
// Entry Text Provided During Config Phase
    
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
    
}).provider(`portfolioProvider`, function() {
// Set Up Portfolio Site Provider
// Information Provided During Config Phase
    
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
}).provider(`dialogProvider`, function() {
// Set Up Dialog Provider
// Info Provided During Config Phase
    
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