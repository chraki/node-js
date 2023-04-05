# KC-LEARNING SERVICE
This service will handle the fetching countries data like (country images, country name), select category data like (category name, country_id), and respective documents like (document name, document title, category_id), and creating filepath for documents like (fileurl) for partners, fetching data for kc-learning viewUpdates like (emailurl, subject,).

## Installation

```bash
prerequests 
1)mssql
2)NODE(LTS)
3)NPM 
```
## Prerequests to start service
1)Add .env file at course-finder-nodejs/ root(check .env.example file as reference)

2)Run npm install at common-service/ && lib-db-schemas/ 

## Development

```bash
cd kc-learning-service/
npm install
npm start
```
## Note(For Development Purpose Only)
These service endpoints will not be exposed directly to the client you need todo map for your newly created endpoint in gateway check-in gateway readme to how to do it

## Testing

For running the unit test cases you need to use the following command

```
npm run test
```

For running individual test files use:
```
jest test_file_name
```
**Note:** It is expected that jest is installed on your system globally for running the above command