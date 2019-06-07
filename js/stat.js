'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20; // Отступы от текста
var COLUMN_GAP = 50; // Расстояние между колонками
var BAR_WIDTH = 40; // Ширина колонки
var BAR_HEIGHT = -150; // Высота колонки (с отрицательным числом чтобы колонка стремилась вверх, а не вниз)

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = 'bold 16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var time = Math.round(times[i]);
    var heightPlayer = time * BAR_HEIGHT / maxTime;
    var xCoordinate = CLOUD_X + BAR_WIDTH + (BAR_WIDTH + COLUMN_GAP) * i;
    var yCoordinate = CLOUD_HEIGHT - FONT_GAP;

    if (names[i].indexOf('Вы') === 0) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var randomNumber = Math.random();
      var color = 'rgba(0, 0, 255, ' + randomNumber + ')';
      ctx.fillStyle = color;
    }

    ctx.fillRect(xCoordinate, yCoordinate, BAR_WIDTH, (time * BAR_HEIGHT) / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], xCoordinate, CLOUD_HEIGHT);
    ctx.fillText(time, xCoordinate, yCoordinate - Math.abs(heightPlayer) - GAP);
  }
};
