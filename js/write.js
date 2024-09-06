let wrt_title = document.querySelector("#wrt-title");
let wrt_desc = document.querySelector("#wrt-desc");
let wrt_button = document.querySelector("#wrt-button");
let wrt_url = document.querySelector("#wrt-url");
let imgt = document.querySelector("#imgt");

let usr = document.querySelector(".user-txt");

let nm = null;

//if login notfound
if (localStorage.getItem("login") === null) {
  toasterdanger("Login First");
  setTimeout(() => {
    window.location.replace("./login.html");
  }, 300);
} else {
  let list = localStorage.getItem("users");
  let login = localStorage.getItem("login");
  list = JSON.parse(list);
  nm = list[login].name.split(" ")[0]; //.split(" ")[0] will split the name and then return element at 0th index.
  usr.innerHTML = `Hello, <b>${nm}</b> !`;
}
let imgp = document.querySelector(".rhs");
wrt_url.addEventListener("blur", () => {
  imgp.innerHTML = `<img src="${wrt_url.value}" alt="blog content img"></img>`;
});

wrt_button.addEventListener("click", () => {
  let blog = {
    title: wrt_title.value,
    description: wrt_desc.value,
    url: wrt_url.value,
    author: nm,
    loginid: localStorage.getItem("login"),
    id: Date.now(),
  };

  if (wrt_title.value == "" || wrt_desc.value == "" || wrt_url.value == "") {
    toasterdanger("Fill out all the fields");
    return false;
  } else {
    let ext_blog = localStorage.getItem("blogs");
    ext_blog = ext_blog === null ? [] : JSON.parse(ext_blog);

    ext_blog.unshift(blog);

    localStorage.setItem("blogs", JSON.stringify(ext_blog));
    toastersuccess("Blog saved successfully");

    wrt_title.value = "";
    wrt_desc.value = "";
    wrt_url.value = "";
  }
});

//logout
let logout = document.querySelector("#logout");

logout.addEventListener("click", () => {
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
