// Q4: Custom Form Builder (Forms + Classes)
// FormBuilder takes an array of field objects and creates a form using innerHTML.
// Example field: { type: 'text', label: 'Username', name: 'username', placeholder: 'Enter...' }

class FormBuilder {
  constructor(containerId, fields = [], submitText = 'Submit') {
    this.container = document.getElementById(containerId);
    if (!this.container) throw new Error('Container not found');
    this.fields = fields;
    this.submitText = submitText;
    this.form = null;
    this.build();
  }

  build() {
    const form = document.createElement('form');
    form.id = `${this.container.id}-generated-form`;
    let inner = '';
    this.fields.forEach(f => {
      inner += `<div class="field"><label>${f.label}</label><input type="${f.type}" name="${f.name || f.label.toLowerCase()}" placeholder="${f.placeholder||''}" /></div>`;
    });
    inner += `<div class="field"><button type="submit">${this.submitText}</button></div>`;
    form.innerHTML = inner;
    this.container.innerHTML = '';
    this.container.appendChild(form);
    this.form = form;
    // prevent default submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = this.getFormData();
      if (this.onSubmit) this.onSubmit(data);
    });
  }

  getFormData() {
    if (!this.form) return {};
    const data = {};
    new FormData(this.form).forEach((v,k) => data[k] = v);
    return data;
  }

  setOnSubmit(fn) {
    this.onSubmit = fn;
  }
}

// Export for Node/browser
if (typeof module !== 'undefined') module.exports = { FormBuilder };
