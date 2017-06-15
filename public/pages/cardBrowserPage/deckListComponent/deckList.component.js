(function() {
    'use strict';

    angular
        .module('app')
        .component('decklistComponent', decklistComponent());

    function decklistComponent() {
        return {
            bindings: {
                // nameLabel: '@',
                // namePlaceholder: '@',
                // ageLabel: '@',
                // agePlaceholder: '@',
                // onClick: '&',
                // blaVar: '@'
            },
            templateUrl: 'pages/cardBrowserPage/deckListComponent/deckList.component.html'

        };
    }
}());

