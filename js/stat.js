'use strict';

var STAT_X_POS = 100;
var STAT_Y_POS = 10;
var STAT_HEIGHT = 270;
var STAT_WIDTH = 420;
var STAT_OFFSET = 10;

var BAR_HEIGHT = 150;
var BAR_COLUMN_WIDTH = 40;
var BAR_COLUMN_PADDING = 50;
var BAR_TEXT_HEIGHT = 15;

var drawText = function (ctx, x, y) {
  ctx.fillStyle = 'black';
  ctx.textBaseline = 'top';
  ctx.font = '16px "PT Mono"';
  ctx.fillText('Ура вы победили!', x, y);
  ctx.fillText('Список результатов:', x, y + 25);
};

var drawStatistics = function (ctx, x, y, names, times) {

  var drawItem = function (i) {
    var itemHeight = times[i] * (BAR_HEIGHT - BAR_TEXT_HEIGHT) / maxTime;

    var itemX = x + (i + 1) * BAR_COLUMN_PADDING + i * BAR_COLUMN_WIDTH;
    var itemY = y + BAR_HEIGHT - itemHeight;

    ctx.fillStyle = names[i] === 'Вы'
      ? 'rgba(255, 0, 0, 1)'
      : 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';

    ctx.fillText(
        Math.round(times[i]),
        itemX,
        y + BAR_HEIGHT - itemHeight - BAR_TEXT_HEIGHT
    );

    ctx.fillRect(
        itemX,
        itemY,
        BAR_COLUMN_WIDTH,
        itemHeight
    );

    ctx.fillText(
        names[i],
        itemX,
        y + BAR_HEIGHT + BAR_TEXT_HEIGHT
    );
  };

  var namesCount = Math.min(names.length, times.length);
  var maxTime = Math.max.apply(null, times);


  for (var i = 0; i < namesCount; i++) {
    drawItem(i);
  }
};

window.renderStatistics = function (ctx, names, times) {
  // Тень
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(
      STAT_X_POS + STAT_OFFSET,
      STAT_Y_POS + STAT_OFFSET,
      STAT_WIDTH,
      STAT_HEIGHT
  );

  // Область вывода
  ctx.fillStyle = 'white';
  ctx.fillRect(
      STAT_X_POS,
      STAT_Y_POS,
      STAT_WIDTH,
      STAT_HEIGHT
  );

  drawText(
      ctx,
      STAT_X_POS + STAT_OFFSET * 2,
      STAT_Y_POS + STAT_OFFSET * 2
  );

  drawStatistics(
      ctx,
      STAT_X_POS,
      STAT_Y_POS + 70,
      names,
      times
  );
};
