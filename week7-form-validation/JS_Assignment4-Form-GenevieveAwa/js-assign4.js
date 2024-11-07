window.onload = registrationForm;

function registrationForm() {

  var formHandle = document.forms.ixdForm;
  var headerWelcome = document.getElementById("welcome");
  var confirmationMessage = document.getElementById("result");

  formHandle.onsubmit = submitForm;

  function submitForm() {

    var firstNameValue = formHandle.f__fName;
    var lastNameValue = formHandle.f__lName;
    var humberIDValue = formHandle.f__id;
    var programSelect = formHandle.f__program;
    var projectCaption = document.getElementById("caption_project");
    var projectValue = document.querySelector('input[name="f__project"]:checked');

    // Validate First Name
    if (firstNameValue.value === "") {
      firstNameValue.style.background = "red";
      firstNameValue.focus();
      return false;
    }

    // Validate Last Name
    if (lastNameValue.value === "") {
      lastNameValue.style.background = "red";
      lastNameValue.focus();
      return false;
    }

    // Validate Humber ID using regex pattern
    var humberIDPattern = /^[Nn]\d{8}$/;
    if (!humberIDPattern.test(humberIDValue.value)) {
      humberIDValue.style.background = "red";
      humberIDValue.focus();
      return false;
    }

    // Validate Program Selection
    if (programSelect.value === "X") {
      programSelect.style.background = "red";
      programSelect.focus();
      return false;
    }

    // Validate Project Selection
    if (!projectValue) {
      projectCaption.style.background = "red";
      return false;
    }


    // Populate the confirmation message with dynamic values
    document.getElementById("result__Fname").textContent = firstNameValue.value;
    document.getElementById("result__Lname").textContent = lastNameValue.value;
    document.getElementById("result__id").textContent = humberIDValue.value;
    document.getElementById("result__program").textContent = programSelect.options[programSelect.selectedIndex].text;
    document.getElementById("result__project").textContent = projectValue.value;

    // Hide the header and form
    headerWelcome.style.display = "none";
    formHandle.style.display = "none";

    // Display the message
    confirmationMessage.style.display = "block";
    
    return false;
  }

}


