var Q_LEN = 100;
var DESC_LEN = 300;

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
                q = q.substr(0, Q_LEN - 3) + "...";
            }
            if (desc.length > DESC_LEN) {
                desc = desc.substr(0, DESC_LEN - 3) + "...";
            }

            post.setAttribute("id", id);
            post.appendChild(document.createTextNode(question.get("question")));

            // check if resolved for question colot
            var stat = question.get("solved");
            if (stat == null || !stat)
                var color = "#F7997F"; //red
            else
                var color = "#68A48B"; //green
            post.innerHTML = '<h3 style="color:' + color + ';">' + q + '</h3>' +
                '<p><font size="-1">' + desc + '</font></p>';

            section.appendChild(post);

            post.addEventListener("click", (e) => {
                console.log(e.target);
                window.location.href = "Project/../question/question" + id + ".html";
            });
        });
    });
}

//// File Upload Functionality
//
//
//var pdfUpload = document.getElementById("pdffile");
//var pdfURLs = null;
//
//pdfUpload.onchange = event => {
//
//    var filePDF = event.target.files[0];
//    var filename = filePDF.name;
//    console.log('my file', filePDF)
//    console.log('my filename', filename)
//
//    if (document.body.classList.contains("cogs120")) {
//
//        let storageRef = firebase.storage().ref('/cogs120/' + filename);
//        let uploadPdfTask = storageRef.put(filePDF);
//        uploadPdfTask.on('state_changed', function (snapshot) {}, function (error) {
//            console.log(error)
//        }, function () {
//            uploadPdfTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//                pdfURLs = downloadURL;
//
//                var messagesRef = firebase.database().ref('/Courses/COGS 120/fileupload')
//                var newMessageRef = messagesRef.push();
//                newMessageRef.set({
//                    downloadURL: downloadURL
//                })
//            })
//        })
//               var ref = firebase.database().ref('Courses/COGS 120/fileupload')
//        var self = this;
//        ref.once('value', function (data) {
//            var userData = data.val()
//            var keys = Object.keys(userData)
//            console.log('check1 userData', userData)
//            console.log('check1.5 keys', keys)
//             var uploadURL = [];
//            for (var i = 0; i < keys.length; i++) {
//                
//                 uploadURL = userData[keys[i]].downloadURL;
//                console.log('uploadURL', uploadURL);
//                if (uploadURL) { //the user has atleast 1 pdf
//                    var pdfLink = document.createElement("a");
//                    pdfLink.style.display = "block"
//                    pdfLink.style.padding = "10px 20px"
//                    pdfLink.style.background = "white"
//                    pdfLink.style.borderRadius = "5px";
//                    pdfLink.style.margin = "15px 0";
//                    pdfLink.style.width = "70%";
//                    pdfLink.style.textDecoration = "none"
//                    pdfLink.style.fontWeight = "bold"
//                    pdfLink.setAttribute("href", uploadURL);
//                    pdfLink.setAttribute("target", '_blank');
//                    pdfLink.innerHTML = filename;
//                    var div = document.getElementById('fileupload_section');
//                    div.appendChild(pdfLink);
//                    
//                    break;
//
//                }
//                
//    }
//
//            })
//
//        console.log('pdfURL', pdfURLs)
//    } else if (document.body.classList.contains("cse100")) {
//
//        let storageRef = firebase.storage().ref('/cse100/' + filename);
//        let uploadPdfTask = storageRef.put(filePDF);
//        uploadPdfTask.on('state_changed', function (snapshot) {}, function (error) {
//            console.log(error)
//        }, function () {
//            uploadPdfTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//                pdfURLs = downloadURL;
//                var messagesRef = firebase.database().ref('/Courses/CSE 100/fileupload')
//                var newMessageRef = messagesRef.push();
//                newMessageRef.set({
//                    downloadURL: downloadURL
//                })
//            })
//        })
//        
//               var ref = firebase.database().ref('Courses/CSE 100/fileupload')
//        var self = this;
//        ref.once('value', function (data) {
//            var userData = data.val()
//            var keys = Object.keys(userData)
//            console.log('check1 userData', userData)
//            console.log('check1.5 keys', keys)
//             var uploadURL = [];
//            for (var i = 0; i < keys.length; i++) {
//                
//                 uploadURL = userData[keys[i]].downloadURL;
//                console.log('uploadURL', uploadURL);
//                if (uploadURL) { //the user has atleast 1 pdf
//                    var pdfLink = document.createElement("a");
//                    pdfLink.style.display = "block"
//                    pdfLink.style.padding = "10px 20px"
//                    pdfLink.style.background = "white"
//                    pdfLink.style.borderRadius = "5px";
//                    pdfLink.style.margin = "15px 0";
//                    pdfLink.style.width = "70%";
//                    pdfLink.style.textDecoration = "none"
//                    pdfLink.style.fontWeight = "bold"
//                    pdfLink.setAttribute("href", uploadURL);
//                    pdfLink.setAttribute("target", '_blank');
//                    pdfLink.innerHTML = filename;
//                    var div = document.getElementById('fileupload_section');
//                    div.appendChild(pdfLink);
//                    
//                    break;
//
//                }
//                
//    }
//
//            })
//
//        console.log('pdfURL', pdfURLs)
//    } else if (document.body.classList.contains("cse170")) {
//        console.log("WE ARE IN CSE 170")
//        let storageRef = firebase.storage().ref('/cse170/' + filename);
//        let uploadPdfTask = storageRef.put(filePDF);
//        uploadPdfTask.on('state_changed', function (snapshot) {}, function (error) {
//            console.log(error)
//        }, function () {
//            uploadPdfTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//                pdfURLs = downloadURL;
//                var messagesRef = firebase.database().ref('/Courses/CSE 170/fileupload')
//                var newMessageRef = messagesRef.push();
//                console.log('ya yeet', downloadURL)
//                newMessageRef.set({
//                    downloadURL: downloadURL
//                })
//                //                var div = document.getElementById('fileupload_section');
//                //                div.innerHTML += `<a href=${downloadURL}>${filename}</a>`;
//            })
//        })
//
//        console.log('pdfURL', pdfURLs)
//        //retrieval 
//       
//        var ref = firebase.database().ref('Courses/CSE 170/fileupload')
//        var self = this;
//        ref.once('value', function (data) {
//            var userData = data.val()
//            var keys = Object.keys(userData)
//            console.log('check1 userData', userData)
//            console.log('check1.5 keys', keys)
//             var uploadURL = [];
//            for (var i = 0; i < keys.length; i++) {
//                
//                 uploadURL = userData[keys[i]].downloadURL;
//                console.log('uploadURL', uploadURL);
//                if (uploadURL) { //the user has atleast 1 pdf
//                    var pdfLink = document.createElement("a");
//                    pdfLink.style.display = "block"
//                    pdfLink.style.padding = "10px 20px"
//                    pdfLink.style.background = "white"
//                    pdfLink.style.borderRadius = "5px";
//                    pdfLink.style.margin = "15px 0";
//                    pdfLink.style.width = "70%";
//                    pdfLink.style.textDecoration = "none"
//                    pdfLink.style.fontWeight = "bold"
//                    pdfLink.setAttribute("href", uploadURL);
//                    pdfLink.setAttribute("target", '_blank');
//                    pdfLink.innerHTML = filename;
//                    var div = document.getElementById('fileupload_section');
//                    div.appendChild(pdfLink);
//                    
//                    break;
//
//                }
//                
//    }
//
//            })
//
//    }
//}
//
//function getPDFsFile(classname){
//    if(document.body.classList.contains(classname)){
//         var ref = firebase.database().ref('Courses/CSE 170/fileupload')
//        var self = this;
//        ref.once('value', function (data) {
//            var userData = data.val()
//            var keys = Object.keys(userData)
//            console.log('check1 userData', userData)
//            console.log('check1.5 keys', keys)
//             var uploadURL = [];
//            for (var i = 0; i < keys.length; i++) {
//                
//                 uploadURL = userData[keys[i]].downloadURL;
//                console.log('uploadURL', uploadURL);
//                if (uploadURL) { //the user has atleast 1 pdf
//                    
//                    for(var k = 0; k < uploadURL.length; k++){
//                    var pdfLink = document.createElement("a");
//                        
//                        pdfLink.style.display = "block"
//                    pdfLink.style.padding = "10px 20px"
//                    pdfLink.style.background = "white"
//                    pdfLink.style.borderRadius = "5px";
//                    pdfLink.style.margin = "15px 0";
//                    pdfLink.style.width = "70%";
//                    pdfLink.style.textDecoration = "none"
//                    pdfLink.style.fontWeight = "bold"
//                    pdfLink.setAttribute("href", uploadURL);
//                    pdfLink.setAttribute("target", '_blank');
//                    pdfLink.innerHTML =`Lecture ${k+1}`;
//                    var div = document.getElementById('fileupload_section');
//                    div.appendChild(pdfLink);
//                        break;
//                    }
//                    break;
//
//                
//                
//    }
//            }
//
//            })
//    }
//}
//    
//
