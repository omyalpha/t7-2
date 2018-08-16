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
			url: "http://www.webhosting.sd/~tahweel/php/settings.php",
			data: form.serialize(), // serializes the form's elements.
			success: function(data) {
			   myApp.addNotification({
					message: "Account updated"
			   });
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
	
	if (page.name === 'fromsudan') {
		console.log('from sudan page');
		var divText="";
		//run Ajax script here
		$.ajax({
			beforeSend: function() { myApp.showIndicator(); },
			complete: function(){ myApp.hideIndicator(); },
			url: "http://www.webhosting.sd/~tahweel/php/getlistings.php?type=1",
			dataType: "jsonp",
			jsonpCallback: "jsonCallback",
			success:function jsonCallback(data){
				$.each(data, function(i, field){
					divText += '<li><div class="item-content">';
					divText += '<div class="item-media"><img src="img/fromsudan-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle">I want to give:</div>';
					divText += '<div class="item-title-row">';
					divText += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
					divText += '<div class="item-after font-green">' + data[i].from_city + ', ' + data[i].from_country + '</div>';
					divText += '</div><div class="item-subtitle">And receive:</div><div class="item-title-row">';
					divText += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
					divText += '<div class="item-after font-red">' + data[i].to_city + ', ' + data[i].to_country + '</div>';
					divText += '</div><div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
					divText += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
					divText += '</div><a class="button button-link readmore" href="details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> View Details</a></li>';
				});
				$('#divTextArea').html(divText);
				if (data=="") {
					$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> No active listings in this section.</p></div>');
				}
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				var errormsg=XMLHttpRequest.responseText;
				myApp.addNotification({
					message: errormsg
				});
			}
		});
	}
	
	if (page.name === 'tosudan') {
		console.log('to sudan page');
		var divText="";
		//run Ajax script here
		$.ajax({
			beforeSend: function() { myApp.showIndicator(); },
			complete: function(){ myApp.hideIndicator(); },
			url: "http://www.webhosting.sd/~tahweel/php/getlistings.php?type=2",
			dataType: "jsonp",
			jsonpCallback: "jsonCallback",
			success:function jsonCallback(data){
				$.each(data, function(i, field){
					divText += '<li><div class="item-content">';
					divText += '<div class="item-media"><img src="img/tosudan-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle">I want to give:</div>';
					divText += '<div class="item-title-row">';
					divText += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
					divText += '<div class="item-after font-green">' + data[i].from_city + ', ' + data[i].from_country + '</div>';
					divText += '</div><div class="item-subtitle">And receive:</div><div class="item-title-row">';
					divText += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
					divText += '<div class="item-after font-red">' + data[i].to_city + ', ' + data[i].to_country + '</div>';
					divText += '</div><div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
					divText += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
					divText += '</div><a class="button button-link readmore" href="details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> View Details</a></li>';
				});
				$('#divTextArea').html(divText);
				if (data=="") {
					$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> No active listings in this section.</p></div>');
				}
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				var errormsg=XMLHttpRequest.responseText;
				myApp.addNotification({
					message: errormsg
				});
			}
		});
	}
	
	if (page.name === 'domestic') {
		console.log('domestic page');
		var divText="";
		//run Ajax script here
		$.ajax({
			beforeSend: function() { myApp.showIndicator(); },
			complete: function(){ myApp.hideIndicator(); },
			url: "http://www.webhosting.sd/~tahweel/php/getlistings.php?type=3",
			dataType: "jsonp",
			jsonpCallback: "jsonCallback",
			success:function jsonCallback(data){
				$.each(data, function(i, field){
					divText += '<li><div class="item-content"><div class="item-media"><img src="img/domestic-icon.png" width="80"/></div>';
					divText += '<div class="item-inner"><div class="item-title-row"><div class="item-subtitle">I want to send:</div>';
					divText += '<div class="item-after">' + data[i].from_currency + ' ' + data[i].from_amount + '</div></div><div class="item-title-row">';
					divText += '<div class="font-green">From: ' + data[i].from_city + ', ' + data[i].from_country + '</div></div><div class="item-title-row">';
					divText += '<div class="font-red">To: ' + data[i].to_city + ', ' + data[i].to_country + '</div></div>';
					divText += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
					divText += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div></div>';
					divText += '<a class="button button-link readmore" href="details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> View Details</a></li>';

				});
				$('#divTextArea').html(divText);
				if (data=="") {
					$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> No active listings in this section.</p></div>');
				}
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				var errormsg=XMLHttpRequest.responseText;
				myApp.addNotification({
					message: errormsg
				});
			}
		});
	}
	
	if (page.name === 'exchange') {
		console.log('exchange page');
		var divText="";
		//run Ajax script here
		$.ajax({
			beforeSend: function() { myApp.showIndicator(); },
			complete: function(){ myApp.hideIndicator(); },
			url: "http://www.webhosting.sd/~tahweel/php/getlistings.php?type=4",
			dataType: "jsonp",
			jsonpCallback: "jsonCallback",
			success:function jsonCallback(data){
				$.each(data, function(i, field){
					divText += '<li><div class="item-content"><div class="item-media"><img src="img/domestic-icon.png" width="80"/></div>';
					divText += '<div class="item-inner"><div class="item-title-row"><div class="item-subtitle">I want to send:</div>';
					divText += '<div class="item-after">' + data[i].from_currency + ' ' + data[i].from_amount + '</div></div><div class="item-title-row">';
					divText += '<div class="font-green">From: ' + data[i].from_city + ', ' + data[i].from_country + '</div></div><div class="item-title-row">';
					divText += '<div class="font-red">To: ' + data[i].to_city + ', ' + data[i].to_country + '</div></div>';
					divText += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
					divText += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div></div>';
					divText += '<a class="button button-link readmore" href="details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> View Details</a></li>';
					
					divText += '<li><div class="item-content"><div class="item-media"><img src="img/exchange-icon.png" width="80"/></div>';
					divText += '<div class="item-inner"><div class="item-title-row"><div class="item-subtitle font-green">I want to give:</div>';
					divText += '<div class="item-after font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div></div>';
					divText += '<div class="item-title-row"><div class="item-subtitle font-red">And receive:</div>';
					divText += '<div class="item-after font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div></div>';
					divText += '<div class="item-subtitle"><i class="fa fa-map-marker"></i> ' + data[i].from_city + ', ' + data[i].from_country + '</div>';
					divText += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
					divText += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div>';
					divText += '</div></div><a class="button button-link readmore" href="details.html"><i class="fa fa-eye"></i> View Details</a></li>';

				});
				$('#divTextArea').html(divText);
				if (data=="") {
					$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> No active listings in this section.</p></div>');
				}
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				var errormsg=XMLHttpRequest.responseText;
				myApp.addNotification({
					message: errormsg
				});
			}
		});
	}
	
	if (page.name === 'details') {
		console.log('details page');
		var getid = page.query.listingid;
		console.log(getid);
		var divText="";
		//run Ajax script here
		$.ajax({
			beforeSend: function() { myApp.showIndicator(); },
			complete: function(){ myApp.hideIndicator(); },
			url: "http://www.webhosting.sd/~tahweel/php/getlistings.php?listingid="+getid,
			dataType: "jsonp",
			jsonpCallback: "jsonCallback",
			success:function jsonCallback(data){
				$.each(data, function(i, field){
					divText += '<li><div class="item-content"><div class="item-media"><img src="img/domestic-icon.png" width="80"/></div>';
					divText += '<div class="item-inner"><div class="item-title-row"><div class="item-subtitle">I want to send:</div>';
					divText += '<div class="item-after">' + data[i].from_currency + ' ' + data[i].from_amount + '</div></div><div class="item-title-row">';
					divText += '<div class="font-green">From: ' + data[i].from_city + ', ' + data[i].from_country + '</div></div><div class="item-title-row">';
					divText += '<div class="font-red">To: ' + data[i].to_city + ', ' + data[i].to_country + '</div></div>';
					divText += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
					divText += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div></div>';
					divText += '<a class="button button-link readmore" href="details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> View Details</a></li>';
					
					divText += '<li><div class="item-content"><div class="item-media"><img src="img/exchange-icon.png" width="80"/></div>';
					divText += '<div class="item-inner"><div class="item-title-row"><div class="item-subtitle font-green">I want to give:</div>';
					divText += '<div class="item-after font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div></div>';
					divText += '<div class="item-title-row"><div class="item-subtitle font-red">And receive:</div>';
					divText += '<div class="item-after font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div></div>';
					divText += '<div class="item-subtitle"><i class="fa fa-map-marker"></i> ' + data[i].from_city + ', ' + data[i].from_country + '</div>';
					divText += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
					divText += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div>';
					divText += '</div></div><a class="button button-link readmore" href="details.html"><i class="fa fa-eye"></i> View Details</a></li>';

				});
				$('#divTextArea').html(divText);
				if (data=="") {
					$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> No active listings in this section.</p></div>');
				}
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				var errormsg=XMLHttpRequest.responseText;
				myApp.addNotification({
					message: errormsg
				});
			}
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