$$(document).on("pageInit", function(e) {
	if (localStorage.getItem("token") !== null) {
		var savedtoken = localStorage.getItem("token");
		var dataString = 'savedtoken=' + savedtoken;
		// get user id
		$.ajax({
			beforeSend: function() { myApp.showIndicator(); },
			complete: function(){ myApp.hideIndicator(); },
			type: "GET",
			url: "http://www.webhosting.sd/~tahweel/php/getdata.php",
			data: dataString, // send token to grab data
			success: function(data) {
			   obj = JSON.parse(data);
			   localStorage.setItem("id",obj[0].id);
			   localStorage.setItem("name",obj[0].name);
			   localStorage.setItem("country",obj[0].country);
			   localStorage.setItem("mobile",obj[0].mobile);
			   localStorage.setItem("username",obj[0].username);
			   localStorage.setItem("email",obj[0].email);
			   localStorage.setItem("created",obj[0].created);
			   $('.myname').html(obj[0].name);
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				alert(XMLHttpRequest.responseText);
			}
		});
		$('#loginli').hide();
		$('#logoutli').show();
		$('#settingsli').show();
		$('#mylistings').show();
		$('#savedlistings').show();
	} else {
		$('#loginli').show();
		$('#logoutli').hide();
		$('#settingsli').hide();
		$('#mylistings').hide();
		$('#savedlistings').hide();
		$('.myname').text("Not logged in");
	}
	
    var page = e.detail.page;
	console.log('initialized');
	
	if (page.name === 'signup') {
		console.log('signup page');
		
		$$(".signupBtn").on('click', function(e){
		var form = $("#signupForm");

		//run Ajax script here
		$.ajax({
			beforeSend: function() { myApp.showIndicator(); },
			complete: function(){ myApp.hideIndicator(); },
			type: "GET",
			url: "http://www.webhosting.sd/~tahweel/php/signup.php",
			data: form.serialize(), // serializes the form's elements.
			success: function(data) {
			   myApp.addNotification({
					message: "Account created"
			   });
			   localStorage.setItem("token",data);
			   $('#loginli').hide();
			   $('#logoutli').show();
			   $('#settingsli').show();
			   $('#mylistings').show();
			   $('#savedlistings').show();
			   mainView.loadPage('index.html');
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				var errormsg=XMLHttpRequest.responseText;
				myApp.addNotification({
					message: errormsg
				});
			}
		});
       });
	}
	
	if (page.name === 'login') {
		console.log('login page');
		
		$$(".loginBtn").on('click', function(e){
		var form = $("#loginForm");

		//run Ajax script here
		$.ajax({
			beforeSend: function() { myApp.showIndicator(); },
			complete: function(){ myApp.hideIndicator(); },
			type: "GET",
			url: "http://www.webhosting.sd/~tahweel/php/login.php",
			data: form.serialize(), // serializes the form's elements.
			success: function(data) {
			   localStorage.setItem("token",data);
			   $('#loginli').hide();
		   	   $('#logoutli').show();
			   $('#settingsli').show();
			   $('#mylistings').show();
			   $('#savedlistings').show();
			   mainView.loadPage('index.html');
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				var errormsg=XMLHttpRequest.responseText;
				myApp.addNotification({
					message: errormsg
				});
			}
		});
       });
	}
	
	if (page.name === 'resetpass') {
		console.log('Reset Password Page');
		
		$$(".resetpassBtn").on('click', function(e){
		var form = $("#resetpassForm");

		//run Ajax script here
		$.ajax({
			beforeSend: function() { myApp.showIndicator(); },
			complete: function(){ myApp.hideIndicator(); },
			type: "GET",
			url: "http://www.webhosting.sd/~tahweel/php/resetpass.php",
			data: form.serialize(), // serializes the form's elements.
			success: function(data) {
				myApp.addNotification({
					message: data
				});
				//alert(data); // show response from the php script.
				mainView.loadPage('index.html');
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				var errormsg=XMLHttpRequest.responseText;
				myApp.addNotification({
					message: errormsg
				});
			}
		});
       });
	}
	
	if (page.name === 'settings') {
		console.log('settings page');
		$("#token").val(localStorage.getItem("token"));
		$("#name").val(localStorage.getItem("name"));
		$("#country").val(localStorage.getItem("country"));
		$("#mobile").val(localStorage.getItem("mobile"));
		$("#email").val(localStorage.getItem("email"));
		$("#username").val(localStorage.getItem("username"));
		$$(".updateBtn").on('click', function(e){
		var form = $("#settingsForm");
		
		//run Ajax script here
		$.ajax({
			beforeSend: function() { myApp.showIndicator(); },
			complete: function(){ myApp.hideIndicator(); },
			type: "GET",
			url: "http://www.webhosting.sd/~tahweel/php/update.php",
			data: form.serialize(), // serializes the form's elements.
			success: function(data) {
			   myApp.addNotification({
					message: "Account updated"
			   });
			   localStorage.setItem("token",data);
			   $('#loginli').hide();
			   $('#logoutli').show();
			   mainView.loadPage('index.html');
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				var errormsg=XMLHttpRequest.responseText;
				myApp.addNotification({
					message: errormsg
				});
			}
		});
       });
	}
	
	

}), $(document).ready(function() {
	$$(".logout").on('click', function(e){
		localStorage.clear();
		$('#loginli').show();
		$('#logoutli').hide();
		$('#settingsli').hide();
		$('#mylistings').hide();
		$('#savedlistings').hide();
		console.log('logged out');
		$('.myname').text("Not logged in");
		mainView.loadPage('index.html');
	});
	// check login
	console.log('initialized with jquery');
	if (localStorage.getItem("token") !== null) {
		var savedtoken = localStorage.getItem("token");
		var dataString = 'savedtoken=' + savedtoken;
		// get user id
		$.ajax({
			beforeSend: function() { myApp.showIndicator(); },
			complete: function(){ myApp.hideIndicator(); },
			type: "GET",
			url: "http://www.webhosting.sd/~tahweel/php/getdata.php",
			data: dataString, // send token to grab data
			success: function jsonCallback(data){
				obj = JSON.parse(data);
				$('.myname').html(obj[0].name);
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				var errormsg=XMLHttpRequest.responseText;
				myApp.addNotification({
					message: errormsg
				});
			}
		});
		$('#loginli').hide();
		$('#logoutli').show();
		$('#settingsli').show();
		$('#mylistings').show();
		$('#savedlistings').show();
	} else {
		$('#loginli').show();
		$('#logoutli').hide();
		$('#settingsli').hide();
		$('#mylistings').hide();
		$('#savedlistings').hide();
		$('.myname').text("Not logged in");
	}
});