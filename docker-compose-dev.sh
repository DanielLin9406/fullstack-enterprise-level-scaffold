#!/bin/bash
# Build all image and run container
docker-compose -f dev-infra.yml -f dev-services.yml up -d