angular.module('minMaxValidations', [
]).directive('yaMin', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            var minValue;
            var strict = attrs.hasOwnProperty('yaMinStrict');
            ctrl.$validators.min = function(value) {
                if (ctrl.$isEmpty(value) || angular.isUndefined(minValue)) {
                    return true;
                } else {
                    var valueAsNumber = angular.isNumber(value) ? value : parseFloat(value, 10);
                    return strict ? valueAsNumber > minValue : valueAsNumber >= minValue;
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
            var strict = attrs.hasOwnProperty('yaMaxStrict');
            ctrl.$validators.max = function(value) {
                if (ctrl.$isEmpty(value) || angular.isUndefined(maxValue)) {
                    return true;
                } else {
                    var valueAsNumber = angular.isNumber(value) ? value : parseFloat(value, 10);
                    return strict ? valueAsNumber < maxValue : valueAsNumber <= maxValue;
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
