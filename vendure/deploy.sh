#!/bin/bash
sudo docker build -t eu.gcr.io/pinelab-shops/vendure .
# gcloud auth configure-docker -q
sudo docker push eu.gcr.io/pinelab-shops/vendure
