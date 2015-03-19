// All credits go to angular team
angular.module('minMaxValidations', [
]).directive('yaMin', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            var minVal;
            ctrl.$validators.min = function(value) {
                return ctrl.$isEmpty(value) || angular.isUndefined(minVal) || value >= minVal;
            };
            scope.$watch(attrs.yaMin, function(value) {
                if (angular.isDefined(value) && !angular.isNumber(value)) {
                    value = parseFloat(value, 10);
                }
                minVal = angular.isNumber(value) && !isNaN(value) ? value : undefined;
                ctrl.$validate();
            });
        }
    };
}).directive('yaMax', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            var maxValue;
            ctrl.$validators.max = function(value) {
                return ctrl.$isEmpty(value) || angular.isUndefined(maxValue) || value <= maxValue;
            };

            scope.$watch(attrs.yaMax, function(value) {
                if (angular.isDefined(value) && !angular.isNumber(value)) {
                    value = parseFloat(value, 10);
                }
                maxValue = angular.isNumber(value) && !isNaN(value) ? value : undefined;
                ctrl.$validate();
            });
        }
    };
});