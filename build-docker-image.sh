#!/bin/bash

eval "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin  624998038573.dkr.ecr.ap-south-1.amazonaws.com"

eval "docker build -t my-node-project ."

eval "docker tag my-node-project:latest 624998038573.dkr.ecr.ap-south-1.amazonaws.com/my-node-project:latest"

eval "docker push 624998038573.dkr.ecr.ap-south-1.amazonaws.com/my-node-project:latest"

eval "docker logout"

exit 1