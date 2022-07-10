
# DevCamper
> DevCamper is a bootcamp directory website. 
This project is a Back-End API

 - Framework: [Express.js](https://expressjs.com/)
 - Database: [MongoDB](https://www.mongodb.com/)
 - Test API Platform: [Postman](https://www.postman.com/)
 - Authentication: [JSON Web Tokens](https://jwt.io/)
 - Image Upload: [express-fileupload](https://www.npmjs.com/package/express-fileupload)

## Documentation

[Postman Documentation](https://documenter.getpostman.com/view/20275892/Uyr5oKTw#53e10778-e64b-4cfe-8083-f80cb947cdcd)

## Environment Variables

To run this project, you will need to add the following environment variables to your config/config.env file

`NODE_ENV`
`PORT`

`MONGO_URI`

`FILE_UPLOAD_PATH`
`MAX_FILE_UPLOAD`

`GEOCODER_PROVIDER`
`GEOCODER_API_KEY`

`JWT_SECRET`
`JWT_EXPIRE`
`JWT_COOKIE_EXPIRE`

`SMTP_HOST`
`SMTP_PORT`
`SMTP_EMAIL`
`SMTP_PASSWORD`
`FROM_EMAIL`
`FROM_NAME`
## Usage

### Run App
```bash
# Run in development mode
npm run dev
```
```bash
# Run in production mode
npm start
```
### Database Seeder
```bash
# Import sample data
node seeder -i
```
```bash
# Delete sample data
node seeder -d
```


## API Reference

Basic CRUD functionality for products

#### Get all bootcamps

```
  GET api/v1/bootcamps${query}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `query`   | `string` | Retrieve only bootcamps that match key values from [Bootcamps Schema](https://github.com/daniilrobnikov/DevCamper/blob/main/models/Bootcamp.js) f.e. `?name=Devworks Bootcamp` |


#### Get bootcamp

```
  GET /api/bootcamps/[id]
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of bootcamp to fetch |

#### Get bootcamps within a radius
```
  GET /api/v1/bootcamps/radius/[zipcode]/[distance]
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `zipcode` | `string` | **Required**. Zipcode as the center of a searching area |
| `distance`| `string` | **Required**. Distance from zipcode position that defines bootcamps searching area |

#### Upload photo for bootcamp
```
  PUT /api/v1/bootcamps/[id]/photo
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of bootcamp to fetch |
| `file`   | `multipart/form-data` | **Required**. Bootcamp photo |


## Disclaimer

This project is a part of a [Node.js API](https://www.udemy.com/course/nodejs-api-masterclass/) course
