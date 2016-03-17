'use strict';

(function () {

    angular
        .module('whatsPupIonic')
        .controller('Info', Info);

    /** @ngInject */

    function Info($scope, $ionicSlideBoxDelegate ) {
        var vm = this;
        $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
        $ionicSlideBoxDelegate.enableSlide(true);
}
        

    }

})();