$(document).ready(function () {
                var currency = "US Dollar";
                $.ajax({
                    url: 'http://ip-api.com/json',
                    type: 'GET',
                    success: function (json)
                    {
                        var country = json.country
                        if (country == 'Canada') {
                            currency = "Canadian Dollar";
                        }
                        $('#country_currency').html(currency);
                    },
                    error: function (err)
                    {
                        console.log("Request failed, error= " + err);
                    }
                });

                $('#all_form_submit').click(function (e) {
                    e.preventDefault();
                    $('form[name="user_form"]').submit();
                });
                $("#order_number_host").html('1 host');
                var package =
                        [
                            {type: 1, name: "Month", price: "40", color: "wheat"},
                            {type: 2, name: "Year", price: "90", color: "wheat"}
                        ];
                var selpackage = null;
                var number = $('#numerOfStdents_dd option:selected').val();
                var priceOne = 40;
                var color1 = 'wheat';
                var color2 = 'gray';
                var colorA = 'white';
                var priceTwo = 90;
                $("#numerOfStdents_dd").change(function () {
                    number = $('#numerOfStdents_dd option:selected').val();
                    $("#choice1 .price").html(number * priceOne);
                    $("#choice2 .price").html(number * priceTwo);
                    if (number == 1)
                    {
                        $("#order_number_host").html("1 Host");
                    } else {
                        $("#order_number_host").html(number + " Hosts");
                    }
                    updateTotalAmount(selpackage, number);
                });

                $(".offer").click(function (e) {
                    var id = $(this).attr('id');
                    selpackage = id.substr(id.length - 1);
                    $("#choice1").css('background-color', package[0]['color']);
                    $("#choice2").css('background-color', package[1]['color']);
                    $("#choice1").css('border', '1px solid black');
                    $("#choice2").css('border', '1px solid black');
                    $("#" + id).css('background-color', colorA);
                    $("#" + id).css('border', '3px solid black');
                    $("#order_selected_package").html(package[selpackage - 1]['price'] + " " + currency + " " + package[selpackage - 1]['name'] + " / Person");
                    updateTotalAmount(selpackage, number);
                });
                function updateTotalAmount(pack, numb) {
                    if (pack == null) {
                        $('#total_ammount').html(package[0]['price'] * numb + " " + currency);
                    } else {
                        $('#total_ammount').html(package[pack - 1]['price'] * numb + " " + currency);
                    }
                }

                var validator = new FormValidator('user_form', [{
                        name: 'password',
                        rules: 'required'
                    }, {
                        name: 'fname',
                        rules: 'required'
                    }, {
                        name: 'lname',
                        rules: 'required'
                    }, {
                        name: 'address',
                        rules: 'required'
                    }, {
                        name: 'town',
                        rules: 'required'
                    }, {
                        name: 'postal_code',
                        rules: 'required'
                    }, {
                        name: 'email',
                        rules: 'required',
                        depends: function () {
                            return Math.random() > .5;
                        }
                    }

                ], function (errors, event) {
                    if (errors.length > 0) {
                        var SELECTOR_ERRORS = $('.error_box');
                        SELECTOR_ERRORS.empty();
                        var errorLength = errors.length;
                        SELECTOR_ERRORS.append("All Fields Are Required" + '<br />');
                        SELECTOR_ERRORS.fadeIn(200);
                        SELECTOR_ERRORS.fadeOut(10000);
                    }
                });
            });
