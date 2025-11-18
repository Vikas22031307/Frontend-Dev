// Q8: Dynamic Object Updater
// user = { name: "John", email: "john@mail.com", age: 21 }
// Include this script in a page with a form id="userForm" and fields name="name","email","age",
// and a container with id="userDisplay" to show updated object.

const DynamicUpdater = (() => {
  const user = { name: "John", email: "john@mail.com", age: 21 };

  function updateDisplay(containerId='userDisplay') {
    const c = document.getElementById(containerId);
    if (!c) return;
    c.textContent = JSON.stringify(user, null, 2);
  }

  function attach(formId='userForm', displayId='userDisplay') {
    const form = document.getElementById(formId);
    if (!form) return;
    // set initial values
    form.querySelector('[name="name"]').value = user.name;
    form.querySelector('[name="email"]').value = user.email;
    form.querySelector('[name="age"]').value = user.age;
    updateDisplay(displayId);

    form.addEventListener('input', () => {
      const fd = new FormData(form);
      for (const [k,v] of fd.entries()) {
        if (k === 'age') user[k] = Number(v) || 0;
        else user[k] = v;
      }
      updateDisplay(displayId);
    });

    form.addEventListener('submit', (e)=> e.preventDefault());
  }

  return { user, attach, updateDisplay };
})();

if (typeof window !== 'undefined') window.addEventListener('DOMContentLoaded', () => DynamicUpdater.attach('userForm','userDisplay'));

if (typeof module !== 'undefined') module.exports = { DynamicUpdater };
