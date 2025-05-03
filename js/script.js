$(document).ready(function () {
  $("#modernBtnSubmit").click(function (event) {
    event.preventDefault(); // Prevent default form submission
    var name = $("#modernTxtName").val();
    var email = $("#modernTxtEmail").val();
    var phone = $("#modernTxtPhone").val();
    var quote = $("#modernTxtQuote").val();
    var inquiry = $("#modernTxtInquiry").val();

    var valResult = valInputData(name, email, phone, quote, inquiry);

    if (valResult === 0) {
      return;
    }

    $("#modernBtnSubmit").prop("disabled", true).html("Sending...");
    postQuote(name, email, phone, quote, inquiry);
  });
});

function valInputData(name, email, phone, quote, inquiry) {
  var err = "";
  if (isEmpty(name)) {
    err += "\n*Name";
  }

  if (!validateEmail(email)) {
    err += "\n*Email";
  }

  if (isEmpty(phone)) {
    err += "\n*Phone Number";
  }
  if (isEmpty(inquiry)) {
    err += "\n*Reason for Contact";
  }
  if (isEmpty(quote)) {
    err += "\n*Message";
  }

  if (err !== "") {
    err = "The following fields are invalid:\n" + err;
    toastr.error(err);

    return 0;
  }

  return 1;
}

function isEmpty(val) {
  return $.trim(val).length === 0;
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
      $("#modernTxtName").val("");
      $("#modernTxtEmail").val("");
      $("#modernTxtPhone").val("");
      $("#modernTxtQuote").val("");
      $("#modernTxtInquiry").val("");
      toastr.success("Form Successfully Submitted!");
      $("#modernBtnSubmit")
        .prop("disabled", false)
        .html("Submit <i class='bi bi-arrow-right'></i>");
    },
    error: function (error) {
      toastr.error("Error submitting the form. Please try again.");
      $("#modernBtnSubmit")
        .prop("disabled", false)
        .html("Submit <i class='bi bi-arrow-right'></i>");
    },
  });
}
