var myApp = angular.module('myApp', []);

myApp.controller('AppController', [
    '$scope',
    function($scope){
        $scope.title = "Currency Converter";
    }
]);

myApp.controller('TickerController', [
    '$scope', '$timeout', '$interval', '$http', 
    function($scope, $timeout, $interval, $http){
        let rates = {};
        $http.get("https://api.frankfurter.app/latest?from=USD").then(
            function success(response){
                rates = response.data.rates;
                $scope.boxes = [
                    {title: 'USD → GBP', value: "1 → " + rates.GBP},
                    {title: 'USD → EUR', value: "1 → " + rates.EUR},
                    {title: 'USD → CAD', value: "1 → " + rates.CAD},
                    {title: 'USD → CNY', value: "1 → " + rates.CNY},
                    {title: 'USD → INR', value: "1 → " + rates.INR},
                    {title: 'USD → HKD', value: "1 → " + rates.HKD},
                    {title: 'USD → JPY', value: "1 → " + rates.JPY},
                    {title: 'USD → SGD', value: "1 → " + rates.SGD},
                    {title: 'USD → RUB', value: "1 → " + rates.RUB},
                    {title: 'USD → AUD', value: "1 → " + rates.AUD},
                ]; 
            },
            function failure(response){
                alert("Forex API Server is not responding. Please try again later.");
                console.log("Unable to perform get request.");
            }
        );

    
        $scope.moving = false;
        $scope.moveLeft = function(){
            $scope.moving = true;
            $timeout($scope.switchFirst, 1000);
        };
        $scope.switchFirst = function(){
            $scope.boxes.push($scope.boxes.shift());
            $scope.moving = false;
            $scope.$apply();
        }

        $interval($scope.moveLeft, 2000);
    }
]);

myApp.controller('MenuController', [
    '$scope', '$http',
    function($scope, $http){
        /**
         * Helper Function - formats a JS input date into a yyyy-mm-dd
         * https://stackoverflow.com/a/23593099
         */
        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [year, month, day].join('-');
        }

        $scope.convert = function(userInput){
            let currencies = ["USD", "GBP", "EUR", "CAD", "CNY", "INR", "HKD", "JPY", "SGD"];
            //console.log(formatDate(userInput.date));

            let currencyInput = userInput.currency;
            let valueInput = userInput.value;
            let dateInput = formatDate(userInput.date);

            currencies = currencies.filter(item => item != currencyInput);
            //console.log(currencies);

            let url = "https://api.frankfurter.app/"+dateInput+"?amount="+valueInput+"&from="+currencyInput;
            console.log(url);

            $http.get(url).then(
                function success(response){
                    rates = response.data.rates; //object of rates

                    //convert to array so we can filter out the currencies we don't need
                    rates = Object.entries(rates); //convert to array
                    rates = rates.filter(([key,value]) => currencies.includes(key)); //filter
                    rates = Object.fromEntries(rates);
                    console.log(rates);
                    $scope.conversions = rates;
                },
                function failure(response){
                    alert("Forex API Server is not responding. Please try again later.");
                    console.log("Unable to perform get request.");
                }
            );
        }
    }
]);