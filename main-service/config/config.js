const path = require('path');
const { Config } = require('../../sample-service');
if(!process.env.KC_LEARNING_DB_USER)
   require('dotenv').config({ path: path.resolve('../.env')});


module.exports = new Config().defaults({
   logs:{
      directory:'../../logs/main'
   },
   port:process.env.PORT || 3000,
   service_name:'main-service',
   aws_buckets:{
      kcLearnings_documents:'kc-learning-sample'
   },
   
   aws:{
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'ap-south-1'
   },
   aws_bucket_uri:'https://kc-learning-sample.s3.ap-south-1.amazonaws.com',
   // react_course_finder_uri:'http://localhost:3000',
}).export();