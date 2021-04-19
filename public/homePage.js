'use strict'

/* LOOGUT BUTTON */
const logoutBtn = new LogoutButton();

logoutBtn.action = () => {
  ApiConnector.logout(response => {
    if (response?.success) {
      location.reload();
    }
  });
};

/* USER INFO */
ApiConnector.current(response => {
  if (response?.success) {
    ProfileWidget.showProfile(response.data);
  }
});

/* RATES */
const ratesBoard = new RatesBoard();

function getExchangesRates() {
  ApiConnector.getStocks(response => {
    if (response?.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
}

getExchangesRates();
const updateExchangesRatesBoardId = setInterval(() => getExchangesRates(), 6e4);

/* MONEY */
const moneyMgr = new MoneyManager();

moneyMgr.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    if (response?.success) {
      ProfileWidget.showProfile(response.data);
      moneyMgr.setMessage(true, 'Баланс пополнен!');
    } else {
      moneyMgr.setMessage(false, `Ошибка пополнения баланса!\n${response.error}`);
    }
  });
};

moneyMgr.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, response => {
    if (response?.success) {
      ProfileWidget.showProfile(response.data);
      moneyMgr.setMessage(true, 'Успешная конвертация валюты!');
    } else {
      moneyMgr.setMessage(false, `Ошибка конвертации валюты!\n${response.error}`);
    }
  });
};

moneyMgr.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    if (response?.success) {
      ProfileWidget.showProfile(response.data);
      moneyMgr.setMessage(true, 'Успешный перевод валюты!');
    } else {
      moneyMgr.setMessage(false, `Ошибка перевода валюты!\n${response.error}`);
    }
  });
};

/* FAVORITES */
const favoritesWdg = new FavoritesWidget();

ApiConnector.getFavorites(response => {
  if (response?.success) {
    favoritesWdg.clearTable();
    favoritesWdg.fillTable(response.data);
    moneyMgr.updateUsersList(response.data);
  }
});

favoritesWdg.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, response => {
    if (response?.success) {
      favoritesWdg.clearTable();
      favoritesWdg.fillTable(response.data);
      moneyMgr.updateUsersList(response.data);
      favoritesWdg.setMessage(true, 'Пользователь добавлен в избранное!');
    } else {
      favoritesWdg.setMessage(false, `Ошибка добавления пользователя в избранное!\n${response.error}`);
    }
  });
};

favoritesWdg.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response?.success) {
      favoritesWdg.clearTable();
      favoritesWdg.fillTable(response.data);
      moneyMgr.updateUsersList(response.data);
      favoritesWdg.setMessage(true, 'Пользователь удалён из избранного!');
    } else {
      favoritesWdg.setMessage(false, `Ошибка удаления пользователя из избранного!\n${response.error}`);
    }
  });
};