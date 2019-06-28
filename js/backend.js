'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.timeout = 10000;

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            return onLoad(xhr.response);
          case 404:
            return onError('Ничего не найдено');
          case 500:
            return onError('Внутренняя ошибка сервера');
          default:
            return onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.open('GET', 'https://js.dump.academy/code-and-magick/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.timeout = 10000;

      xhr.addEventListener('load', function () {
        var errMessage = 'Статус ответа - ' + xhr.status + ' ' + xhr.statusText;

        switch (xhr.status) {
          case 200:
            return onLoad(xhr.response);
          case 403:
            return onError('Доступ запрещен. ' + errMessage);
          case 404:
            return onError('Ничего не найдено. ' + errMessage);
          case 500:
            return onError('Внутренняя ошибка сервера. ' + errMessage);
          default:
            return onError(errMessage);
        }
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.open('POST', 'https://js.dump.academy/code-and-magick');
      xhr.send(data);
    }
  };
})();
