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

function uploadPDF() {
    
    var pdfUpload = document..getElementById("#pdffile");

    pdfUpload.on('change', function (event) {
        console.log('ref target', self.pdfInput)
        var filePDF = self.pdfInput.files[0];
        var filename = filePDF.name;
        console.log('my file', filePDF)
        console.log('my filename', filename)
        var storageRef = firebase.storage().ref('/pdf/' + filename);
        var uploadPdfTask = storageRef.put(filePDF);
        uploadPdfTask.on('state_changed', function (snapshot) {}, function (error) {
            console.log(error)
        }, function () {
            uploadPdfTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                pdfURLs = downloadURL;
            })
        })

        console.log('pdfURL', pdfURLs)

    })
}
