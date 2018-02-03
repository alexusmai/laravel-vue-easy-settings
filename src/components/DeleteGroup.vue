<template>
    <div class="card border-danger text-center">
        <div class="card-header"><strong>{{ `${lang.delTitle}: ${selectedItem.title}` }}</strong></div>
        <div class="card-body text-danger">
            <h5 class="card-title">{{ lang.delConfirm }}</h5>
            <button class="btn btn-outline-danger" type="button" v-on:click="deleteGroup">{{ lang.btn.delete }}</button>
            <button class="btn btn-outline-secondary" type="button" v-on:click="cancel">{{ lang.btn.cancel }}</button>
        </div>
    </div>
</template>

<script>
  import helper from '../mixins/helper';

  export default {
    mixins: [helper],
    name: 'delete-group',
    computed: {
      /**
       * Selected Item
       * @returns {*}
       */
      selectedItem() {
        return this.$store.state.esettings.settingsList[this.$store.state.esettings.selectedIndex];
      },
    },
    methods: {
      /**
       * Delete selected group from DB
       */
      deleteGroup() {
        this.$store.dispatch('esettings/deleteGroup', this.selectedItem.id);
      },
    },
  };
</script>