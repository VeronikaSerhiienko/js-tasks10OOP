var logedUser = {

};

var user = {
 viewNews: function() {
    document.querySelector('.js-view-news').classList.add('visible');
  },
  editNews: function() {
    document.querySelector('.js-edit-news').classList.add('visible');
  },
  deleteNews: function() {
    document.querySelector('.js-delete-news').classList.add('visible');
  },
  logOut: function() {
    document.querySelector('.js-log-out').classList.add('visible');
  },
  editProfile: function() {
    document.querySelector('.js-edit-profile').classList.add('visible');
  },
};

var registredUsers = [
{
id: '1', //generated automatically at the time of creation
name: 'Stepan',
password: '123',
role: 'admin' // or another role
}, {
id: '2', //generated automatically at the time of creation
name: 'Andrew',
password: '456',
role: 'guest' // or another role
},{
id: '3', //generated automatically at the time of creation
name: 'Line',
password: '789',
role: 'admin' // or another role
}];

var forms = document.querySelectorAll('.js-form');

if (sessionStorage.length === 0) {
    showStartPage(); 
  } else {
    logedUser.name = sessionStorage.getItem('name');
    logedUser.role = sessionStorage.getItem('role');
    hideForm();
    showOpportunities();
}

document.querySelector('.js-singUpForm').addEventListener('submit', function(event) {
  event.preventDefault();
  singUpUser(event.target);
});

document.querySelector('.js-logInForm').addEventListener('submit', function(event) {
  event.preventDefault();
  checkUser(event.target);
});

document.querySelector('.js-log-out').addEventListener('click', showStartPage);

function getId() {
  var id = registredUsers.length;
  return function(){ 
    return ++id;
  };
}

function GuestFactory(name, password) {
  this.name = name;
  this.password = password;
  this.role = 'guest';
  this.id = getId();
  this.__proto__ = user;
}

function AdminFactory(name, password) {
  this.name = name;
  this.password = password;
  this.role = 'admin';
  this.id = getId();
  this.__proto__ = user;
}

function singUpUser(currentForm) {
  var userName = currentForm.querySelector('.js-name-field').value;
  var userPassword = currentForm.querySelector('.js-password-field').value;
  var checkedElem = currentForm.querySelector('.js-checkbox');
  if (checkedElem.checked) {
    logedUser = new AdminFactory(userName, userPassword);
    registredUsers.push(logedUser);
    hideForm();
    showOpportunities();
  } else {
    logedUser = new GuestFactory(userName, userPassword);
    registredUsers.push(logedUser);
    hideForm();
    showOpportunities();
  }
}

function hideForm() {
  document.querySelectorAll('.js-form').forEach(function(item) {
    item.classList.remove('visible');
  });
}

function showOpportunities() {
  document.querySelector ('.js-user-name').innerHTML = logedUser.name;
  if (logedUser.role === 'guest') {
    user.logOut();
    user.viewNews();
    user.editProfile();
  } else {
    user.logOut();
    user.viewNews();
    user.editProfile();
    user.editNews();
    user.deleteNews();
  }
}

function hideOpportinities() {
  document.querySelector('.js-log-out').classList.remove('visible');
  document.querySelector('.js-view-news').classList.remove('visible');
  document.querySelector('.js-edit-news').classList.remove('visible');
  document.querySelector('.js-delete-news').classList.remove('visible');
  document.querySelector('.js-edit-profile').classList.remove('visible');
  document.querySelector ('.js-user-name').innerHTML = '';
}

function clearLogedUser () {
  logedUser = {};
  sessionStorage.clear();
}


function checkUser(currentForm) {
  var userName = currentForm.querySelector('.js-name-field').value;
  var userPassword = currentForm.querySelector('.js-password-field').value;
  
  registredUsers.forEach(function(item) {
    if (item.name === userName && item.password === userPassword) { 
      sessionStorage.setItem('name', item.name);
      sessionStorage.setItem('role', item.role);
      logedUser.name = sessionStorage.getItem('name');
      logedUser.role = sessionStorage.getItem('role');
      hideForm();
      showOpportunities();
    }
  });
 }

function showStartPage() {
  hideOpportinities();
  forms.forEach(function(item) {
    item.classList.add('visible');
  });
  clearLogedUser();
  clearInputedValue();
}

function clearInputedValue() {
  document.querySelectorAll('.js-input').forEach(function(item) {
    item.value = '';
  });
}

(function() {
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
    var getidOfSecondField = '#'+ firstFieldIn.getAttribute('data-confirm-field-id');
    var secondField = currentForm.querySelector(getidOfSecondField);
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


})();