// Q2: Student Form Validator (Forms + RegExp)
// Usage: include this script in a page with a form having id="studentForm"
// fields: name (id="name"), email (id="email"), phone (id="phone"), password (id="password")
// The script attaches validation on submit and on input.

const StudentValidator = (() => {
  const nameRe = /^[A-Za-z\s]+$/;
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRe = /^\d{10}$/;
  const passRe = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/; // at least 1 uppercase,1 digit,1 special

  function setState(el, valid, message='') {
    if (!el) return;
    el.style.border = valid ? '2px solid green' : '2px solid red';
    let msg = el.nextElementSibling;
    if (!msg || !msg.classList || !msg.classList.contains('validation-msg')) {
      msg = document.createElement('div');
      msg.className = 'validation-msg';
      el.parentNode.insertBefore(msg, el.nextSibling);
    }
    msg.textContent = valid ? '' : message;
  }

  function validateAll(form) {
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const phone = form.querySelector('#phone');
    const password = form.querySelector('#password');

    const nameValid = nameRe.test(name.value.trim());
    setState(name, nameValid, 'Name must contain only alphabets');

    const emailValid = emailRe.test(email.value.trim());
    setState(email, emailValid, 'Invalid email format');

    const phoneValid = phoneRe.test(phone.value.trim());
    setState(phone, phoneValid, 'Phone must be exactly 10 digits');

    const passValid = passRe.test(password.value);
    setState(password, passValid, 'Password needs 1 uppercase, 1 number, 1 special char');

    return nameValid && emailValid && phoneValid && passValid;
  }

  function attach(formId='studentForm') {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok = validateAll(form);
      if (ok) alert('Form valid! You can submit.');
    });
    // live validation
    ['name','email','phone','password'].forEach(id => {
      const el = form.querySelector('#'+id);
      if (!el) return;
      el.addEventListener('input', () => validateAll(form));
    });
  }

  return { attach, validateAll };
})();

// For browser auto-attach if DOM ready
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    StudentValidator.attach('studentForm');
  });
}

// Export for Node testing
if (typeof module !== 'undefined') module.exports = { StudentValidator };
