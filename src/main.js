import Vue from 'vue';
import PCApp from './pc_app.vue';
import 'minireset.css';
import './fonts.css';

/**
 * Файл подключения глобально используемых компонентов
 */
import registerGlobals from 'js/register_globals';

registerGlobals();

new Vue({
  el: '#app',
  render: h => h(PCApp),
});
