angular.module('autositeApp').directive('tooltip', function(){

  var defaults = {
    position: "bottom",
    content : "Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin libero non leo consequat, ac placerat nisi placerat Nullam. Velit odio, vehicula eu auctor ut, volutpat sed turpis."
  };

  var isMobile = ('ontouchstart' in window && $('body').hasClass('iphone'));
  var getTemplate = function(mobile){
    return ( mobile ? '<icon class="help-icon-label" type="help"></icon>' : '<icon class="help help-icon-label" type="help" data-html="true" data-toggle="popover" data-placement="{{position}}" data-content="{{content}}"></icon>');
  }

  return{
    restrict: 'E',
    scope: {
    },
    transclude: false,
    link: function(scope, ele, attrs){

      scope.content = attrs.content ? attrs.content : defaults.content;
      scope.position = attrs.position ? attrs.position : defaults.position;

      ele.bind('click', function (e) {
        if(isMobile){
          $('#mobileModal-content').html(scope.content);
          $('#mobileModal').modal('show');
        }
      });

    },
    template: getTemplate(isMobile)
  }
});