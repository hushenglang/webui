#!/bin/bash
svn up
if [ "$1" = "all" ]; then
	echo stopping server.
        ant stop
        sleep 5
fi

ant clean -f build-uat.xml

echo compiling program.
ant -f build-uat.xml

echo deploying project.
ant deploy -f build-uat.xml

if [ "$1" = "all" ]; then
	ant kill -f build-uat.xml
	sleep 3
    echo starting server.
    ant start -f build-uat.xml
fi

