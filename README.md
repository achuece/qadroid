MongoDB Setup instruction
=========================


1. Make a dir "data" from wherever you want to run mongod (In my case, I added it to the parent dir of this project which I considered as workspace)
2. Add file named "mongod" (No extension) with this content
mongod --bind_ip=$IP -dbpath=data --nojournal --rest "$@"



Meanwhile, after you're up and running with mongo, be sure to shut down your mongod server each time you're done working. You can do this with ctrl + c 

If you leave it running then Cloud 9 could timeout and cause mongo to crash. If this happens, try the following steps to repair it. 

From the command line, run:

cd ~
./mongod --repair
If you're still having trouble getting it to run then find the /data directory (it should be inside of ~ or ~/workspace) and cd into it. Once inside, run rm mongod.lock then cd back into ~ and run ./mongod again (see below).

cd ~/data
rm mongod.lock
cd
./mongod





1. Heroku steps are visible in the website.
- You should have the
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
 }