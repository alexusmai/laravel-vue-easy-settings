<template>
  <div class="m-3">
      <notifications v-if="showNotifications">
          <!-- Notifications -->
      </notifications>
      <component v-bind:is="currentView">
          <!-- Components -->
      </component>
  </div>
</template>

<script>
import SettingsList from './SettingsList';
import AddNewGroup from './AddNewGroup';
import EditGroup from './EditGroup';
import EditSettings from './EditSettings';
import DeleteGroup from './DeleteGroup';
import SettingsHelper from './SettingsHelper';
import Notifications from './Notifications';
import Loading from './Loading';

export default {
  name: 'easy-settings-app',
  components: {
    SettingsList,
    AddNewGroup,
    EditGroup,
    EditSettings,
    DeleteGroup,
    SettingsHelper,
    Notifications,
    Loading,
  },
  computed: {
    /**
     * Current view
     * @returns {computed.currentView|string|*}
     */
    currentView() {
      return this.$store.state.esettings.currentView;
    },
    /**
     * Show/Hide notifications block
     * @returns {boolean}
     */
    showNotifications() {
      return this.$store.state.esettings.notifications.show;
    },
  },
  created() {
    this.$store.dispatch('esettings/initiate');
  },
};
</script>

<style lang="scss">
    @import "node_modules/bootstrap/scss/functions";
    @import "node_modules/bootstrap/scss/variables";
    @import "node_modules/bootstrap/scss/mixins";

    @import "node_modules/bootstrap/scss/reboot";
    @import "node_modules/bootstrap/scss/type";
    @import "node_modules/bootstrap/scss/grid";
    @import "node_modules/bootstrap/scss/utilities";

    @import "node_modules/bootstrap/scss/alert";
    @import "node_modules/bootstrap/scss/buttons";
    @import "node_modules/bootstrap/scss/tables";
    @import "node_modules/bootstrap/scss/forms";
    @import "node_modules/bootstrap/scss/jumbotron";
    @import "node_modules/bootstrap/scss/card";
</style>