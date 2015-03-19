// All credits go to angular team
angular.module('minMaxValidations', [
]).directive('yaMin', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            var minValue;
            ctrl.$validators.min = function(value) {
                if (ctrl.$isEmpty(value) || angular.isUndefined(minValue)) {
                    return true;
                } else {
                    var valueAsNumber = angular.isNumber(value) ? value : parseFloat(value, 10);
                    return valueAsNumber >= minValue;
                }
            };
            scope.$watch(attrs.yaMin, function(value) {
                if (angular.isDefined(value) && !angular.isNumber(value)) {
                    value = parseFloat(value, 10);
                }
                minValue = angular.isNumber(value) && !isNaN(value) ? value : undefined;
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
                if (ctrl.$isEmpty(value) || angular.isUndefined(maxValue)) {
                    return true;
                } else {
                    var valueAsNumber = angular.isNumber(value) ? value : parseFloat(value, 10);
                    return valueAsNumber <= maxValue;
                }
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