#!/bin/bash

aws cloudformation delete-stack 
    --stack-name 'serverlesspizza-website-pipeline' 
    --region eu-west-1
    --profile aws-serverlesspizza-devops
