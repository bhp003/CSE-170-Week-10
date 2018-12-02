files = ["COGS 120/question/question1.html", "./CSE 170/question/question1.html"]
title = '<title>Question 1</title>'
id = 'makePage(1'

for file in files:
    with open(file, 'r') as f:
        fdata = f.read()
        filedir = file.split('1.html')[0]
        for i in range(21, 51):
            print(i)
            data = fdata
            split1 = data.split(title)
            print(split1[0])
            data = split1[0] + '<title>Question ' + str(i) + '</title>' + split1[1]
            split2 = data.split(id)
            data = split2[0] + 'makePage(' + str(i) + split2[1]
            newf = open(filedir + str(i) + '.html', 'w+')
            newf.write(data)
