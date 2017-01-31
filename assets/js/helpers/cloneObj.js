/**
 * Создает копию объекта
 * @param  {object} obj - Объект который нужно скопировать
 * @return {object} Копия объекта
 */
function cloneObj (obj) {
    var clone = {};

    for (var key in obj) {
      clone[key] = obj[key];
    }

    return clone;
}
