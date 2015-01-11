angular.module('autositeApp').directive('ngWidth', function() {
  return function(scope, element, attrs) {
    scope.$watch(attrs.ngWidth, function(value) {
      element.attr('width', value);
    });
  };
});

angular.module('autositeApp').directive('ngHeight', function() {
  return function(scope, element, attrs) {
    scope.$watch(attrs.ngHeight, function(value) {
      element.attr('height', value);
    });
  };
});

angular.module('autositeApp').directive('icon', function(){

  var defaults = {
    size: 16,
    fill: "#acacac"
  };

  return {
    restrict: 'E',
    scope: {
    },
    transclude: false,
    link: function(scope, ele, attrs){

      ele.bind('click', function (e) {
//    	  e.preventDefault();
      });

      scope.iconSrc = 'assets/images/icons/icon_'+attrs.type+'.svg';

      switch(attrs.size){
        case 'small':
          scope.width = scope.height = '16';
          break;
        case 'medium':
          scope.width = scope.height = '32';
          break;
        case 'large':
          scope.width = scope.height = '64';
          break;
        default:
          scope.width = attrs.width ? attrs.width : defaults.size;
          scope.height = attrs.height ? attrs.height : defaults.size;
      }

      if(!attrs.width && !attrs.size){
        //grab [width]x[height]_iconType from "type"
        var posX = attrs.type.indexOf('x');
        var posUS = attrs.type.indexOf('_');

        if(posX != -1 && posUS != -1){
          scope.width = attrs.type.substr(0, posX);
          scope.height = attrs.type.substr(posX+1, posUS-posX-1);
        }else{
          scope.width = attrs.width ? attrs.width : defaults.size;
          scope.height = attrs.height ? attrs.height : defaults.size;
        }
      }

      scope.fill = attrs.fill ? attrs.fill : defaults.fill;
      scope.offsetX = attrs.x ? attrs.x : 0;
      scope.offsetY = attrs.y ? attrs.y : 0;
      scope.id = attrs.id ? attrs.id : '';

    },
    template: '<div ng-include="iconSrc" style="left: {{offsetX}}px; top: {{offsetY}}px; display: inline-block; width: {{width}}px; height: {{height}}px;"></div>'
  }
});
