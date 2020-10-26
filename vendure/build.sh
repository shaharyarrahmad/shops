#!/bin/bash
docker build -t eu.gcr.io/pinelab-shops/vendure .
# gcloud auth configure-docker -q
docker push eu.gcr.io/pinelab-shops/vendure
