<template>
    <div>
        <form id="esadd" v-on:submit.prevent="submitForm">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputGroupName">{{ lang.fields.groupName }}</label>
                    <input type="text" class="form-control" id="inputGroupName" name="groupName"
                           required
                           v-model="groupName">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputGroupTitle">{{ lang.fields.groupTitle }}</label>
                    <input type="text" class="form-control" id="inputGroupTitle" name="groupTitle"
                           required
                           v-model="groupTitle">
                </div>
            </div>
            <div class="row">
                <div class="col-md">
                    <strong>{{ lang.fields.example }}: </strong>
                    <code>{{ example }}</code>
                </div>
            </div>
            <hr>
            <div class="form-row" v-for="group in formGroup">
                <div class="form-group col-md-3" v-for="field in group.fields">
                    <label v-bind:for="field.id">{{ field.title }}</label>

                    <input type="text" class="form-control"
                           v-if="field.type === 'input'"
                           v-bind:required="field.name !== 'rules[]'"
                           v-bind:name="field.name"
                           v-bind:id="field.id"
                           v-model="field.value">

                    <select class="form-control" required
                            v-else
                            v-bind:id="field.id"
                            v-bind:name="field.name"
                            v-model="field.value">
                        <option value="text">Text</option>
                        <option value="textarea">Textarea</option>
                        <option value="radios">Radios</option>
                        <option value="lang">Lang</option>
                    </select>
                </div>
            </div>
            <hr>
            <p class="text-center text-danger">
                {{ lang.validationNote }} --->
                <a href="https://laravel.com/docs/5.5/validation#available-validation-rules" target="_blank">Laravel Docs</a>
            </p>
            <p>
                <button class="btn btn-outline-success" type="button"
                        v-on:click="addFields">{{ lang.btn.addFields }}</button>
                <button class="btn btn-outline-danger" type="button"
                        v-on:click="removeLastFields">{{ lang.btn.removeFields }}</button>
                <span class="float-right">
                    <button class="btn btn-outline-info" type="submit">{{ lang.btn.submit }}</button>
                    <button class="btn btn-outline-secondary" type="button"
                            v-on:click="cancel">{{ lang.btn.cancel }}</button>
                </span>
            </p>
        </form>
    </div>
</template>

<script>
  import helper from '../mixins/helper';
  import fields from '../mixins/fields';

  export default {
    mixins: [helper, fields],
    name: 'add-new-group',
    data() {
      return {
        groupName: '',
        groupTitle: '',
        formGroupCounter: 0,
        formGroup: [],
      };
    },
    computed: {
      // code example
      example() {
        return `ESettings::get('${this.groupName}.${this.formGroup[0].fields[0].value}')`;
      },
    },
    methods: {
      /**
       * Remove last fields
       */
      removeLastFields() {
        if (this.formGroupCounter > 1) {
          this.formGroup.pop();
          // counter --
          this.formGroupCounter -= 1;
        }
      },
      /**
       * Submit form data
       */
      submitForm() {
        // form data
        const formData = new FormData(document.forms.esadd);
        this.$store.dispatch('esettings/addGroup', formData);
      },
    },
    created() {
      /**
       * Add one fields group
       */
      this.addFields();
    },
  };
</script>