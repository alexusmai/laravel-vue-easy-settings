<template>
    <div>
        <form id="esupdate" v-on:submit.prevent="submitForm">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputGroupName">{{ lang.fields.groupName }}</label>
                    <input type="text" class="form-control" id="inputGroupName" name="groupName"
                           disabled
                           v-model="selectedItem.name">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputGroupTitle">{{ lang.fields.groupTitle }}</label>
                    <input type="text" class="form-control" id="inputGroupTitle" name="groupTitle"
                           required
                           v-model="selectedItem.title">
                </div>
            </div>
            <div class="row" v-if="selectedItem.schema.length">
                <div class="col-md">
                    <strong>{{ lang.fields.example }}: </strong>
                    <code>{{ example }}</code>
                </div>
            </div>
            <hr>
            <div class="form-row" v-for="(group, index) in selectedItem.schema">
                <input type="hidden" name="name[]" v-bind:value="group.name">
                <div class="form-group col-md-2">
                    <label v-bind:for="`inputName-${index}`">{{ lang.fields.name }}</label>
                    <input type="text" class="form-control"
                           disabled
                           v-bind:id="`inputName-${index}`"
                           v-model="group.name">
                </div>
                <div class="form-group col-md-3">
                    <label v-bind:for="`inputDescription-${index}`">{{ lang.fields.desc }}</label>
                    <input type="text" class="form-control" name="description[]" required
                           v-bind:id="`inputDescription-${index}`"
                           v-model="group.description">
                </div>
                <div class="form-group col-md-3">
                    <label v-bind:for="`selectType-${index}`">{{ lang.fields.type }}</label>

                    <select class="form-control" name="type[]" required
                            v-bind:id="`selectType-${index}`"
                            v-model="group.type">
                        <option value="text">Text</option>
                        <option value="textarea">Textarea</option>
                        <option value="radios">Radios</option>
                        <option value="lang">Lang</option>
                    </select>
                </div>
                <div class="form-group col-md-3">
                    <label v-bind:for="`inputRules-${index}`">{{ lang.fields.rules }}</label>
                    <input type="text" class="form-control" name="rules[]"
                           v-bind:id="`inputRules-${index}`"
                           v-model="group.rules">
                </div>
                <div class="form-group col-md-1 text-right">
                    <label class="text-danger d-block">{{ lang.btn.delete }}</label>
                    <button type="button" class="btn btn-outline-danger"
                            v-on:click="deleteRow(index)">X</button>
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
    name: 'edit-group',
    data() {
      return {
        formGroupCounter: 0,
        formGroup: [],
        selectedItem: [],
      };
    },
    computed: {
      // code example
      example() {
        return `ESettings::get('${this.selectedItem.name}.${this.selectedItem.schema[0].name}')`;
      },
    },
    methods: {
      /**
       * Remove last fields
       */
      removeLastFields() {
        if (this.formGroupCounter > this.selectedItem.schema.length) {
          this.formGroup.pop();
          // counter --
          this.formGroupCounter -= 1;
        }
      },
      /**
       * Delete row
       * @param index
       */
      deleteRow(index) {
        if (this.selectedItem.schema.length > 1) {
          this.selectedItem.schema.splice(index, 1);
        }
      },
      /**
       * Submit form data
       */
      submitForm() {
        // form data
        const formData = new FormData(document.forms.esupdate);
        // add id
        formData.append('id', this.selectedItem.id);
        // update - server side - refresh - go back
        this.$store.dispatch('esettings/updateGroup', formData);
      },
    },
    created() {
      // copy item for edit
      this.selectedItem = JSON.parse(JSON.stringify(
        this.$store.state.esettings.settingsList[this.$store.state.esettings.selectedIndex],
      ));
      this.formGroupCounter = this.selectedItem.schema.length;
    },
  };
</script>