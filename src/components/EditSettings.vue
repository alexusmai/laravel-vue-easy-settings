<template>
    <div>
        <p class="lead">{{ selectedItem.title}}</p>
        <hr>
        <form id="estune" v-on:submit.prevent="submitForm">

            <template v-for="item in selectedItem.schema">
                <template v-if="item.type === 'lang'">
                    <div class="form-group row" v-for="lang in languages">
                        <label class="col-sm-3 col-form-label"
                               v-bind:for="`input-${item.name}-${lang}`">{{ `[${lang}] ${item.description}` }}</label>
                        <div class="col-sm-9">
                            <textarea class="form-control" rows="2"
                                      v-bind:name="`${item.name}[${lang}]`"
                                      v-bind:id="`input-${item.name}-${lang}`">{{ getValue(item.name)[lang] }}</textarea>
                        </div>
                    </div>
                </template>
                <template v-else-if="item.type === 'radios'">
                    <div class="form-group row">
                        <div class="col-sm-3">
                            {{ item.description}}
                        </div>
                        <div class="col-sm-9">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio"
                                       value="true"
                                       v-bind:name="item.name"
                                       v-bind:id="`input-${item.name}-1`"
                                       v-bind:checked="getValue(item.name) === 'true' ? 'checked' : ''">
                                <label class="form-check-label" v-bind:for="`input-${item.name}-1`">ON</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio"
                                       value="false"
                                       v-bind:name="item.name"
                                       v-bind:id="`input-${item.name}-2`"
                                       v-bind:checked="getValue(item.name) === 'false' ? 'checked' : ''">
                                <label class="form-check-label" v-bind:for="`input-${item.name}-2`">OFF</label>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" v-bind:for="`input-${item.name}`">
                            {{ item.description}}
                        </label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control"
                                   v-if="item.type === 'text'"
                                   v-bind:name="item.name"
                                   v-bind:id="`input-${item.name}`"
                                   v-bind:value="getValue(item.name)">
                            <textarea class="form-control" rows="2"
                                      v-else-if="item.type === 'textarea'"
                                      v-bind:name="item.name"
                                      v-bind:id="`input-${item.name}`">{{ getValue(item.name) }}</textarea>
                        </div>
                    </div>
                </template>
            </template>

            <p class="text-right">
                <button class="btn btn-outline-info" type="submit">{{ lang.btn.submit }}</button>
                <button class="btn btn-outline-secondary" type="button"
                        v-on:click="cancel">{{ lang.btn.cancel }}</button>
            </p>
        </form>
    </div>
</template>

<script>
  import helper from '../mixins/helper';

  export default {
    mixins: [helper],
    name: 'edit-settings',
    data() {
      return {
        selectedItem: [],
      };
    },
    computed: {
      languages() {
        return this.$store.state.esettings.config.languages;
      },
    },
    methods: {
      // Get value for form
      getValue(name) {
        if (this.selectedItem.data) {
          return this.selectedItem.data[name];
        }
        // data empty
        return '';
      },
      /**
       * Submit form data
       */
      submitForm() {
        // form data
        const formData = new FormData(document.forms.estune);
        // add id
        formData.append('id', this.selectedItem.id);
        // update - server side - refresh - go back
        this.$store.dispatch('esettings/setSettings', formData);
      },
    },
    created() {
      // copy item for edit
      this.selectedItem = JSON.parse(JSON.stringify(
        this.$store.state.esettings.settingsList[this.$store.state.esettings.selectedIndex],
      ));
    },
  };
</script>