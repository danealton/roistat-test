import Vue from 'vue';

import * as Global from 'components/global';

export default () => {
  // Динамически регистрируем все глобальные компоненты
  Object.keys(Global).forEach(entity => {
    if (!entity.match(/directive/i)) {
      Vue.component(entity, Global[entity]);
    }
  });
};
