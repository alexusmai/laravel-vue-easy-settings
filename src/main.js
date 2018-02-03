import Vue from 'vue';
import Vuex from 'vuex';
import esettings from './store/esettings';
import EasySettingsApp from './components/EasySettingsApp';

import './assets/styles.scss';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    esettings,
  },
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#easy-settings-app',
  store,
  render: h => h(EasySettingsApp),
});
