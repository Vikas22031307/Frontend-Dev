// Q7: Login Form Validation using RegExp
// Usage: page with form id="loginForm", inputs id="username" and id="password"

const LoginValidator = (() => {
  const userRe = /^.{5,}$/; // at least 5 chars
  const passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  function validate(username, password) {
    if (!userRe.test(username)) return { ok:false, field:'username', msg:'Username must be at least 5 characters' };
    if (!passRe.test(password)) return { ok:false, field:'password', msg:'Password must be 8+ chars with upper, lower, number and special char' };
    return { ok:true };
  }

  function attach(formId='loginForm') {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const uname = form.querySelector('#username').value;
      const pwd = form.querySelector('#password').value;
      const res = validate(uname,pwd);
      if (res.ok) alert('Login data valid!');
      else alert(`Error (${res.field}): ${res.msg}`);
    });
  }

  return { validate, attach };
})();

if (typeof window !== 'undefined') window.addEventListener('DOMContentLoaded', () => LoginValidator.attach('loginForm'));

if (typeof module !== 'undefined') module.exports = { LoginValidator };
