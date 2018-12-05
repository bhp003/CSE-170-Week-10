var ref = firebase.firestore().collection("Users");

function addHistory(name, path) {
  var user = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var histRef = ref.doc(user.email).collection("History");
      histRef.doc(name).set({name: name}).then(() => {
        window.location.href = name + "/" + path;
      });
    }
  });
}

function autocomplete(inp, arr) {
  var currentFocus;
  var currItem;

  inp.addEventListener("input", function(e) {
    var a, b, val = this.value;
    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");

    this.parentNode.appendChild(a);
    for (var i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
          var path = (inp.value + ".html").replace(/\s/g, "");
          addHistory(inp.value, path);
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    }
    else if (e.keyCode == 38) { //up
      currentFocus--;
      addActive(x);
    }
    else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1)
        if (x) x[currentFocus].click();
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (var i = 0; i < x.length; i++)
      x[i].classList.remove("autocomplete-active");
  }

  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp)
        x[i].parentNode.removeChild(x[i]);
    }
  }
  document.getElementById("input").addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

function getAllClass() {
  var courses = new Array();
  var ref = firebase.firestore().collection("Courses");
  ref.get().then((list) => {
    list.forEach((doc) => {
      courses.push(doc.id);
    });
  });
  autocomplete(document.getElementById("input"), courses);
}

function getHistory() {
  var section = document.getElementById("hist");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var histRef = ref.doc(user.email).collection("History");
      histRef.get().then((list) => {
        var history = list.docs;
        for (var i = 0; i < 4; i++) {
          if (history[i] != null) {
            var item = history[i].get("name");
            var btn = document.createElement("BUTTON");
            btn.setAttribute("value", item);
            btn.appendChild(document.createTextNode(item));
      
            btn.addEventListener("click", (e) => {
              var path = (e.target.value + ".html").replace(/\s/g, "");
              window.location.href = e.target.value + "/" + path;
            });
            
            section.appendChild(btn);
          }
        }        
      });
    }
  }); 
}

getAllClass();
getHistory();
