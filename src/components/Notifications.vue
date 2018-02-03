<template>
    <div class="alert mb-3" v-bind:class="`alert-${notifications.type}`" role="alert">
        <ul class="list-unstyled mb-0">
            <li v-for="message in notifications.messages">{{ message }}</li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'notifications',
    computed: {
      /**
       * Notifications list
       */
      notifications() {
        return this.$store.state.esettings.notifications;
      },
    },
  };
</script>
