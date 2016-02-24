##Below is installtion instruction:

* ### 1) Preparation

    you need to install [npm, gulp, bower, express] to run the project.

    npm download link can be found here: https://www.npmjs.com/
    after npm, run below command to install [gulp, bower, expree]
    $ sudo npm install -g gulp
    $ sudo npm install -g bower
    % sudo npm install -g expree

* ### 2) build
    assure the project is on /home path, do the following:
    
    $ cd /home/cn_lot_starter_pack/starter-pack-portal/client

    $ npm install
    
    $ bower install

    then, you need to edit bower_components/bootstrap/bower.json and bower_component/font-awesome/bower.json

    in the bower_components/bootstrap directory, find [bootstrap.js, bootstrap.css] in its sub-directories. and add its path to "main" in bower.json like below.
    
    "main": [
        "bootstrap-3.3.6/dist/js/bootstrap.js",
        "bootstrap-3.3.6/dist/css/bootstrap.css"
      ],
    
    and do the same to find [font-awesome.css] under bower_component/font-awesome and add to "main"
    
    $ gulp
    
    $ cd /home/cn_lot_starter_pack/starter-pack-portal/server
    $ npm install

* ### 3) run
    $ cd /home/cn_lot_starter_pack/starter-pack-portal/server/bin

    $ node www
    
    Then you will be able to access it through http://localhost:8080/index.html
