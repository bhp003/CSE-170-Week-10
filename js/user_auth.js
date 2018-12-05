/*function signUp() {
  // fix later
  var signup = document.getElementById("signup"); 
  signup.addEventListener("click", () => {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    
    firebase.auth().signInWithEmailAndPassword(email, pass);
    console.log(firebase.auth().currentUser.email + "\n" + firebase.auth().currentUser.displayName);
  });
}*/

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

signIn();