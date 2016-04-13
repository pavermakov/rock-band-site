var Payment = (function(){

	var _inputs = {
		errors: '<div class="error-field"></div>',
		card_label: '<label for="payment_card">Card Number</label>',
		card: '<input id="payment_card" type="text" size="20" placeholder="e.g. 4242 4242 4242 4242" data-stripe="number">',
		cvc_label: '<label for="payment_cvc">CVC</label>',
		cvc: '<input id="payment_cvc" type="text" size="4" placeholder="e.g. 000" data-stripe="cvc">',
		expiration_label: '<label for="expiration_date">Expiration (MM/YYYY)</label>',
		expiration_date: '<input id="expiration_date" type="text" size="2" placeholder="e.g 01 / 2017" data-stripe="exp-month">'
	};

	// var _validationObj = {
	// 	rules: {
	// 		payment_card: {
	// 			required: true,
	// 			my_card: true
	// 		}
	// 	}
	// };

	function _openPaymentForm() {

		function __concatInputs(){
			return _inputs.errors + "\n" +
				_inputs.card_label + "\n" +
				_inputs.card + "\n" +
				_inputs.cvc_label + "\n" +
				_inputs.cvc + "\n" +
				_inputs.expiration_label + "\n" +
				_inputs.expiration_date;
		}

		vex.dialog.open({
			message: "Card Info",
			input: __concatInputs(),
			buttons: [
		    $.extend({}, vex.dialog.buttons.YES, {
		      text: 'Pay'
		    }), $.extend({}, vex.dialog.buttons.NO, {
		      text: 'Cancel'
		    })
		  ],afterOpen: function() {
		  	_listenForSubmition();
		  	_formatPaymentForm();
		  }
		});

	}

	function _formatPaymentForm() {
		$('#payment_card').payment('formatCardNumber');
		$('#payment_cvc').payment('formatCardCVC');
		$('#expiration_date').payment('formatCardExpiry');
	}

	function _listenForSubmition(){
		// I want to catch the submition of this button only!
		$('.vex-dialog-form').attr('id', 'payment-form');

		$('#payment-form').find('button[type="submit"]').click(function(event){
			event.stopPropagation();  
	    event.preventDefault();

	    var validation_result = _validateCard();

	    if(validation_result.errors.length === 0){
	    	// clear errors if were any
	    	$('.error-field').html('')
	    	console.log(validation_result)
	    	Stripe.card.createToken(validation_result.data, _stripeResponseHandler);
			} else {
				// show card errors
				// but first clear previous errors
				var $error_field = $('.error-field').html('');
				$.each(validation_result.errors, function(index, value){
					$error_field.append("<p>"+ value +"</p>");
				});
			}
		});
	}

	function _stripeResponseHandler(status, response){
		// following the tutorial for Stripe.js
		console.info(status);
		console.log(response);
		var $form = $('#payment-form');

		if (response.error) {
	    // Show the errors on the form
	    $('.error-field').append("<p>" + response.error.message + "</p>");
	  } else {
	    // response contains id and card, which contains additional card details
	    var token = response.id;
	    // Insert the token into the form so it gets submitted to the server
	    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
	    // and submit
	    // $form.get(0).submit();
	  }

	}

	// function _validateCardNumber(){
	// 	jQuery.validator.addMethod("my_card", function(value, element){
	// 		return this.optional(element) || $.payment.validateCardNumber(value);
	// 	}, "Please enter correct card number")
	// }

	function _validateCard(){
		var validation = {
			data: {},
			errors: []
		};

		var $card = $('#payment_card').val();
		var $cvc = $('#payment_cvc').val();
		var $date = $('#expiration_date').val();

		var valid_card = $.payment.validateCardNumber($card);
		var valid_cvc = $.payment.validateCardCVC($cvc);
		var date = $.payment.cardExpiryVal($date);
		var valid_date = $.payment.validateCardExpiry(date.month, date.year);

		if(!valid_card){
			validation.errors.push("Wrong card number");
		} else {
			validation.data.number = $card;
		}

		if(!valid_cvc){
			validation.errors.push("Wrong cvc");
		} else {
			validation.data.cvc = $cvc;
		}

		if(!valid_date){
			validation.errors.push("Wrong expiration date");
		} else {
			validation.data.exp = $date;
		}

		return validation;
	}



	function addEventListeners() {
		var $main_wrapper = $('#main-wrapper');

		$main_wrapper.on('click', '.btn-pay', _openPaymentForm);
	}

	return {
		init: addEventListeners
	}

}());

Payment.init();