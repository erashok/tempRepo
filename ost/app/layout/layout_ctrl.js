'use strict';

/**
 * @ngdoc function
 * @name autositeApp.controller:LayoutCtrl
 * @description
 * # LayoutCtrl
 * Controller of the autositeApp
 */
angular.module('autositeApp')
  .controller('LayoutCtrl', function ($scope, LayoutSvc, ConstantsSvc, $location, $rootScope, WorkflowSvc, QuoteSvc) {

    //browser sniff for IE9, iOS 7 & 8
  	var WUA = window.navigator.userAgent.toLowerCase();

    //flag for showing mobile snoopy on quote page
    $scope.showMobileSnoopy = false;

    if(navigator.appName.indexOf("Internet Explorer")!=-1 && WUA.indexOf("msie 9") > -1){
      	document.body.className += ' ie9';
    } else if(WUA.indexOf('cpu os 8_') > -1 && WUA.indexOf('version/8.') > -1){
	    document.body.className += ' ios8';
    } else if (WUA.indexOf('cpu os 7_') > -1 && WUA.indexOf('version/7.') > -1){
      document.body.className += ' ios7';
    }

    //append touch for mobile
    if('ontouchstart' in window){
      document.body.className += ' touch';
    }

    //lockdown screen zoom for iphone
    var metas = document.getElementsByTagName('meta');
    if(WUA.match(/(iphone)/g)){
      document.body.className += ' iphone';
      for (var i=0; i<metas.length; i++) {
        if (metas[i].name == "viewport") {
          metas[i].content += ", user-scalable=no";
        }
      }
    }


    $scope.prefill = true;
    $scope.isDefaultHeader = null;
    $scope.headerText = null;
    $scope.headerImgSrc = null;
    $scope.selectedWorkflow = 0;
    $scope.messages = {
      add: "I'm a message from the layout controller, I added content."
    };

    $scope.index = ConstantsSvc.ROUTES;
    $scope.workflows = WorkflowSvc.getWorkflows();

    $scope.data = {};
    $scope.secure = false;
    $scope.innerPageMessage = false;

    var updateHeader = function(path) {

      // update these rules to
      // show and hide default header

      if (path == '/' || path == '/home') {
        $scope.isDefaultHeader = true;
      } else {
        $scope.isDefaultHeader = false;
      }

    };

    $scope.selectWorkflow = function($index) {
      $scope.selectedWorkflow = $index;

      // calculate percentage based on index against the number of workflow items
      // progress meters' width is based on this percentage

      var percentage = (($index)/($scope.workflows.length - 1)*100);
      percentage = Math.round((percentage > 100 ? 100 : percentage )*100)/100;
      $('.progress-meter').width(percentage+'%');

    };

    $rootScope.$on('$routeChangeSuccess', function() {
      var currentPath = $location.path();

      $rootScope.$broadcast(ConstantsSvc.EVENTS.CLEAR_INNER_MESSAGE);

      $scope.showMobileSnoopy = false;

      // set the display of the header
      // based on the display rule
      updateHeader(currentPath);
      //start progress bar
      $scope.selectWorkflow(LayoutSvc.getNavIndex(currentPath));

      // initialize all tables and popovers after page has been generated
      // todo: rework this as event

      setTimeout(function(){

        //update progress bar
        $scope.selectWorkflow(LayoutSvc.getNavIndex(currentPath));

        //collapse all collapsed content to start
        $('table tbody tr.collapsed-content').hide();
        $('.collapse').removeClass('in');

        //focus on first element if it is a text field
        if($('input[type="text"]', $('form').children()[0]).length){
          $('input[type="text"]')[0].focus();
        }

        //register popovers
        $('.help').popover({
          html:true,
          title:'<button type="button" id="close" class="close" onclick="$(&quot;.popover&quot;).popover(&quot;hide&quot;);">&times;</button>'
        });
        $('.help').click(function(){
          $('.help').not(this).popover('hide'); //all but this
        });

        //ie placeholder support
        //$('input, textarea').placeholder();

        //custom radio buttons
        var radioButton = $('input[type="radio"]');
        $(radioButton).each(function(){
          $(this).wrap( "<span class='custom-radio'></span>" );
          if($(this).is(':checked')){
            $(this).parent().addClass("selected");
          }
        });
        $(radioButton).click(function(){
          if($(this).is(':checked')){
            $(this).parent().addClass("selected");
          }
          $(this).parent().parent().siblings().children().not(this).each(function(){
            $(this).removeClass("selected");
          });
        });

        //custom checkboxes
        var checkbox = $('input[type="checkbox"]');
        $(checkbox).each(function(){
          $(this).wrap( "<span class='custom-checkbox'></span>" );
          if($(this).is(':checked')){
            $(this).parent().addClass("selected");
          }
        });
        $(checkbox).click(function(){
          if($(this).is(':checked')){
            $(this).parent().addClass("selected");
          }else{
            $(this).parent().removeClass("selected");
          };
        });

      }, 1000);

    });

    $scope.toggler = function($event, type){
      var target, expansion, icon;

      // check to see if we are selecting anything in the expandable that should not provoke the expansion
      // if we do, then exit the function nicely

      console.log('>>', $event);

      // first check to see if we are not checking any of the select boxes in the expanded view.
      if( $($event.target).prop("tagName") === "SELECT" || $($event.target).prop("tagName") === "OPTION" || $($event.srcElement).prop("tagName") === "SELECT"  || $($event.srcElement).prop("tagName") === "OPTION"){
        return false;
      }

      switch(type){
        case 'row':
          target = $($event.target).parents('tr');
          target.toggleClass('expanded');
          expansion = $("[data-parent='"+target.attr('id')+"']");
          expansion.toggle();
          break;

        case 'div':
          target = $($event.target).parents('.accordion-toggle');
          target.toggleClass('expanded');
          break;

        case 'drawer':
          target = $($event.target).parents('.panel-default');
          expansion = $('.collapse', target);
          expansion.toggleClass('in');
          break;
      }

      icon = $('.expandable-icon', target);
      icon.children().toggle();

    };


    $scope.zip = '';

	// PLEASE MAKE SURE THAT THE USER ENTERS ONE OF THE THREE LEGIT ZIPS IN DEMO
    $scope.startQuote = function(zip){

      $scope.currentQuote = QuoteSvc.startQuote(zip);

      $rootScope.$on(ConstantsSvc.EVENTS.QUOTE_STARTED, function(scope, data){

        $rootScope.currentQuote = data;

        if($rootScope.currentQuote){
          $location.url('/your_info');
        }else{
          console.log('--> have not found a location');
        }

      });

    };
    $rootScope.$broadcast(ConstantsSvc.EVENTS.CLEAR_INNER_MESSAGE);

  });
