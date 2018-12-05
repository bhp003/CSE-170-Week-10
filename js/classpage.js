var Q_LEN = 70;
var DESC_LEN = 180;
function getQuestion(name) {
  var ref = firebase.firestore().collection("Courses/" + name + "/Questions").orderBy("date", "desc");
  var section = document.getElementById("qa_section");

  ref.get().then((list) => {
    list.forEach((question) => {
      var post = document.createElement("BUTTON");
      var id = question.id.split(" ")[1];
      var q = question.get("question");
      var desc = question.get("desc");

      // display part of question/desc
      if (q.length > Q_LEN) {
        q  = q.substr(0, Q_LEN - 3) + "...";
      }
      if (desc.length > DESC_LEN) {
        desc  = desc.substr(0, DESC_LEN - 3) + "...";
      }

      post.setAttribute("id", id);
      post.appendChild(document.createTextNode(question.get("question")));

      // check if resolved for question colot
      var stat = question.get("solved");
      if (stat == null || !stat)
        var color = "red";
      else
        var color = "green";
      post.innerHTML = '<h3 style="color:' + color + ';">' + q +'</h3>' +
                       '<p><font size="-1">' + desc + '</font></p>';
      section.appendChild(post);

      post.addEventListener("click", (e) => {
        console.log(e.target);
        window.location.href = "Project/../question/question" + id + ".html";
      });
    });
  });
}
