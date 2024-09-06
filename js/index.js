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


//for blog
let card = document.querySelector("#dyn-blog");

let ext_blog = localStorage.getItem("blogs");
ext_blog = JSON.parse(ext_blog);

let blg = ext_blog.map((value) => {
  return `<article class="bgsec">
    <div class="lhs">
        <div class="c-title">
            <p>${value.title}</p>
        </div>
        <div class="c-desp">
            <p>${value.description}</p>
            <p class="author"> -- ${value.author}</p>
        </div>
    </div>
    <div class="rhs">
        <img src="${value.url}" alt="img Placeholder">
    </div>
  </article>`;
});

card.innerHTML = blg.join("");
// console.log(ext_blog);
