$(document).ready(function () {
    $("#btnSubmit").click(function () {
      var name = $("#txtName").val();
      var email = $("#txtEmail").val();
      var phone = $("#txtPhone").val();
      var quote = $("#txtQuote").val();
  
      var valResult = valInputData(name, email, phone, quote);
  
      if (valResult === 0) {
        return;
      }

      $("#btnSubmit").prop("disabled", true);
      postQuote(name, email, phone, quote);
    });
  });
  
  function valInputData(name, email, phone, quote) {
    var err = "";
    if (isEmpty(name) == true) {
      err += "\n*Name";
    }
  
    if (!validateEmail(email)) {
      err += "\n*Email";
    }
  
    if (isEmpty(phone) == true) {
      err += "\n*Phone Number";
    }
  
    if (isEmpty(quote) == true) {
      err += "\n*Explain to us what you would like!";
    }
  
    if (err != "") {
      err = "The following fields are invalid:\n" + err;
      toastr.error(err);
  
      return 0;
    }
  
    return 1;
  }
  
  function isEmpty(val) {
    return $.trim(val).length == 0;
  }
  
  function validateEmail(email) {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  function postQuote(name, email, phone, quote) {
    var form_data = {
      Name: name,
      Email: email,
      Phone: phone,
      Quote: quote,
      Token:
        "7cdac7cf9bf34ea8a6122d5d4728c427f34d4ee990b647e87b0dfb71c96433590412b67927d9dfe386ebf0f74728c427f34d4ee990b647",
    };
  
    var posturl = "https://localhost:7132/api/email/quote";
  
    $.ajax({
      url: posturl,
      type: "POST",
      data: JSON.stringify(form_data),
      contentType: "application/json",
      success: function (response) {
        // window.location.href = "../../submit.html";
        $("#txtName").val("");
        $("#txtEmail").val("");
        $("#txtPhone").val("");
        $("#txtQuote").val("");
        toastr.success("Form Successfully Submitted Message");
      },
      error: function (error) {
        // window.location.href = "../../submit.html";
  
        toastr.error("Error");
      },
    });
  }
  