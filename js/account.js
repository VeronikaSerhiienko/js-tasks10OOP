var logedUser = {

};

function User(name, password) {
  this.name = name;
  this.password = password;
  this.id = getId();
}

User.prototype = {
  viewNews: function() {
    document.querySelector('.js-view-news').classList.add('visible');
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
    password: 'As@123123',
    role: 'admin' // or another role
  }, {
    id: '2', //generated automatically at the time of creation
    name: 'Andrew',
    password: 'As@456456',
    role: 'guest' // or another role
  },{
    id: '3', //generated automatically at the time of creation
    name: 'Line',
    password: 'As@789789',
    role: 'admin' // or another role
  }
];

var forms = document.querySelectorAll('.js-form');

if (sessionStorage.length === 0) {
  showStartPage(); 
} else {
  logedUser.name = sessionStorage.getItem('name');
  logedUser.role = sessionStorage.getItem('role');
  hideForm();
  showOpportunities();
}

document.querySelector('.js-singUpForm').addEventListener('formIsValid', function(event) {
  event.preventDefault();
  singUpUser(event.target);
});

document.querySelector('.js-logInForm').addEventListener('formIsValid', function(event) {
  event.preventDefault();
  checkUser(event.target);
});

document.querySelector('.js-log-out').addEventListener('click', showStartPage);

function createId() {
  var id = registredUsers.length;
  return function() { 
    return ++id;
  };
}

var getId = createId();

function GuestFactory(name, password) {
  this.role = 'guest';
}

GuestFactory.prototype =  Object.create(User.prototype);

function AdminFactory(name, password) {
  this.role = 'admin';
}

AdminFactory.prototype =  Object.create(User.prototype);

AdminFactory.prototype.editNews = function() {
  document.querySelector('.js-edit-news').classList.add('visible');
};

AdminFactory.prototype.deleteNews = function() {
  document.querySelector('.js-delete-news').classList.add('visible');
};

function isSuchUserAlreadyExist(form) {
  var isNotExist = true;
  registredUsers.forEach(function(registeredUser) {

    if (registeredUser.name === logedUser.name && registeredUser.password === logedUser.password && registeredUser.role === logedUser.role) {
      resetError(form);
      showError(form, 'This user already exist');
      isNotExist = false;
    }     
  });

  return isNotExist;
}

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

function singUpUser(currentForm) {
  var userName = currentForm.querySelector('.js-name-field').value;
  var userPassword = currentForm.querySelector('.js-password-field').value;
  var checkedElem = currentForm.querySelector('.js-checkbox');  

  if (checkedElem.checked) {
    logedUser = new AdminFactory(userName, userPassword);
  } else {
    logedUser = new GuestFactory(userName, userPassword);
  }

  if (isSuchUserAlreadyExist(currentForm)) {
    sessionStorage.setItem('name', logedUser.name);
    sessionStorage.setItem('role', logedUser.role);
    registredUsers.push(logedUser);    
    hideForm();
    showOpportunities();
  } else {
    showStartPage();
    setTimeout(function() {
      resetError(currentForm);
    }, 2000);
  }
}

function checkUser(currentForm) {
  var userName = currentForm.querySelector('.js-name-field').value;
  var userPassword = currentForm.querySelector('.js-password-field').value; 
  var isUserExist = false; 
  var thisUser;
  registredUsers.forEach(function(registeredUser) {
    if (registeredUser.name === userName && registeredUser.password === userPassword) {
      isUserExist = true;
      thisUser = registeredUser;
    }
  });

  if (isUserExist) {
    sessionStorage.setItem('name', thisUser.name);
    sessionStorage.setItem('role', thisUser.role);
    logedUser.name = sessionStorage.getItem('name');
    logedUser.role = sessionStorage.getItem('role');
    hideForm();
    showOpportunities();
  } else {
    resetError(currentForm);
    showError(currentForm, 'This user does not exist');
    showStartPage();
    setTimeout(function() {
      resetError(currentForm);
    }, 2000);
  }
}

function hideForm() {
  forms.forEach(function(form) {
    form.classList.remove('visible');
  });
}

function showOpportunities() {
  document.querySelector('.js-user-name').innerHTML = logedUser.name;

  if (logedUser.role === 'guest') {
    logedUser.logOut();
    logedUser.viewNews();
    logedUser.editProfile();
  } else {
    logedUser.logOut();
    logedUser.viewNews();
    logedUser.editProfile();
    logedUser.editNews();
    logedUser.deleteNews();
  }
}

function hideOpportunities() {
  document.querySelector('.js-log-out').classList.remove('visible');
  document.querySelector('.js-view-news').classList.remove('visible');
  document.querySelector('.js-edit-news').classList.remove('visible');
  document.querySelector('.js-delete-news').classList.remove('visible');
  document.querySelector('.js-edit-profile').classList.remove('visible');
  document.querySelector('.js-user-name').innerHTML = '';
}

function clearLogedUser() {
  logedUser = {};
  sessionStorage.clear();
}

function showStartPage() {
  hideOpportunities();
  forms.forEach(function(form) {
    form.classList.add('visible');
  });
  clearLogedUser();
  clearInputedValue();
}

function clearInputedValue() {
  document.querySelectorAll('.js-input').forEach(function(input) {
    input.value = '';
  });
}