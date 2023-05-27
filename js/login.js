if(document.location['search'] == ""){
	window.location = "https://www.baidu.com/";
}
api_url = "http://dellv4.grmine.cn:4095/"

function message(msg){
	console.log(msg);
}

function app_code(login_token){
	
}

function login() {
	email = document.getElementById("email").value;
	password = document.getElementById("password").value;
	$.ajax({
		url: api_url+"login",
		type: "POST",
		data: {
			"email": email,
			"password": password
		},
		success: function(response) {
			console.log(response);
			if (response["code"] == 1) {
				document.cookie = "token=" + response["login_token"];
				$.ajax({
					url: api_url+"app/code/decode",
					type: "POST",
					data: {
						"code": document.location['search'].substr(1)
					},
					success: function(res){
						console.log(res);
						if(res["code"] == 1){
							message("登录成功");
							
							window.location = res["redirect_url"]+"/?token="+response["login_token"];
						}
						else{
							message("应用错误");
						}
							
					},
					error: function(xhr, status, error){
						console.log(error);
					}
				});
			}
		},
		error: function(xhr, status, error) {
			console.log("Error: " + error);
		}
	});
}

document.getElementById("login").onclick = login;