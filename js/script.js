$(document).ready(function () {
  $("#btnSubmit").click(function () {
    event.preventDefault();
    var name = $("#txtName").val();
    var email = $("#txtEmail").val();
    var phone = $("#txtPhone").val();
    var quote = $("#txtQuote").val();
    var inquiry = $("#txtInquiry").val();

    var valResult = valInputData(name, email, phone, quote, inquiry);

    if (valResult === 0) {
      return;
    }

    $("#btnSubmit").prop("disabled", true).html("Sending..."); // Change button text to "Sending..."
    postQuote(name, email, phone, quote, inquiry);
  });
});

function valInputData(name, email, phone, quote, inquiry) {
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
  if (isEmpty(inquiry) == true) {
    err += "\n*Explain to us what you are contacting us about!";
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

function postQuote(name, email, phone, quote, inquiry) {
  var form_data = {
    Name: name,
    Email: email,
    Phone: phone,
    Quote: quote,
    Token: "34c2f50c9e7f4d35a2f23dbcefe16bbfeedd947b0aa741d088aac981de29ec05",
    Inquiry: inquiry,
  };

  var posturl = "https://localhost:7132/api/email/quote";

  $.ajax({
    url: posturl,
    type: "POST",
    data: JSON.stringify(form_data),
    contentType: "application/json",
    success: function (response) {
      $("#txtName").val("");
      $("#txtEmail").val("");
      $("#txtPhone").val("");
      $("#txtQuote").val("");
      $("#txtInquiry").val("");
      toastr.success("Form Successfully Submitted Message");
      $("#btnSubmit")
        .prop("disabled", true)
        .html("Submit <i class='bi bi-arrow-right'></i>"); // Reset button text
    },
    error: function (error) {
      toastr.error("Error");
      $("#btnSubmit")
        .prop("disabled", false)
        .html("Submit <i class='bi bi-arrow-right'></i>"); // Reset button text
    },
  });
}
