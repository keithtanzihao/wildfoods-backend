#! /bin/bash
git commit -am "$1"
git push
git push heroku HEAD:master