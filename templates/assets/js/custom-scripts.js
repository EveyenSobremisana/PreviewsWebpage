
	$.material.init();
	$.material.ripples();
	jQuery.noConflict()(function($){
$(document).ready(function() {
  if ($("#phone").intlTelInput) {
    $("#phone").intlTelInput({validationScript: "assets/vender/intl-tel-input/js/isValidNumber.js"});
    $(".intl-tel-input.inside").css('width', '100%');
  }

  $('#feedbackForm input')
    .not('.optional,.no-asterisk')
    .after('<span class="glyphicon glyphicon-asterisk form-control-feedback"></span>');
	
	var $emailcheck = $('#email');
	var dangeralert = $($emailcheck).next().next();
		$($emailcheck).change( function(){
			if (!contactForm.isValidEmail($emailcheck.val())) {
		  hasErrors = true;
		  contactForm.addError($emailcheck);
		  this.parent('.form-group').addClass('has-error');
		}
		else{
			$(dangeralert).addClass('hide');
			$($emailcheck).parent().removeClass('has-error');
		}
	});
    

  $("#feedbackSubmit").click(function() {
    var $btn = $(this);
    $btn.button('loading');
    contactForm.clearErrors();

    //do a little client-side validation -- check that each field has a value and e-mail field is in proper format
    var hasErrors = false;
    $('#feedbackForm input,textarea').not('.optional').each(function() {
      var $this = $(this);
      if (($this.is(':checkbox') && !$this.is(':checked')) || !$this.val()) {
        hasErrors = true;
        contactForm.addError($(this));
      }
    });
    var $email = $('#email');
    if (!contactForm.isValidEmail($email.val())) {
      hasErrors = true;
      contactForm.addError($email);
    }

    var $phone = $('#phone');
    if ($phone.val() && $phone.intlTelInput && !$phone.intlTelInput("isValidNumber")) {
      hasErrors = true;
      contactForm.addError($phone.parent());
    }

    //if there are any errors return without sending e-mail
    if (hasErrors) {
      $btn.button('reset');
      return false;
    }

    //send the feedback e-mail
    $.ajax({
      type: "POST",
      url: "library/sendmail.php",
      data: $("#feedbackForm").serialize(),
      success: function(data) {
        contactForm.addAjaxMessage(data.message, false);
        contactForm.clearForm();
        //get new Captcha on success
        $('#captcha').attr('src', 'library/vender/securimage/securimage_show.php?' + Math.random());
      },
      error: function(response) {
        contactForm.addAjaxMessage(response.responseJSON.message, true);
      },
      complete: function() {
        $btn.button('reset');
      }
   });
    return false;
  });
  $('#feedbackForm input').change(function () {
    var asteriskSpan = $(this).siblings('.glyphicon-asterisk');
    if ($(this).val()) {
      asteriskSpan.css('color', '#00FF00');
    } else {
      asteriskSpan.css('color', 'black');
    }
  });
});

//namespace as not to pollute global namespace
var contactForm = {
  isValidEmail: function (email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  },
  clearErrors: function () {
    $('#emailAlert').remove();
    $('#feedbackForm .help-block').hide();
    $('#feedbackForm .form-group').removeClass('has-error');
  },
  clearForm: function () {
    $('.glyphicon-asterisk').css('color', 'black');
    $('#feedbackForm input,textarea').val("");
  },
  addError: function ($input) {
    $input.siblings('.help-block').show();
    $input.parent('.form-group').addClass('has-error');
  },
  addAjaxMessage: function(msg, isError) {
    $("#feedbackSubmit").after('<div id="emailAlert" class="alert alert-' + (isError ? 'danger' : 'success') + '" style="margin-top: 5px;">' + $('<div/>').text(msg).html() + '</div>');
  }
};

});


		
/* Masonry Isotope init */
jQuery.noConflict()(function($){
			var $container = $('#container-folio');
					
			if($container.length) {
				$container.waitForImages(function() {
					$(this).slideDown();
					// initialize isotope
					$container.isotope({
					
					  itemSelector : '.box',
					  
					  resizable: false, // disable normal resizing
					 masonry: { columnWidth: $container.width() / 12 }
					});
					
					// filter items when filter link is clicked
					$('#filters a').click(function(){
					  var selector = $(this).attr('data-filter');
					  $container.isotope({ filter: selector });
					  $(this).removeClass('active').addClass('active').siblings().removeClass('active all');
					  
					  return false;
					});
					 
						// update columnWidth on window resize
						$(window).smartresize(function(){
		
							$(window).smartresize(function(){
				  $container.isotope({
					// update columnWidth to a percentage of container width
					masonry: { columnWidth: $container.width() / 12 }
				  }); 
				  
				  });

		});
					
					
					
				},null,true);
				
			}});

		jQuery.noConflict()(function($){	
		
				
		
		 // Basic FitVids Test
        $(".container").fitVids();	
		
		$(function(){
			$.stellar({
						positionProperty: 'transform',
						responsive: true,
						horizontalScrolling: false,
						verticalOffset: 0,
						horizontalOffset: 0
					});
					$(window).resize(function() {
							$.stellar('refresh');
						});
		});
		
		$(function(){
		 $('.scroll').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			  var target = $(this.hash);
			  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			  if (target.length) {
				$('html,body').animate({
				  scrollTop: target.offset().top
				}, 500);
				return false;
			  }
			}
		  });
		});
	$(function(){
		$('.lightbox-toggle').on('click', function (event) {
			  event.preventDefault();
			  $('.lightbox').fadeToggle('fast');
				  var content = $(event.currentTarget).attr('data-lightbox-content');
					$('.lightbox-column').append('\n        <div class="lightbox-video">\n        <iframe src="' + content + '" frameborder="0" allowfullscreen> </iframe>\n        </div>\n    ');
				 
				});

				$('.lightbox-close').on('click', function (event) {
				  event.preventDefault();
				  $('.lightbox-column > *').remove();
				});
		});

		// Create a lightbox
		(function() {
			var lightboxGallery = $('body').find('.lightbox-gallery');
			
					if(lightboxGallery.length > 0){
						var $lightbox = $('<div class="lightbox"></div>');
						var $img = $('<img>');
						var $caption = $('<p class="caption"></p>');
						var $body = $('body');
						$($body).append($lightbox);
						$($lightbox).append($img);
						//$($lightbox).append($caption);
						
				// Add image and caption to lightbox
					 $('.lightbox-gallery img').click(function(e) {
						e.preventDefault();
						// Get image link and description
						var src = $(this).attr("src");
						var cap = $(this).attr("alt");

				// Add data to lighbox
						$img.attr('src', src);
						//$caption.text(cap);
						$($body).css('overflow', 'hidden');
						$lightbox.css('overflow', 'auto')
				// Show lightbox
						$lightbox.fadeIn('fast');
						$lightbox.click(function() {
							$lightbox.fadeOut('fast');
							$($body).css('overflow', '');
							
					});
			  });
			}
		}());
	
	});
	
			
		
	
		