#!/bin/bash
export ENV_VARS=$(paste -sd, .env)
gcloud run deploy shops-api \
            --quiet \
            --image "eu.gcr.io/pinelab-shops/directus-cms:latest" \
            --region "europe-west1" \
            --platform "managed" \
            --allow-unauthenticated \
            --memory=2G \
            --project=pinelab-shops \
            --set-env-vars=$ENV_VARS
