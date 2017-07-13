(function () {
    'use strict';

    angular
        .module('app')
        .controller('Requirements.IndexController', Controller);

    function Controller(UserService) {
        var vm = this;

        vm.user = null;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function pre() {

           $window.location.href = '/pre.html';
        }
    }

})();