<template>
    <div>
        <div class="table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col" v-if="devMode">#</th>
                    <th scope="col">{{ lang.fields.thTitle }}</th>
                    <th scope="col" class="text-right">{{ lang.fields.thActions }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in settingsList">
                    <th scope="row" v-if="devMode">{{ item.id }}</th>
                    <td>{{ item.title }}</td>
                    <td class="text-right">
                        <button class="btn btn-outline-info" type="button"
                                v-on:click="editSettings(index)">{{ lang.btn.tuneIn }}</button>
                        <template v-if="devMode">
                            <button class="btn btn-outline-warning" type="button"
                                    v-on:click="editGroup(index)">{{ lang.btn.edit }}</button>
                            <button class="btn btn-outline-danger" type="button"
                                    v-on:click="deleteGroup(index)">{{ lang.btn.delete }}</button>
                        </template>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <p v-if="devMode">
            <button class="btn btn-outline-info" type="button"
                    v-on:click="addGroup">{{ lang.btn.addGroup }}</button>
            <button class="btn btn-outline-secondary" type="button"
                    v-on:click="showHelper">{{ lang.btn.helper }}</button>
        </p>
    </div>
</template>

<script>
  import helper from '../mixins/helper';

  export default {
    mixins: [helper],
    name: 'settings-list',
    computed: {
      /**
       * Development mode
       */
      devMode() {
        return this.$store.state.esettings.config.dev;
      },
      /**
       * All settings
       */
      settingsList() {
        return this.$store.state.esettings.settingsList;
      },
    },
    methods: {
      /**
       * Show form - Add new Group
       */
      addGroup() {
        this.$store.commit('esettings/setCurrentView', 'AddNewGroup');
      },
      /**
       * Edit selected settings
       * @param index
       */
      editSettings(index) {
        this.$store.commit('esettings/setSelectedIndex', index);
        this.$store.commit('esettings/setCurrentView', 'EditSettings');
      },
      /**
       * Edit settings group
       * @param index
       */
      editGroup(index) {
        this.$store.commit('esettings/setSelectedIndex', index);
        this.$store.commit('esettings/setCurrentView', 'EditGroup');
      },
      /**
       * Delete selected group
       * @param index
       */
      deleteGroup(index) {
        this.$store.commit('esettings/setSelectedIndex', index);
        this.$store.commit('esettings/setCurrentView', 'DeleteGroup');
      },
      /**
       * Show helper list
       */
      showHelper() {
        this.$store.commit('esettings/setCurrentView', 'SettingsHelper');
      },
    },
    created() {
      // reset selected ID
      this.$store.commit('esettings/setSelectedIndex', null);
    },
  };
</script>