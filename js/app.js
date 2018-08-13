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
				$('.myname').html(obj[0].name);
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				alert(XMLHttpRequest.responseText);
			}
		});
		$('#loginli').hide();
		$('#logoutli').show();
	} else {
		$('#loginli').show();
		$('#logoutli').hide();
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
			   alert("Account created!"); // show response from the php script.
			   localStorage.setItem("token",data);
			   $('#loginli').hide();
			   $('#logoutli').show();
			   mainView.loadPage('index.html');
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				alert(XMLHttpRequest.responseText);
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
			   mainView.loadPage('index.html');
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				alert(XMLHttpRequest.responseText);
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
			   alert(data); // show response from the php script.
			   mainView.loadPage('index.html');
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				alert(XMLHttpRequest.responseText);
			}
		});
       });
	}
	
	

}), $(document).ready(function() {
	$$(".logout").on('click', function(e){
		localStorage.clear();
		$('#loginli').show();
		$('#logoutli').hide();
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
				alert(XMLHttpRequest.responseText);
			}
		});
		$('#loginli').hide();
		$('#logoutli').show();
	} else {
		$('#loginli').show();
		$('#logoutli').hide();
		$('.myname').text("Not logged in");
	}
});