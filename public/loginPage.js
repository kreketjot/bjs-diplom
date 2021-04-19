'use strict'

const uForm = new UserForm();

/* LOGIN */
uForm.loginFormCallback = function (data) {
  ApiConnector.login(
    data,
    function (response) {
      if (response?.success) {
        location.reload();
      } else {
        uForm.setLoginErrorMessage('Не удалось авторизоваться!');
      }
    } 
  );
}

/* REGISTER */ 
uForm.registerFormCallback = function (data) {
  ApiConnector.register(
    data,
    function (response) {
      if (response?.success) {
        location.reload();
      } else {
        uForm.setRegisterErrorMessage('Не удалось зарегистрироваться!');
      }
    } 
  );
}