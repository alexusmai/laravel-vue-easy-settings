export default {
  computed: {
    /**
     * Selected translate
     * @returns {*}
     */
    lang() {
      // If selected translations exists
      if (Object.prototype.hasOwnProperty.call(
        this.$store.state.esettings.config.translations,
          this.$store.state.esettings.config.interfaceLang)
      ) {
        return this.$store.state.esettings.config.translations[
          this.$store.state.esettings.config.interfaceLang
          ];
      }
      // default translate - en
      return this.$store.state.esettings.config.translations.en;
    },
  },
  methods: {
    /**
     * Return to main page
     */
    cancel() {
      this.$store.commit('esettings/setCurrentView', 'SettingsList');
    },
  },
};
