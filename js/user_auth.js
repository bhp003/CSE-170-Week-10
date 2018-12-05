function signUp() {
  var signup = document.getElementById("sign_up");
  signup.addEventListener("click", () => {
    var email = document.getElementById("username");
    var pass = document.getElementById("password");

    firebase.auth().createUserWithEmailAndPassword(email.value, pass.value).then(() => {
      firebase.auth().signInWithEmailAndPassword(email.value, pass.value).then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user)
            window.location.href = "home.html";
        });
      });
    });
  });
}

function signIn() {
  var signinbtn = document.getElementById("signin");
  var email = document.getElementById("username");
  var pass = document.getElementById("password");
  signinbtn.addEventListener("click", () => {
    firebase.auth().signInWithEmailAndPassword(email.value, pass.value).then(() => {
      firebase.auth().onAuthStateChanged((user) => {
      if (user)
        window.location.href = "Project/../html/home.html";
      });
    });
  });
}