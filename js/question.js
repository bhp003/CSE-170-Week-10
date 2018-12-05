var size = 0;
var aid = 0;

function makePage(id, name) {
  var ref = firebase.firestore().collection("Courses/" + name + "/Questions");
  var breadcrumbs = document.getElementById("breadcrumbs");
  var namesplit = name.split(" ");
  var namehtml = namesplit[0] + namesplit[1] + ".html";
  breadcrumbs.innerHTML = '<p><a href="../../../index.html">Home</a> &#8226; ' +
                          '<a href="../' + namehtml + '">' + name + '</a> &#8226; ' +
                          '<a href="" id="current">Question ' + id + '</a></p>';
  getQuestion(id, ref);
  getAnswer(id, ref);
}

function getQuestion(id, ref) {
  ref.doc("Question " + id).get().then((result) => {
    displayQuestion(result);
  });
}

function getAnswer(id, ref) {
  var ansSection = document.getElementById("answers");
  var header = document.createElement("H2");
  header.setAttribute("align", "center");
  header.setAttribute("style", "font-size: 16pt;");
  ansSection.appendChild(header.appendChild(document.createTextNode("Answers:")));

  ref.doc("Question " + id).collection("Answers").get().then((list) => {
    list.forEach((ans) => {
      aid++;
      displayAnswer(ans, ansSection, id, aid);
    });
    size = list.size + 1;
    postAnswer(id, ref);
  });
}

function displayQuestion(data) {
  firebase.auth().onAuthStateChanged((userData) => {
    var title = document.getElementById("title");
    var qbox = document.getElementById("qbox");
    var user = userData.email;

    title.innerHTML = data.get("question");
    var desc = document.getElementById("desc");
    desc.innerHTML = data.get("desc");
    var stat = data.get("solved");
    if (stat == null || !stat)
      title.setAttribute("style", "color:red;");
    else
      title.setAttribute("style", "color:green;");

    // edit permission
    if (user == data.get("owner")) {
      var iconbtn = document.createElement("BUTTON");
      var icon = document.createElement("I");
      icon.setAttribute("class", "material-icons");
      icon.setAttribute("id", "icon");
      icon.appendChild(document.createTextNode("border_color"));

      iconbtn.setAttribute("style", "width: 30px;\nheight: 30px;");
      iconbtn.setAttribute("align", "center");
      iconbtn.appendChild(icon);

      qbox.appendChild(iconbtn);
      iconbtn.addEventListener("click", () => {
        qbox.removeChild(iconbtn);
        qbox.removeChild(title);

        var newQuestion = document.createElement("INPUT");
        newQuestion.setAttribute("type", "text");
        newQuestion.setAttribute("value", title.innerHTML);
        newQuestion.setAttribute("id", "newQuestion");

        var divSubmit = document.createElement("DIV");
        var submitBtn = document.createElement("BUTTON");
        submitBtn.setAttribute("type", "submit");
        submitBtn.appendChild(document.createTextNode("Submit"));
        submitBtn.setAttribute("style", "height: 28px;\n margin-left: 10px;");

        qbox.appendChild(newQuestion);
        qbox.appendChild(submitBtn);

        submitBtn.addEventListener("click", () => {
          ref.doc("Question " + id).set({question: newQuestion.value});
          title.innerHTML = newQuestion.value;

          qbox.removeChild(submitBtn);
          qbox.removeChild(newQuestion);
          qbox.appendChild(title);
          qbox.appendChild(iconbtn);
        });
      });
    }
  });
}

function displayAnswer(data, section, id, aid, ref) {
  firebase.auth().onAuthStateChanged((userData) => {
    var ansbox = document.createElement("DIV");
    ansbox.setAttribute("id", "answer");
    var ans = document.createElement("P");

    // edit permission
    ans.appendChild(document.createTextNode(data.get("value")));
    ansbox.appendChild(ans);
    section.appendChild(ansbox);

    var user = userData.email;
    if (data.get("owner") == user) {
      var iconbtn = document.createElement("BUTTON");
      var icon = document.createElement("I");
      icon.setAttribute("class", "material-icons");
      icon.setAttribute("id", "icon");
      icon.appendChild(document.createTextNode("border_color"));

      iconbtn.setAttribute("style", "width: 30px;\nheight: 30px;");
      iconbtn.setAttribute("align", "center");
      iconbtn.appendChild(icon);

      ansbox.appendChild(iconbtn);

      iconbtn.addEventListener("click", () => {
        ansbox.removeChild(iconbtn);
        ansbox.removeChild(ans);

        var myAns = document.createElement("INPUT");
        myAns.setAttribute("type", "text");
        myAns.setAttribute("value", ans.innerHTML);
        myAns.setAttribute("id", "myans");

        var divSubmit = document.createElement("DIV");
        var submitBtn = document.createElement("BUTTON");
        submitBtn.setAttribute("type", "submit");
        submitBtn.appendChild(document.createTextNode("Submit"));
        submitBtn.setAttribute("style", "height: 28px;\n margin-left: 10px;");

        ansbox.appendChild(myAns);
        ansbox.appendChild(submitBtn);

        submitBtn.addEventListener("click", () => {
          var newAns = ref.doc("Question " + id).collection("Answers").doc("Answer " + aid);
          newAns.set({value: myAns.value, id: aid});
          ans.innerHTML = myAns.value;

          ansbox.removeChild(submitBtn);
          ansbox.removeChild(myAns);
          ansbox.appendChild(ans);
          ansbox.appendChild(iconbtn);
        });
      });
    }
  });
}

function postAnswer(id, ref) {
  var ansSection = document.getElementById("answers");
  var divSubmit = document.createElement("DIV");

  var myAns = document.createElement("INPUT");
  myAns.setAttribute("type", "text");
  myAns.setAttribute("id", "myans");
  myAns.setAttribute("placeholder", "Answer this question!");

  var submitBtn = document.createElement("BUTTON");
  submitBtn.setAttribute("style", "height: 28px;\nmargin-left: 10px;");
  submitBtn.setAttribute("type", "submit");
  submitBtn.appendChild(document.createTextNode("Submit"));

  submitBtn.addEventListener("click", () => {
    var user = firebase.auth().currentUser.email;
    var newAns = ref.doc("Question " + id).collection("Answers").doc("Answer " + size);
    newAns.set({value: myAns.value, id: size, owner: user}).then(() => {
      window.location.reload(true);
    });
  });

  var statusBtn = document.createElement("BUTTON");
  statusBtn.setAttribute("style", "height: 28px;\nfloat: right;\n");
  statusBtn.appendChild(document.createTextNode("Resolved"));

  statusBtn.addEventListener("click", () => {
    ref.doc("Question " + id).set({solved: true}).then(() => {
      var title = document.getElementById("title");
      title.setAttribute("style", "color:#4CAF50;");
    });
  });

  divSubmit.appendChild(myAns);
  divSubmit.appendChild(submitBtn);
  divSubmit.appendChild(statusBtn);
  ansSection.appendChild(divSubmit);
}
