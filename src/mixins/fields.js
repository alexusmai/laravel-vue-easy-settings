export default {
  methods: {
    /**
     * Add new fields
     */
    addFields() {
      this.formGroup.push(
        {
          groupId: this.formGroupCounter,
          fields: [
            {
              name: 'name[]',
              title: this.lang.fields.name,
              id: `inputName-${this.formGroupCounter}`,
              type: 'input',
              value: '',
            },
            {
              name: 'description[]',
              title: this.lang.fields.desc,
              id: `inputDescription-${this.formGroupCounter}`,
              type: 'input',
              value: '',
            },
            {
              name: 'type[]',
              title: this.lang.fields.type,
              id: `selectType-${this.formGroupCounter}`,
              type: 'select',
              value: 'text',
            },
            {
              name: 'rules[]',
              title: this.lang.fields.rules,
              id: `inputRules-${this.formGroupCounter}`,
              type: 'input',
              value: '',
            },
          ],
        },
      );
      // counter ++
      this.formGroupCounter += 1;
    },
  },
};
