var View_product = (function(){

	function _openViewProductModal(){
		var $product = $(this).closest('.product-item');


		var _productProperties = {
			name: $product.data('name'),
			price: $product.data('price'),
			multiple_sizes: $product.data('multiple-size'),
			img: $product.find('img').attr('src'),

			buildHeader: function() {
				var header = document.createElement('div');

				$(header)
					.addClass('vex-dialog-message')
					.html(this.name);

				return $(header);
			},

			buildImage: function() {
				var img = document.createElement('img');

				$(img).attr('src', this.img);

				return $(img);
			},

			buildFigure: function() {
				var figure = document.createElement('figure');

				$(figure)
					.append(this.buildPriceFigcaption())
					.append(this.buildImage())
					.append(this.buildSizePicker())
					.append(this.buildQuantityPicker());


				return $(figure);
			},

			buildPriceFigcaption: function() {
				var figcaption = document.createElement('figcaption');

				$(figcaption)
					.addClass('product-modal-price')
					.attr('data-price', this.price)
					.html("$" + this.price);

				return $(figcaption);
			},

			buildSizePicker: function() {
				var sizePicker = document.createElement('div');

				function buildTitle(){
					var sizeTitle = document.createElement('div');

					$(sizeTitle)
					.addClass('size-title')
					.html("Pick your size:");

					return $(sizeTitle);
				}
				
				function buildMultipleSizes() {
					var sizeHolder = document.createElement('div');

					$.each(['XS', 'S', 'M', 'L', 'XL'], function(i,v){
						var size = document.createElement('span');
						$(size).html(v);

						if(v === 'M'){
							$(size).addClass('selected-size');
						}

						$(sizeHolder).append($(size));
					});

					$(sizeHolder).addClass('product-sizes');

					return $(sizeHolder);
				}
				

				$(sizePicker)
					.addClass('size-picker')
					.append(buildTitle())
					.append(buildMultipleSizes());
					

				return $(sizePicker);
			},

			buildQuantityPicker: function() {
				var quantityPicker = document.createElement('div');

				function buildTitle() {
					var quantityTitle = document.createElement('div');

					$(quantityTitle)
					.addClass('quantity-title')
					.html("Pick quantity:");

					return $(quantityTitle);
				}

				function buildQuantityControls() {
					var number = document.createElement('span');
					var less = document.createElement('i');
					var more = document.createElement('i');


				}

				$(quantityPicker)
					.addClass('quantity-picker')
					.append(buildTitle());

				return $(quantityPicker);
			},

			buildModal: function(){
				var div = document.createElement('div');

				$(div)
					.addClass('product-modal')
					.append(this.buildHeader())
					.append(this.buildFigure());

				return $(div);	
				
			}

		};

		console.log(_productProperties);

		vex.open({
			content: _productProperties.buildModal(),
			showCloseButton: true,
			afterOpen: changeModalSetting
		});
	}

	function changeModalSetting(){
		$('.vex-content').addClass('custom-vex-width');
		$('.vex').addClass('custom-vex-padding-top');
	}

	function addEventListener(){
		$('#product-list').on('click', '.view-button', _openViewProductModal);
	}

	return {
		init: addEventListener
	}
}());

View_product.init();