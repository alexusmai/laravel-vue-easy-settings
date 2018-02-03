import HTTP from '../axios-settings';
import ru from '../lang/ru';
import en from '../lang/en';

const esettings = {
  namespaced: true,
  state() {
    return {
      config: {
        dev: false,
        languages: [],
        interfaceLang: 'en',
        translations: {
          ru,
          en,
        },
      },
      currentView: 'Loading',
      settingsList: null,
      selectedIndex: null,
      notifications: {
        show: false,
        type: '',
        messages: [],
      },
    };
  },
  mutations: {
    /**
     * App initialization
     * @param state
     * @param config
     * @param locale
     */
    setConfig(state, { config, locale }) {
      state.config.dev = config.dev;
      state.config.languages = config.languages;
      state.config.interfaceLang = locale;
    },
    /**
     * Set settings list
     * @param state
     * @param list
     */
    setSettingsList(state, list) {
      state.settingsList = list;
    },
    /**
     * Set the displayed module
     * @param state
     * @param moduleName
     */
    setCurrentView(state, moduleName) {
      state.currentView = moduleName;
    },

    /**
     * Set selected Index
     * @param state
     * @param index
     */
    setSelectedIndex(state, index) {
      state.selectedIndex = index;
    },
    /**
     * Set notification messages
     * @param state
     * @param type
     * @param messages
     */
    setNotificationMessages(state, { type, messages }) {
      state.notifications.show = true;
      state.notifications.type = type;
      state.notifications.messages = messages;
    },
    /**
     * Show notifications block
     * @param state
     */
    showNotifications(state) {
      state.notifications.show = true;
    },
    /**
     * Reset notifications
     * @param state
     */
    resetNotifications(state) {
      state.notifications.show = false;
      state.notifications.type = '';
      state.notifications.messages = [];
    },
  },
  actions: {
    /**
     * Initiate - get configuration from server
     * @param commit
     * @param dispatch
     */
    initiate({ commit, dispatch }) {
      HTTP.get('initiate')
        .then((response) => {
          commit('setConfig', {
            config: response.data.config,
            locale: response.data.locale,
          });
          // get settings list
          return dispatch('getSettingsList').then(() => {
            commit('setCurrentView', 'SettingsList');
          });
        })
        .catch((error) => {
          // show notifications
          dispatch('showNotifications', error.response);
        });
    },
    /**
     * Get settings list from server
     * @param context
     */
    getSettingsList({ commit, dispatch }) {
      HTTP.get('list')
        .then((response) => {
          commit('setSettingsList', response.data);
        })
        .catch((error) => {
          // show notifications
          dispatch('showNotifications', error.response);
        });
    },
    /**
     * Add new settings group
     * @param commit
     * @param dispatch
     * @param formData
     */
    addGroup({ commit, dispatch }, formData) {
      HTTP.post('add-group', formData)
        .then(response =>
          // refresh settings list
          dispatch('getSettingsList').then(() => {
            // back to main page
            commit('setCurrentView', 'SettingsList');
            // show notifications
            dispatch('showNotifications', response);
          }))
        .catch((error) => {
          // show notifications
          dispatch('showNotifications', error.response);
        });
    },
    /**
     * Update settings group
     * @param commit
     * @param dispatch
     * @param formData
     */
    updateGroup({ commit, dispatch }, formData) {
      HTTP.post('update-group', formData)
        .then(response =>
          // refresh settings list
          dispatch('getSettingsList').then(() => {
            // back to main page
            commit('setCurrentView', 'SettingsList');
            // show notifications
            dispatch('showNotifications', response);
          }))
        .catch((error) => {
          // show notifications
          dispatch('showNotifications', error.response);
        });
    },
    /**
     * Delete selected group
     * @param context
     * @param id
     */
    deleteGroup({ commit, dispatch }, id) {
      HTTP.get(`delete-group/${id}`)
        .then(response =>
          // refresh settings list
          dispatch('getSettingsList').then(() => {
            // back to main page
            commit('setCurrentView', 'SettingsList');
            // show notifications
            dispatch('showNotifications', response);
          }))
        .catch((error) => {
          // show notifications
          dispatch('showNotifications', error.response);
        });
    },
    setSettings({ commit, dispatch }, formData) {
      HTTP.post('set-settings', formData)
        .then(response =>
          // refresh settings list
          dispatch('getSettingsList').then(() => {
            // back to main page
            commit('setCurrentView', 'SettingsList');
            // show notifications
            dispatch('showNotifications', response);
          }))
        .catch((error) => {
          // show notifications
          dispatch('showNotifications', error.response);
        });
    },
    /**
     * Show/Hide notifications
     * @param commit
     * @param dispatch
     * @param response
     */
    showNotifications({ commit, dispatch }, response) {
      let messages = [];
      let type = '';
      // get message if exist
      if ('message' in response.data) {
        messages.push(response.data.message);
      }
      // notifications type
      if (response.status === 200) {
        type = 'success';
      } else {
        type = 'danger';
        // get errors if exist
        if ('errors' in response.data) {
          Object.keys(response.data.errors).forEach((key) => {
            if (Array.isArray(response.data.errors[key])) {
              messages = messages.concat(response.data.errors[key]);
            } else {
              messages.push(response.data.errors[key]);
            }
          });
        }
      }
      // set state
      commit('setNotificationMessages', {
        type,
        messages,
      });
      // set timer
      setTimeout(() => {
        commit('resetNotifications');
      }, 5000);
    },
  },
};

export default esettings;
