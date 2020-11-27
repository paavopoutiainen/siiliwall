#!/bin/bash

echo LOADBALANCER_URI="$LOADBALANCER_URI" >> .env
echo SKIP_PREFLIGHT_CHECK="true" >> .env
