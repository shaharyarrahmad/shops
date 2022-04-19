#!/bin/bash
export ENV_VARS=$(paste -sd, .env)
gcloud run deploy shops-api \
            --quiet \
            --image "eu.gcr.io/pinelab-shops/vendure:latest" \
            --region "europe-west1" \
            --platform "managed" \
            --allow-unauthenticated \
            --memory=2G \
            --project=pinelab-shops \
            --set-env-vars=$ENV_VARS \
            --add-cloudsql-instances="pinelab-shops:europe-west1:shops-prod"
gcloud run deploy worker \
            --quiet \
            --image "eu.gcr.io/pinelab-shops/vendure:latest" \
            --region "europe-west1" \
            --platform "managed" \
            --allow-unauthenticated \
            --memory=2G \
            --project=pinelab-shops \
            --set-env-vars=$ENV_VARS \
            --add-cloudsql-instances="pinelab-shops:europe-west1:shops-prod"
