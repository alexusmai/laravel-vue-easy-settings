import esettings from './store/esettings';
import EasySettingsApp from './components/EasySettingsApp';

function install(Vue, options = {}) {
  if (!options.store) console.error('Please provide a store!!');

  Vue.component('easy-settings-app', EasySettingsApp);

  options.store.registerModule('esettings', esettings);
}

export default {
  install,
};
