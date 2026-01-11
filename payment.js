function payUPI() {
  let upi =
    "upi://pay?pa=imcsandeepsharma@oksbi&pn=Swami%20Samarth%20Travels&am=5&cu=INR";
  window.location.href = upi;
}

function confirmWhatsApp() {
  let msg = `Hello,
I have paid ₹5 via UPI.
Please confirm my booking.

Name: Sandy
Date: 11jan2026
Pickup Point: Nallasopara`;

  window.open(
    "https://wa.me/917666022883?text=" + encodeURIComponent(msg),
    "_blank"
  );
}

function cod() {
  alert("Booking confirmed. Pay on pickup.");
  confirmWhatsApp();
    }
