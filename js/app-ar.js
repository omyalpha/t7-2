// Init App
var myApp = new Framework7({
    modalTitle: "Tahweel",
    // Enable Material theme
    material: true,
	notificationHold: 10000,
});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {
});


// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function (e) {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});

/* ===== Color themes ===== */
myApp.onPageInit('color-themes', function (page) {
    $$(page.container).find('.ks-color-theme').click(function () {
        var classList = $$('body')[0].classList;
        for (var i = 0; i < classList.length; i++) {
            if (classList[i].indexOf('theme') === 0) classList.remove(classList[i]);
        }
        classList.add('theme-' + $$(this).attr('data-theme'));
    });
    $$(page.container).find('.ks-layout-theme').click(function () {
        var classList = $$('body')[0].classList;
        for (var i = 0; i < classList.length; i++) {
            if (classList[i].indexOf('layout-') === 0) classList.remove(classList[i]);
        }
        classList.add('layout-' + $$(this).attr('data-theme')); 
    });
});

/* ===== Change statusbar bg when panel opened/closed ===== */
$$('.panel-left').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-left');
});

$$('.panel-left, .panel-right').on('close', function () {
    $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});

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
		$('#addlisting').show();
		$('#savedlistings').show();
		$('.speed-dial').show();
	} else {
		$('#loginli').show();
		$('#logoutli').hide();
		$('#settingsli').hide();
		$('#mylistings').hide();
		$('#addlisting').hide();
		$('#savedlistings').hide();
		$('.speed-dial').hide();
		$('.myname').text("");
	}
	
    var page = e.detail.page;
	console.log('initialized');
	
	// delay search ajax
	var delay = (function(){
	  var timer = 0;
	  return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	  };
	})();
	
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
			   $('#addlisting').show();
			   $('#savedlistings').show();
			   $('.speed-dial').show();
			   mainView.loadPage('indexar.html');
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
			   $('#addlisting').show();
			   $('#savedlistings').show();
			   $('.speed-dial').show();
			   mainView.loadPage('indexar.html');
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
				mainView.loadPage('indexar.html');
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
			   mainView.loadPage('indexar.html');
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
		myApp.rtl = false;
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
					divText += '<div class="item-media"><img src="img/fromsudan-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green font-green">أريد دفع:</div>';
					divText += '<div class="item-title-row">';
					divText += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
					divText += '<div class="item-after font-green">' + data[i].from_city + ', ' + data[i].from_country + '</div>';
					divText += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
					divText += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
					divText += '<div class="item-after font-red">' + data[i].to_city + ', ' + data[i].to_country + '</div>';
					divText += '</div><div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
					divText += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
					divText += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
				});
				$('#divTextArea').html(divText);
				if (data=="") {
					$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> لا توجد إعلانات نشطة في هذا القسم</p></div>');
				}
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				var errormsg=XMLHttpRequest.responseText;
				myApp.addNotification({
					message: errormsg
				});
			}
		});
		// search
		$(".searchlistings").keyup(function(){
			delay(function(){
				count = $(".searchlistings").val().length;
				divText="";
				searchterm = $(".searchlistings").val();
				$.ajax({
					beforeSend: function() { myApp.showIndicator(); },
					complete: function(){ myApp.hideIndicator(); },
					url: "http://www.webhosting.sd/~tahweel/php/search.php?type=1&searchterm="+searchterm,
					dataType: "jsonp",
					jsonpCallback: "jsonCallback",
					success:function jsonCallback(data){
						console.log(data);
						$.each(data, function(i, field){
							divText += '<li><div class="item-content">';
							divText += '<div class="item-media"><img src="img/fromsudan-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green font-green">أريد دفع:</div>';
							divText += '<div class="item-title-row">';
							divText += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
							divText += '<div class="item-after font-green">' + data[i].from_city + ', ' + data[i].from_country + '</div>';
							divText += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
							divText += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
							divText += '<div class="item-after font-red">' + data[i].to_city + ', ' + data[i].to_country + '</div>';
							divText += '</div><div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							divText += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
							divText += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						});
						$('#divTextArea').html(divText);
						if (data=="") {
							if (count>0) {
								$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> لا توجد نتائج للبحث.</p></div>');
							} else {
								$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> لا توجد إعلانات نشطة في هذا القسم.</p></div>');
							}
						}
					},
				});
			}, 1000 );
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
					divText += '<div class="item-media"><img src="img/tosudan-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green font-green">أريد دفع:</div>';
					divText += '<div class="item-title-row">';
					divText += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
					divText += '<div class="item-after font-green">' + data[i].from_city + ', ' + data[i].from_country + '</div>';
					divText += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
					divText += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
					divText += '<div class="item-after font-red">' + data[i].to_city + ', ' + data[i].to_country + '</div>';
					divText += '</div><div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
					divText += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
					divText += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
				});
				$('#divTextArea').html(divText);
				if (data=="") {
					$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> لا توجد إعلانات نشطة في هذا القسم.</p></div>');
				}
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				var errormsg=XMLHttpRequest.responseText;
				myApp.addNotification({
					message: errormsg
				});
			}
		});
		// search
		$(".searchlistings").keyup(function(){
			delay(function(){
				count = $(".searchlistings").val().length;
				divText="";
				searchterm = $(".searchlistings").val();
				$.ajax({
					beforeSend: function() { myApp.showIndicator(); },
					complete: function(){ myApp.hideIndicator(); },
					url: "http://www.webhosting.sd/~tahweel/php/search.php?type=2&searchterm="+searchterm,
					dataType: "jsonp",
					jsonpCallback: "jsonCallback",
					success:function jsonCallback(data){
						console.log(data);
						$.each(data, function(i, field){
							divText += '<li><div class="item-content">';
							divText += '<div class="item-media"><img src="img/tosudan-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green font-green">أريد دفع:</div>';
							divText += '<div class="item-title-row">';
							divText += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
							divText += '<div class="item-after font-green">' + data[i].from_city + ', ' + data[i].from_country + '</div>';
							divText += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
							divText += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
							divText += '<div class="item-after font-red">' + data[i].to_city + ', ' + data[i].to_country + '</div>';
							divText += '</div><div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							divText += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
							divText += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						});
						$('#divTextArea').html(divText);
						if (data=="") {
							if (count>0) {
								$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> لا توجد نتائج للبحث.</p></div>');
							} else {
								$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> لا توجد إعلانات نشطة في هذا القسم.</p></div>');
							}
						}
					},
				});
			}, 1000 );
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
					divText += '<div class="item-inner"><div class="item-title-row"><div class="item-subtitle">أريد إرسال:</div>';
					divText += '<div class="item-after">' + data[i].from_currency + ' ' + data[i].from_amount + '</div></div><div class="item-title-row">';
					divText += '<div class="font-green">من: ' + data[i].from_city + ', ' + data[i].from_country + '</div></div><div class="item-title-row">';
					divText += '<div class="font-red">إلى: ' + data[i].to_city + ', ' + data[i].to_country + '</div></div>';
					divText += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
					divText += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div></div>';
					divText += '<a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';

				});
				$('#divTextArea').html(divText);
				if (data=="") {
					$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> لا توجد إعلانات نشطة في هذا القسم.</p></div>');
				}
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				var errormsg=XMLHttpRequest.responseText;
				myApp.addNotification({
					message: errormsg
				});
			}
		});
		// search
		$(".searchlistings").keyup(function(){
			delay(function(){
				count = $(".searchlistings").val().length;
				divText="";
				searchterm = $(".searchlistings").val();
				$.ajax({
					beforeSend: function() { myApp.showIndicator(); },
					complete: function(){ myApp.hideIndicator(); },
					url: "http://www.webhosting.sd/~tahweel/php/search.php?type=3&searchterm="+searchterm,
					dataType: "jsonp",
					jsonpCallback: "jsonCallback",
					success:function jsonCallback(data){
						console.log(data);
						$.each(data, function(i, field){
							divText += '<li><div class="item-content"><div class="item-media"><img src="img/domestic-icon.png" width="80"/></div>';
					divText += '<div class="item-inner"><div class="item-title-row"><div class="item-subtitle">أريد إرسال:</div>';
					divText += '<div class="item-after">' + data[i].from_currency + ' ' + data[i].from_amount + '</div></div><div class="item-title-row">';
					divText += '<div class="font-green">من: ' + data[i].from_city + ', ' + data[i].from_country + '</div></div><div class="item-title-row">';
					divText += '<div class="font-red">إلى: ' + data[i].to_city + ', ' + data[i].to_country + '</div></div>';
					divText += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
					divText += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div></div>';
					divText += '<a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						});
						$('#divTextArea').html(divText);
						if (data=="") {
							if (count>0) {
								$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> لا توجد نتائج للبحث.</p></div>');
							} else {
								$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> لا توجد إعلانات نشطة في هذا القسم.</p></div>');
							}
						}
					},
				});
			}, 1000 );
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
					divText += '<li><div class="item-content">';
					divText += '<div class="item-media"><img src="img/exchange-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green">أريد دفع:</div>';
					divText += '<div class="item-title-row">';
					divText += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
					divText += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
					divText += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
					divText += '</div><div class="item-subtitle"><i class="fa fa-chevron-left"></i> ' + data[i].from_city + '</div>';
					divText += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
					divText += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
					divText += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';

				});
				$('#divTextArea').html(divText);
				if (data=="") {
					$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> لا توجد إعلانات نشطة في هذا القسم.</p></div>');
				}
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				var errormsg=XMLHttpRequest.responseText;
				myApp.addNotification({
					message: errormsg
				});
			}
		});
		// search
		$(".searchlistings").keyup(function(){
			delay(function(){
				count = $(".searchlistings").val().length;
				divText="";
				searchterm = $(".searchlistings").val();
				$.ajax({
					beforeSend: function() { myApp.showIndicator(); },
					complete: function(){ myApp.hideIndicator(); },
					url: "http://www.webhosting.sd/~tahweel/php/search.php?type=4&searchterm="+searchterm,
					dataType: "jsonp",
					jsonpCallback: "jsonCallback",
					success:function jsonCallback(data){
						console.log(data);
						$.each(data, function(i, field){
							divText += '<li><div class="item-content">';
							divText += '<div class="item-media"><img src="img/exchange-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green">أريد دفع:</div>';
							divText += '<div class="item-title-row">';
							divText += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
							divText += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
							divText += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
							divText += '</div><div class="item-subtitle"><i class="fa fa-chevron-left"></i> ' + data[i].from_city + '</div>';
							divText += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							divText += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
							divText += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						});
						$('#divTextArea').html(divText);
						if (data=="") {
							if (count>0) {
								$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> لا توجد نتائج للبحث.</p></div>');
							} else {
								$('#divTextArea').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> لا توجد إعلانات نشطة في هذا القسم.</p></div>');
							}
						}
					},
				});
			}, 1000 );
		});
	}
	
	if (page.name === 'details') {
		console.log('details page');
		var getid = page.query.listingid;
		//console.log(getid);
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
					$$("#savelink").on("click", function(){
						var savedtoken = localStorage.getItem("token");
						var dataString = 'savedtoken=' + savedtoken + '&listingid=' + getid;
						// get user id
						$.ajax({
							beforeSend: function() { myApp.showIndicator(); },
							complete: function(){ myApp.hideIndicator(); },
							type: "GET",
							url: "http://www.webhosting.sd/~tahweel/php/save.php",
							data: dataString, // send token to grab data
							success: function jsonCallback(data){
								myApp.addNotification({
									message: "Listing saved!"
								});
							},
							error:function(XMLHttpRequest,textStatus,errorThrown){
								var errormsg=XMLHttpRequest.responseText;
								myApp.addNotification({
									message: errormsg
								});
							}
						});
					}); 
					if (data[i].type==4) {
						divText += '<li class="col-100"><img src="img/exchange-icon.png" alt=""></li>';
						divText += '<li class="detailscolor">#' + data[i].id + '</li>';
						divText += '<li class="font-green">أريد دفع:</li>';
						divText += '<li class="font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</li>';
						divText += '<li>&nbsp</li>';
						divText += '<li class="font-red">أريد إستلام:</li>';
						divText += '<li class="font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</li>';
						divText += '<li><i class="fa fa-chevron-left"></i> ' + data[i].from_city + '</li>';
						divText += '<li>&nbsp</li>';
						divText += '<li class="detailscolor"><i class="fa fa-comment-o"></i> ' + data[i].comment + '</li>';
						divText += '<li class="detailscolor"><a href="ar/userlistings.html?id=' + data[i].userid + '"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</a></li>';
						divText += '<li class="detailscolor"><i class="fa fa-tablet"></i> ' + data[i].contact + '</li>';
					} else {
						if (data[i].type==1) {
						showimg="fromsudan-icon.png";
						} else if (data[i].type==2) {
							showimg="tosudan-icon.png";
						} else if (data[i].type==3) {
							showimg="domestic-icon.png";
						}
					
						divText += '<li class="col-100"><img src="img/' + showimg + '" alt=""></li>';
						divText += '<li class="detailscolor">#' + data[i].id + '</li>';
						divText += '<li class="font-green">أريد دفع:</li>';
						divText += '<li class="font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</li>';
						divText += '<li class="font-green">' + data[i].from_city + ', ' + data[i].from_country + '</li>';
						divText += '<li>&nbsp</li>';
						divText += '<li class="font-red">أريد إستلام:</li>';
						divText += '<li class="font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</li>';
						divText += '<li class="font-red">' + data[i].to_city + ', ' + data[i].to_country + '</li>';
						divText += '<li>&nbsp</li>';
						divText += '<li class="detailscolor"><i class="fa fa-comment-o"></i> ' + data[i].comment + '</li>';
						divText += '<li class="detailscolor"><a href="ar/userlistings.html?id=' + data[i].userid + '"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</a></li>';
						divText += '<li class="detailscolor"><i class="fa fa-tablet"></i> ' + data[i].contact + '</li>';
					}

				});
				$('#divText').html(divText);
				if (data=="") {
					$('#divText').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> هذا الإعلان قد يكون منتهي أو تم حذفه!</p></div>');
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
	
	if (page.name === 'addlisting') {
		console.log('add listing page');
		
		$("#token").val(localStorage.getItem("token"));
		$("#contact").val(localStorage.getItem("mobile") + ' - ' + localStorage.getItem("email"));
		$('#type').on('change', function() {
			value = this.value;
		
			if (value=="1") { // from sudan
			console.log('1');
				$('#fromcurrency').show();
				$('#fromamount').show();
				$('#fromcountry').hide();
				$('#fromsudan').show();
				$('#fromcity').show();
				$('#tocurrency').show();
				$('#toamount').show();
				$('#tocountry').show();
				$('#tosudan').hide();
				$('#tocity').show();
				$('#exchangecity').hide();
				$('#comment').show();
			} else if (value=="2") { // to sudan
			console.log('2');
				$('#fromcurrency').show();
				$('#fromamount').show();
				$('#fromcountry').show();
				$('#fromsudan').hide();
				$('#fromcity').show();
				$('#tocurrency').show();
				$('#toamount').show();
				$('#tocountry').hide();
				$('#tosudan').show();
				$('#tocity').show();
				$('#exchangecity').hide();
				$('#comment').show();
			} else if (value=="3") { // domestic
			console.log('3');
				$('#fromcurrency').show();
				$('#fromamount').show();
				$('#fromcountry').hide();
				$('#fromsudan').show();
				$('#fromcity').show();
				$('#tocurrency').show();
				$('#toamount').show();
				$('#tocountry').hide();
				$('#tosudan').show();
				$('#tocity').show();
				$('#exchangecity').hide();
				$('#comment').show();
			} else if (value=="4") { // exchange
			console.log('4');
				$('#fromcurrency').show();
				$('#fromamount').show();
				$('#fromcountry').hide();
				$('#fromsudan').show();
				$('#fromcity').hide();
				$('#tocurrency').show();
				$('#toamount').show();
				$('#tocountry').hide();
				$('#tosudan').show();
				$('#tocity').hide();
				$('#exchangecity').show();
				$('#comment').show();
			}
		});
		//run Ajax script here
		$$(".addlistingBtn").on('click', function(e){
			var form = $("#addlistingForm");
			check=form.serialize();
			console.log(check);
			
			//run Ajax script here
			$.ajax({
				beforeSend: function() { myApp.showIndicator(); },
				complete: function(){ myApp.hideIndicator(); },
				type: "GET",
				url: "http://www.webhosting.sd/~tahweel/php/addlisting.php",
				data: form.serialize(), // serializes the form's elements.
				success: function(data) {
				   myApp.addNotification({
						message: "Listing added successfully"
				   });
				   mainView.loadPage('indexar.html');
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
	
	if (page.name === 'userlistings') {
		console.log('user listings page');
		var getid = page.query.id;
		//console.log(getid);
		if (getid===undefined) { // if no id is set, show my listings
			getid=localStorage.getItem("id");
		}
		console.log(getid);
		
		var activeListings="";
		var expiredListings="";
		//run Ajax script here
		$.ajax({
			beforeSend: function() { myApp.showIndicator(); },
			complete: function(){ myApp.hideIndicator(); },
			url: "http://www.webhosting.sd/~tahweel/php/userlistings.php?getid="+getid,
			dataType: "jsonp",
			jsonpCallback: "jsonCallback",
			success:function jsonCallback(data){
				$.each(data, function(i, field){
					$('#nameofuser').text(data[i].nameofuser);

					if (data[i].expired==0) {
						if (data[i].type==1) { //fromsudan
							activeListings += '<li><div class="item-content">';
							activeListings += '<div class="item-media"><img src="img/fromsudan-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green">أريد دفع:</div>';
							activeListings += '<div class="item-title-row">';
							activeListings += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
							activeListings += '<div class="item-after font-green">' + data[i].from_city + ', ' + data[i].from_country + '</div>';
							activeListings += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
							activeListings += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
							activeListings += '<div class="item-after font-red">' + data[i].to_city + ', ' + data[i].to_country + '</div>';
							activeListings += '</div><div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							activeListings += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
							activeListings += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						} else if (data[i].type==2) { // tosudan
							activeListings += '<li><div class="item-content">';
							activeListings += '<div class="item-media"><img src="img/tosudan-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green">أريد دفع:</div>';
							activeListings += '<div class="item-title-row">';
							activeListings += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
							activeListings += '<div class="item-after font-green">' + data[i].from_city + ', ' + data[i].from_country + '</div>';
							activeListings += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
							activeListings += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
							activeListings += '<div class="item-after font-red">' + data[i].to_city + ', ' + data[i].to_country + '</div>';
							activeListings += '</div><div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							activeListings += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
							activeListings += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						} else if (data[i].type==3) { // domestic
							activeListings += '<li><div class="item-content"><div class="item-media"><img src="img/domestic-icon.png" width="80"/></div>';
							activeListings += '<div class="item-inner"><div class="item-title-row"><div class="item-subtitle">أريد إرسال:</div>';
							activeListings += '<div class="item-after">' + data[i].from_currency + ' ' + data[i].from_amount + '</div></div><div class="item-title-row">';
							activeListings += '<div class="font-green">من: ' + data[i].from_city + ', ' + data[i].from_country + '</div></div><div class="item-title-row">';
							activeListings += '<div class="font-red">إلى: ' + data[i].to_city + ', ' + data[i].to_country + '</div></div>';
							activeListings += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							activeListings += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div></div>';
							activeListings += '<a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						} else if (data[i].type==4) { // exchange
							activeListings += '<li><div class="item-content">';
							activeListings += '<div class="item-media"><img src="img/exchange-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green">أريد دفع:</div>';
							activeListings += '<div class="item-title-row">';
							activeListings += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
							activeListings += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
							activeListings += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
							activeListings += '</div><div class="item-subtitle"><i class="fa fa-chevron-left"></i> ' + data[i].from_city + '</div>';
							activeListings += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							activeListings += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
							activeListings += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						}
					} else if (data[i].expired==1) {
						if (data[i].type==1) { //fromsudan
							expiredListings += '<li><div class="item-content">';
							expiredListings += '<div class="item-media"><img src="img/fromsudan-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green">أريد دفع:</div>';
							expiredListings += '<div class="item-title-row">';
							expiredListings += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
							expiredListings += '<div class="item-after font-green">' + data[i].from_city + ', ' + data[i].from_country + '</div>';
							expiredListings += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
							expiredListings += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
							expiredListings += '<div class="item-after font-red">' + data[i].to_city + ', ' + data[i].to_country + '</div>';
							expiredListings += '</div><div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							expiredListings += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
							expiredListings += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						} else if (data[i].type==2) { // tosudan
							expiredListings += '<li><div class="item-content">';
							expiredListings += '<div class="item-media"><img src="img/tosudan-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green">أريد دفع:</div>';
							expiredListings += '<div class="item-title-row">';
							expiredListings += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
							expiredListings += '<div class="item-after font-green">' + data[i].from_city + ', ' + data[i].from_country + '</div>';
							expiredListings += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
							expiredListings += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
							expiredListings += '<div class="item-after font-red">' + data[i].to_city + ', ' + data[i].to_country + '</div>';
							expiredListings += '</div><div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							expiredListings += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
							expiredListings += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						} else if (data[i].type==3) { // domestic
							expiredListings += '<li><div class="item-content"><div class="item-media"><img src="img/domestic-icon.png" width="80"/></div>';
							expiredListings += '<div class="item-inner"><div class="item-title-row"><div class="item-subtitle">أريد إرسال:</div>';
							expiredListings += '<div class="item-after">' + data[i].from_currency + ' ' + data[i].from_amount + '</div></div><div class="item-title-row">';
							expiredListings += '<div class="font-green">من: ' + data[i].from_city + ', ' + data[i].from_country + '</div></div><div class="item-title-row">';
							expiredListings += '<div class="font-red">إلى: ' + data[i].to_city + ', ' + data[i].to_country + '</div></div>';
							expiredListings += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							expiredListings += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div></div>';
							expiredListings += '<a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						} else if (data[i].type==4) { // exchange
							expiredListings += '<li><div class="item-content">';
							expiredListings += '<div class="item-media"><img src="img/exchange-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green">أريد دفع:</div>';
							expiredListings += '<div class="item-title-row">';
							expiredListings += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
							expiredListings += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
							expiredListings += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
							expiredListings += '</div><div class="item-subtitle"><i class="fa fa-chevron-left"></i> ' + data[i].from_city + '</div>';
							expiredListings += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							expiredListings += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
							expiredListings += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						}
					}
				});
				$('#activeListings').html(activeListings);
				$('#expiredListings').html(expiredListings);
				if (activeListings=="") {
					$('#activeListings').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> لا توجد إعلانات نشطة في هذا القسم.</p></div>');
				}
				if (expiredListings=="") {
					$('#expiredListings').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> لا توجد إعلانات نشطة في هذا القسم.</p></div>');
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
	
	if (page.name === 'savedlistings') {
		console.log('saved listings page');
		
		var activeListings="";
		var expiredListings="";
		//run Ajax script here
		$.ajax({
			beforeSend: function() { myApp.showIndicator(); },
			complete: function(){ myApp.hideIndicator(); },
			url: "http://www.webhosting.sd/~tahweel/php/savedlistings.php?token="+localStorage.getItem("token"),
			dataType: "jsonp",
			jsonpCallback: "jsonCallback",
			success:function jsonCallback(data){
				$.each(data, function(i, field){

					if (data[i].expired==0) {
						if (data[i].type==1) { //fromsudan
							activeListings += '<li><div class="item-content">';
							activeListings += '<div class="item-media"><img src="img/fromsudan-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green">أريد دفع:</div>';
							activeListings += '<div class="item-title-row">';
							activeListings += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
							activeListings += '<div class="item-after font-green">' + data[i].from_city + ', ' + data[i].from_country + '</div>';
							activeListings += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
							activeListings += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
							activeListings += '<div class="item-after font-red">' + data[i].to_city + ', ' + data[i].to_country + '</div>';
							activeListings += '</div><div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							activeListings += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
							activeListings += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						} else if (data[i].type==2) { // tosudan
							activeListings += '<li><div class="item-content">';
							activeListings += '<div class="item-media"><img src="img/tosudan-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green">أريد دفع:</div>';
							activeListings += '<div class="item-title-row">';
							activeListings += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
							activeListings += '<div class="item-after font-green">' + data[i].from_city + ', ' + data[i].from_country + '</div>';
							activeListings += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
							activeListings += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
							activeListings += '<div class="item-after font-red">' + data[i].to_city + ', ' + data[i].to_country + '</div>';
							activeListings += '</div><div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							activeListings += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
							activeListings += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						} else if (data[i].type==3) { // domestic
							activeListings += '<li><div class="item-content"><div class="item-media"><img src="img/domestic-icon.png" width="80"/></div>';
							activeListings += '<div class="item-inner"><div class="item-title-row"><div class="item-subtitle">أريد إرسال:</div>';
							activeListings += '<div class="item-after">' + data[i].from_currency + ' ' + data[i].from_amount + '</div></div><div class="item-title-row">';
							activeListings += '<div class="font-green">من: ' + data[i].from_city + ', ' + data[i].from_country + '</div></div><div class="item-title-row">';
							activeListings += '<div class="font-red">إلى: ' + data[i].to_city + ', ' + data[i].to_country + '</div></div>';
							activeListings += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							activeListings += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div></div>';
							activeListings += '<a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						} else if (data[i].type==4) { // exchange
							activeListings += '<li><div class="item-content">';
							activeListings += '<div class="item-media"><img src="img/exchange-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green">أريد دفع:</div>';
							activeListings += '<div class="item-title-row">';
							activeListings += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
							activeListings += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
							activeListings += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
							activeListings += '</div><div class="item-subtitle"><i class="fa fa-chevron-left"></i> ' + data[i].from_city + '</div>';
							activeListings += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							activeListings += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
							activeListings += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						}
					} else if (data[i].expired==1) {
						if (data[i].type==1) { //fromsudan
							expiredListings += '<li><div class="item-content">';
							expiredListings += '<div class="item-media"><img src="img/fromsudan-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green">أريد دفع:</div>';
							expiredListings += '<div class="item-title-row">';
							expiredListings += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
							expiredListings += '<div class="item-after font-green">' + data[i].from_city + ', ' + data[i].from_country + '</div>';
							expiredListings += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
							expiredListings += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
							expiredListings += '<div class="item-after font-red">' + data[i].to_city + ', ' + data[i].to_country + '</div>';
							expiredListings += '</div><div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							expiredListings += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
							expiredListings += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						} else if (data[i].type==2) { // tosudan
							expiredListings += '<li><div class="item-content">';
							expiredListings += '<div class="item-media"><img src="img/tosudan-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green">أريد دفع:</div>';
							expiredListings += '<div class="item-title-row">';
							expiredListings += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
							expiredListings += '<div class="item-after font-green">' + data[i].from_city + ', ' + data[i].from_country + '</div>';
							expiredListings += '</div><div class="item-subtitle font-red">أريد إستلام:</div><div class="item-title-row">';
							expiredListings += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
							expiredListings += '<div class="item-after font-red">' + data[i].to_city + ', ' + data[i].to_country + '</div>';
							expiredListings += '</div><div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							expiredListings += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
							expiredListings += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						} else if (data[i].type==3) { // domestic
							expiredListings += '<li><div class="item-content"><div class="item-media"><img src="img/domestic-icon.png" width="80"/></div>';
							expiredListings += '<div class="item-inner"><div class="item-title-row"><div class="item-subtitle">أريد إرسال:</div>';
							expiredListings += '<div class="item-after">' + data[i].from_currency + ' ' + data[i].from_amount + '</div></div><div class="item-title-row">';
							expiredListings += '<div class="font-green">من: ' + data[i].from_city + ', ' + data[i].from_country + '</div></div><div class="item-title-row">';
							expiredListings += '<div class="font-red">إلى: ' + data[i].to_city + ', ' + data[i].to_country + '</div></div>';
							expiredListings += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							expiredListings += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div></div>';
							expiredListings += '<a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						} else if (data[i].type==4) { // exchange
							expiredListings += '<li><div class="item-content">';
							expiredListings += '<div class="item-media"><img src="img/exchange-icon.png" width="80"/></div><div class="item-inner"><div class="item-subtitle font-green">أريد دفع:</div>';
							expiredListings += '<div class="item-title-row">';
							expiredListings += '<div class="item-title font-green">' + data[i].from_currency + ' ' + data[i].from_amount + '</div>';
							expiredListings += '</div><div class="item-subtitle font-red">And receive:</div><div class="item-title-row">';
							expiredListings += '<div class="item-title font-red">' + data[i].to_currency + ' ' + data[i].to_amount + '</div>';
							expiredListings += '</div><div class="item-subtitle"><i class="fa fa-chevron-left"></i> ' + data[i].from_city + '</div>';
							expiredListings += '<div class="item-subtitle"><i class="fa fa-user"></i> ' + data[i].nameofuser + '</div>';
							expiredListings += '<div class="item-subtitle"><i class="fa fa-calendar-plus-o"></i> ' + data[i].created + '</div></div>';
							expiredListings += '</div><a class="button button-link readmore" href="ar/details.html?listingid=' + data[i].id + '"><i class="fa fa-eye"></i> عرض التفاصيل</a></li>';
						}
					}
				});
				$('#activeListings').html(activeListings);
				$('#expiredListings').html(expiredListings);
				if (activeListings=="") {
					$('#activeListings').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> ا توجد إعلانات نشطة في هذا القسم.</p></div>');
				}
				if (expiredListings=="") {
					$('#expiredListings').html('<div class="content-block error center"><p><i class="fa fa-hand-stop-o"></i> ا توجد إعلانات نشطة في هذا القسم.</p></div>');
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
		$('#addlisting').hide();
		$('#savedlistings').hide();
		$('.speed-dial').hide();
		console.log('logged out');
		$('.myname').text("");
		mainView.loadPage('indexar.html');
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
		$('#addlisting').show();
		$('#savedlistings').show();
		$('.speed-dial').show();
	} else {
		$('#loginli').show();
		$('#logoutli').hide();
		$('#settingsli').hide();
		$('#mylistings').hide();
		$('#addlisting').hide();
		$('#savedlistings').hide();
		$('.speed-dial').hide();
		$('.myname').text("");
	}
});