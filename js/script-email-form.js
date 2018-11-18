jQuery.noConflict()(function($){	

	$(document).ready(function() {
		var alertMail = '<div id="contact-form-alert" style="z-index:1500;" class="modal fade" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-body text-center"><p style="color:#2b2b2b !important; font-size:20px !important">Thank you for filling in the form.</p></div><div class="modal-footer"></div></div><!-- /.modal-content --></div><!-- /.modal-dialog --></div><!-- /.modal -->';
		$('body').append(alertMail);
		//E-mail Ajax Send
		$("form.contact-form").submit(function() { //Change
			var th = $(this);
			$.ajax({
				type: "POST",
				url: "php/mail.php", //Change
				data: th.serialize()
			}).done(function() {
				$('#contact-form-alert').modal('show');
				setTimeout(function() {
					// Done Functions
					th.trigger("reset");
		
				}, 1500);
				setTimeout(function() {
					// Done Functions
				
					$('#contact-form-alert').modal('hide');
				}, 2500);
			});
			return false;
		});

	});
});