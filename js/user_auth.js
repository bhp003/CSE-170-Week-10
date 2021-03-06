function signUp() {
  var signup = document.getElementById("sign_up");
  signup.addEventListener("click", () => {
    var email = document.getElementById("username");
    var pass = document.getElementById("password");
    
    firebase.auth().createUserWithEmailAndPassword(email.value, pass.value).then(() => {
      var ref = firebase.firestore().collection("Users").doc(email.value);
      ref.set({email: email.value.split("@")[0]}).then(() => {
        window.location.href = "home.html";
      });
    }).catch((err) => {
      var section = document.getElementById("su_section");
      if (err.code != null) {
        var errMessage = document.createElement("P");
        errMessage.setAttribute("align", "center");
        errMessage.appendChild(document.createTextNode("Invalid Email/Password"));
        errMessage.setAttribute("style", "color: red;\nfont-family: 'Ubuntu', sans-serif");
        section.appendChild(errMessage);
      }
    });
  });
}

function signIn() {
  var signinbtn = document.getElementById("signin");
  var email = document.getElementById("username");
  var pass = document.getElementById("password");
  signinbtn.addEventListener("click", () => {
    firebase.auth().signInWithEmailAndPassword(email.value, pass.value).then(() => {
      window.location.href = "html/home.html";
    }).catch((err) => {
      var section = document.getElementById("si_section");
      console.log(err == null);
      if (err.code != null) {
        var errMessage = document.createElement("P");
        errMessage.setAttribute("align", "center");
        errMessage.appendChild(document.createTextNode("Invalid Email/Password"));
        errMessage.setAttribute("style", "color: red;\nfont-family: 'Ubuntu', sans-serif");
        section.appendChild(errMessage);
      }
    });
  });
}