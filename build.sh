#!/bin/bash
svn up
if [ "$1" = "all" ]; then
	echo stopping server.
        ant stop
        sleep 5
fi

ant clean

echo compiling program.
ant

echo deploying project.
ant deploy

if [ "$1" = "all" ]; then
	ant kill
	sleep 3
    echo starting server.
    ant start
fi