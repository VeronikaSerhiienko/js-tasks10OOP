;(function() {
  var forms = document.querySelectorAll('.js-form');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      validateForm(form);
    });
  });

  function showError(container, errorMessage) {
    container.classList.add('error');
    var msgElem = document.createElement('p');
    msgElem.classList.add('error-message');
    msgElem.innerHTML = errorMessage;
    container.appendChild(msgElem);
  }

  function resetError(container) {
    container.classList.remove('error');
    if (container.lastChild.className === 'error-message') {
      container.lastChild.classList.remove('error-message');
      container.removeChild(container.lastChild);
    }
  }

  function checkRequired(input) {
    if (input.value === '' || input.value === ' ') {
      resetError(input.parentElement);
      showError(input.parentElement, 'This field is required. Please, fill in this field');
      return false;
    } else {
      resetError(input.parentElement);
      return true;
    }
  }

  function checkMinLength(input) {
    var minLengthRe = input.getAttribute('minlength');
    if (input.value.length) {
      if (input.value.length < minLengthRe) {
        resetError(input.parentElement);
        showError(input.parentElement, 'Please, enter valid data. Minimum ' + minLengthRe + ' symbols');
        return false;
      } else {
        resetError(input.parentElement);
        return true;
      }
    } 
    return true;
  }

  
  function checkWord(input) {
    var wordRe = /^[a-zA-Z\s-]*$/;
    if (input.value.length) {
      if (!input.value.match(wordRe)) {
        resetError(input.parentElement);
        showError(input.parentElement, 'Please, enter valid data. Only char symbols or/and -');
        return false;
      } else {
        resetError(input.parentElement);
        return true;
      }
    } 
    return true;
  }

  function checkPassword(passwordIn) {
    var passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordIn.value.length) {
      if (!passwordIn.value.match(passwordRe)) {
        resetError(passwordIn.parentElement);
        showError(passwordIn.parentElement, 'Please, enter valid password. At least one digit and one lowercase character and one uppercase character and special character');
        return false;
      } else {
        resetError(passwordIn.parentElement);
        return true;
      }
    } 
    return true;
  }

  function checkConfirmFields(firstFieldIn, currentForm) {
    var getIdOfSecondField = '#'+ firstFieldIn.getAttribute('data-confirm-field-id');
    var secondField = currentForm.querySelector(getIdOfSecondField);
    if (firstFieldIn.value.length) {
      if (firstFieldIn.value !== secondField.value) {
        resetError(firstFieldIn.parentElement);
        showError(firstFieldIn.parentElement, 'Your fields do not match. Please, enter valid data.');
        return false;
      } else {
        resetError(firstFieldIn.parentElement);
        return true;
      }
    } 
    return true;
  }

  function validateForm(currentForm) {
    var isFormValid = true;
    var inputs = currentForm.querySelectorAll('.js-input');
    inputs.forEach(function(input) {
      var rules = input.getAttribute('data-validation-rules');
      if (rules.indexOf('required') !== -1) {
        if (!checkRequired(input)) {
          isFormValid = false;
        }
      }

      if (rules.indexOf('minlength') !== -1) {
        if (!checkMinLength(input)) {
          isFormValid = false;
        }
      }

      if (rules.indexOf('letter') !== -1) {
        if (!checkWord(input)) {
          isFormValid = false;
        }
      }

      if (rules.indexOf('password') !== -1) {
        if (!checkPassword(input)) {
          isFormValid = false;
        }
      }

      if (rules.indexOf('confirm') !== -1) {
        if (!checkConfirmFields(input, currentForm)) {
          isFormValid = false;
        }
      }
    });

    if (isFormValid) {        
      event = new CustomEvent("formIsValid");            
      currentForm.dispatchEvent(event);
    } else {
      event = new CustomEvent("formIsNotValid");      
      currentForm.dispatchEvent(event);
    }
    return isFormValid;
  }
})();