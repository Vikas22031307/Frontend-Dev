// Q5: Movie Ticket Booking (Objects + RegExp)
// Include in a page with a form id="ticketForm" and fields: name,email,seats
const MovieBooking = (() => {
  const nameRe = /^[A-Za-z\s]+$/;
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(name, email, seats) {
    if (!nameRe.test(name.trim())) return { ok:false, msg:'Name must be alphabets only' };
    if (!emailRe.test(email.trim())) return { ok:false, msg:'Invalid email' };
    const s = Number(seats);
    if (!Number.isInteger(s) || s < 1 || s > 10) return { ok:false, msg:'Seats must be between 1 and 10' };
    return { ok:true };
  }

  function attach(formId='ticketForm') {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', (e)=> {
      e.preventDefault();
      const name = form.querySelector('#name').value;
      const email = form.querySelector('#email').value;
      const seats = form.querySelector('#seats').value;
      const res = validate(name,email,seats);
      if (!res.ok) return alert(res.msg);
      const booking = { name:name.trim(), email:email.trim(), seats: Number(seats) };
      // display ticket details
      alert('Booking successful:\n' + JSON.stringify(booking, null, 2));
      if (typeof MovieBooking.onBooking === 'function') MovieBooking.onBooking(booking);
    });
  }

  return { validate, attach, onBooking: null };
})();

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => MovieBooking.attach('ticketForm'));
}

if (typeof module !== 'undefined') module.exports = { MovieBooking };
