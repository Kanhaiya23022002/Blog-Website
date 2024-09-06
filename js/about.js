let log = document.querySelector("#log");

if (localStorage.getItem("login") === null) {
  log.innerHTML = "Log In";
  log.addEventListener("click", () => {
    window.location.replace("./login.html");
  });
} else {
  log.innerHTML = "Log Out";
  log.addEventListener("click", () => {
    Swal.fire({
      title: "Are you sure ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("login");
        window.location.replace("./index.html");
      }
    });
  });
}
