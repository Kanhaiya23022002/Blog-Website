let cnt_name = document.querySelector("#cnt-name");
let cnt_email = document.querySelector("#cnt-email");
let cnt_query = document.querySelector("#cnt-query");
let cnt_button = document.querySelector("#cnt-button");

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

//push data
let info = [];

cnt_button.addEventListener("click", () => {
  let newinfo = {
    name: cnt_name.value,
    email: cnt_email.value,
    query: cnt_query.value,
  };

  if (cnt_name.value == "" || cnt_email.value == "" || cnt_query.value == "") {
    toasterdanger("Fill out all the fields");
    return false;
  }

  let info = localStorage.getItem("contact");
  info = info === null ? [] : JSON.parse(info);

  info.push(newinfo);
  console.log(info);

  localStorage.setItem("contact", JSON.stringify(info));
  toastersuccess("We'll reach you out soon");

  cnt_name.value = "";
  cnt_email.value = "";
  cnt_query.value = "";
});
