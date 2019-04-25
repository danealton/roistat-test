import BezierEasing from 'bezier-easing';

/**
 * Быстрое начало, медленный конец
 * @constant
 * @type {BezierEasing}
 */
export const EASE_OUT = BezierEasing(0, 0, 0.58, 1);

/**
 * Равномерная анимация, без ускорений
 * @constant
 * @type {BezierEasing}
 */
function linear(fraction) {
  return fraction;
}

/**
 * Функция, вызываемая в каждый отдельный фрейм анимации
 * @callback animationCallback
 * @param {Fraction} fraction - процент выполнения анимации. С ним нужно что-то сделать (например,
 * умножить на желаемую высоту элемента, при анимации изменения высоты элемента)
 */
/**
 * Функция, вызываемая после завершения анимации
 * @callback animationFinalCallback
 */
/**
 * Функция запрашивает API requestAnimationFrame для отрисовки анимации
 * @param {Object} object
 * @param {Milliseconds} object.duration - длительность анимации
 * @param {BezierEasing} object.easing - timing function
 * @param {animationCallback} object.draw
 * @param {animationFinalCallback} object.end
 */
function animate({ duration, easing = linear, draw, end }) {
  const start = window.performance.now();

  function performFrame(time) {
    let fraction = (time - start) / duration;
    if (fraction < 0) fraction = 0;
    if (fraction > 1) fraction = 1;

    const progress = easing(fraction);

    draw(progress);

    if (fraction < 1) {
      window.requestAnimationFrame(performFrame);
    } else if (end) {
      end();
    }
  }

  window.requestAnimationFrame(performFrame);
}

export { animate };
