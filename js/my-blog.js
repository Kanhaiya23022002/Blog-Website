//if login notfound
if (localStorage.getItem("login") === null) {
  toasterdanger("Login First");
  setTimeout(() => {
    window.location.replace("./login.html");
  }, 300);
}

//for login button
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
//userblogs

function printblog() {
  let myblog = localStorage.getItem("blogs");
  myblog = JSON.parse(myblog);

  let userblogs = myblog.filter((value) => {
    return value.loginid == localStorage.getItem("login");
  });

  let card = document.querySelector("#dyn-blog");

  let blg = userblogs.map((value) => {
    return `<article class="bgsec">
    <div class="lhs">
        <div class="c-title">
            <p>${value.title}</p>
        </div>
        <div class="c-desp">
            <p>${value.description}</p>
            <p class="delbtn"><button id="blgdel" data-id="${value.id}">Delete</button></p>
        </div>
    </div>
    <div class="rhs">
        <img src="${value.url}" alt="img Placeholder">
    </div>
  </article>`;
  });

  card.innerHTML = blg.join("");
  delelement();
}

printblog();

//for deleting elements
function delelement() {
  let deletebtn = document.querySelectorAll("#blgdel");

  console.log(deletebtn); // ab ye array return krega

  deletebtn.forEach((value) => {
    console.log(value); // will return individual buttons, so har value ko event listner add krdo.

    value.addEventListener("click", () => {
      //jo bhi button clicked hai, uski id must be returned
      let id = value.dataset.id;
      console.log(id); //returns id as number.

      //now, blogs lo and remove blog with certain id
      let newblogs = JSON.parse(localStorage.getItem("blogs"));
      newblogs = newblogs.filter((temp) => {
        return temp.id != id;
      });
      localStorage.setItem("blogs", JSON.stringify(newblogs));
      toastersuccess("Blog Deleted Successfully");
      printblog();
    });
  });
}
