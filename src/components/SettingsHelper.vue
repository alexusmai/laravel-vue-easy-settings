<template>
    <div>
        <p class="lead">{{ lang.helper.title }}</p>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">{{ lang.fields.example }}</th>
                    <th scope="col">{{ lang.fields.desc }}</th>
                    <th scope="col">{{ lang.fields.type }}</th>
                    <th scope="col">{{ lang.fields.rules }}</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="settingsGroup in settingsList">
                    <tr>
                        <td colspan="4"><strong>{{ settingsGroup.title }}</strong></td>
                    </tr>
                    <tr v-for="item in settingsGroup.schema">
                        <td>ESettings::get('{{ `${settingsGroup.name}.${item.name}` }}')</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.type }}</td>
                        <td>{{ item.rules }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
        <p class="text-right">
            <button class="btn btn-outline-secondary" type="button"
                    v-on:click="cancel">{{ lang.btn.cancel }}</button>
        </p>
    </div>
</template>

<script>
  import helper from '../mixins/helper';

  export default {
    mixins: [helper],
    name: 'settings-helper',
    computed: {
      settingsList() {
        return this.$store.state.esettings.settingsList;
      },
    },
  };
</script>