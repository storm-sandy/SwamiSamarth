function payUPI() {
  let upiUrl = "upi://pay?pa=merchant@upi&pn=Swami%20Samarth%20Travels&am=500&cu=INR";
  window.location.href = upiUrl;
}

function payRazorpay() {
  var options = {
    key: "rzp_test_xxxxx", // replace with live key
    amount: 5, // ₹500
    currency: "INR",
    name: "Swami Samarth Travels",
    description: "Trip Booking",
    handler: function (response) {
      alert("Payment Successful");
      sendWhatsApp(response.razorpay_payment_id);
    },
    prefill: {
      name: "Sandy Shar",
      contact: "7666022883"
    },
    theme: {
      color: "#3399cc"
    }
  };

  var rzp = new Razorpay(options);
  rzp.open();
}

function payCOD() {
  alert("Booking confirmed. Pay on pickup.");
  sendWhatsApp("COD");
  }

function sendWhatsApp(paymentId) {
  let msg = `Booking Confirmed
Payment: ${paymentId}
Thank you for choosing Swami Samarth Travels`;

  let url = "https://wa.me/917666022883?text=" + encodeURIComponent(msg);
  window.open(url, "_blank");
            }
