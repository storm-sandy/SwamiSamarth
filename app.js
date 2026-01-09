if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    document.getElementById("updateBtn").style.display = "block";
  });
}

document.getElementById("updateBtn").onclick = () => {
  location.reload();
};
