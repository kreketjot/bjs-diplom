'use strict'

/* LOOGUT BUTTON */
const logoutBtn = new LogoutButton();

logoutBtn.action = () => {
  ApiConnector.logout(response => {
    if (response.success) {
      location.reload();
    }
  });
};

/* USER INFO */
ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

/* RATES */
const ratesBoard = new RatesBoard();

function getExchangesRates() {
  ApiConnector.getStocks(response => {
    if (response.success) {
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
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    }
    moneyMgr.setMessage(response.success, response.error || 'Баланс пополнен!');
  });
};

moneyMgr.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    }
    moneyMgr.setMessage(response.success, response.error || 'Успешная конвертация валюты!');
  });
};

moneyMgr.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    }
      moneyMgr.setMessage(response.success, response.error || 'Успешный перевод валюты!');
  });
};

/* FAVORITES */
const favoritesWdg = new FavoritesWidget();

ApiConnector.getFavorites(response => {
  if (response.success) {
    favoritesWdg.clearTable();
    favoritesWdg.fillTable(response.data);
    moneyMgr.updateUsersList(response.data);
  }
});

favoritesWdg.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      favoritesWdg.clearTable();
      favoritesWdg.fillTable(response.data);
      moneyMgr.updateUsersList(response.data);
    }
    favoritesWdg.setMessage(response.success, response.error || 'Пользователь добавлен в избранное!');
  });
};

favoritesWdg.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
      favoritesWdg.clearTable();
      favoritesWdg.fillTable(response.data);
      moneyMgr.updateUsersList(response.data);
    }
    favoritesWdg.setMessage(response.success, response.error || 'Пользователь удалён из избранного!');
  });
};