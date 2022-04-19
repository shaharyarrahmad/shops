#!/bin/bash
export ENV_VARS=$(paste -sd, .env)
gcloud run deploy shops-test \
            --quiet \
            --image "eu.gcr.io/pinelab-shops/vendure:latest" \
            --region "europe-west1" \
            --platform "managed" \
            --allow-unauthenticated \
            --memory=1G \
            --project=pinelab-shops \
            --set-env-vars=$ENV_VARS \
            --add-cloudsql-instances="pinelab-shops:europe-west1:pinelab2"
gcloud run deploy worker-test \
            --quiet \
            --image "eu.gcr.io/pinelab-shops/vendure:latest" \
            --region "europe-west1" \
            --platform "managed" \
            --allow-unauthenticated \
            --memory=1G \
            --project=pinelab-shops \
            --set-env-vars=$ENV_VARS \
            --add-cloudsql-instances="pinelab-shops:europe-west1:pinelab2"
