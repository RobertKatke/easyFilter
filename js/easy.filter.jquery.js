/**

 * jQuery easyFilter
 * @author Robert Katke
 * @version 1.0
 * @date Nov 16, 2016
 * @category jQuery plugin
 * @description easy plugin to filter your content

**/

(function(e) {

	e.fn.easyFilter = function(params) {

		var self = this;
		
		// add settings to plugin
		var settings = $.extend({}, e.fn.easyFilter.defaultSettings, params);

		// add overlay to markup when overlay = true
		if (settings.overlay == true) {
			$('<div class="loading-filter"></div>').appendTo($('body'));
		}

		self.click(function(e) {

			e.preventDefault();

			// remove .active from all data-filter elements
			self.removeClass('active');

			// add .active to current data-filter element
			$(this).addClass('active');

			// get the filter value
			var filterVal = $(this).data('filter');

			// case when overlay = true
			if (settings.overlay == true) {

				// add active class to .loading-filter
				$('.loading-filter').addClass('active');

				// fire the main action after .loading-filter is active
				setTimeout(function() {

					mainAction();

				}, settings.loadingSpeed / 2);

				// timeout function to remove active class from loading-filter after the mainAction is done
				setTimeout(function() {

					$('.loading-filter').removeClass('active');

				}, settings.loadingSpeed);

			} else {

				// fire main action when settings.overlay = false
				mainAction();

			}

			/** 
			**  main function
			**	why a extra function? 
			**  just need the action in several cases
			**/
			function mainAction() {
				if (filterVal == 'all') {

					$('[data-tags]').show();

				} else {

					// hide all elements first
					$('[data-tags]').hide();

					// select the current filter
					$('[data-tags~="'+filterVal+'"]').each(function(i, elm) {
						
						// display the current filter
						$(elm).show();

					});

				}
			}
	
		});

	}

	// default settings
	e.fn.easyFilter.defaultSettings = {
		overlay: false,
		loadingSpeed: 800
	};
	
})(jQuery)