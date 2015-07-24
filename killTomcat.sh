#!/bin/sh
tomcathome=${1-'catalina'}
kill -9 `ps -Ao '%p %a' | grep ${tomcathome} | grep -v "grep ${tomcathome}" | awk '{print $1}'`