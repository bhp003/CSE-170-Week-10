function ask() {
  var btn = document.getElementById("submit");
  btn.addEventListener("click", () => {
    var question = document.getElementById("question").value;
    var desc = document.getElementById("desc").value;
    var classname = document.title;
    var classid = classname.split(" ");
    var classhtml = classid[0] + classid[1] + ".html";
    var date = new Date();

    var ref = firebase.firestore().collection("Courses/" + classname + "/Questions");
    ref.get().then((list) => {
      ref.doc("Question " + (list.size + 1)).set({question: question, desc: desc, date: date.getTime()}).then(() => {
        window.location.href = classhtml;
      });
    });
  });
}

ask();
