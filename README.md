# Live Link of Project (https://l2-assignment3-peach.vercel.app)

## Two Users 
User Type {
username : user,
password : User_12345 }

```
{
    "username": "user",
    "password": "User_12345"
}

```

Admin Type{ 
username: admin,
password: Admin_123'}

```
{
    "username": "admin",
    "password": "Admin_123'"
}

```

# Run Project Locally
Clone get repository and run npm install.
```
npm i
```

 So all the dependencies will be install.
Then To build with 
```
npm run build
```
TO run the server give this command
```
npm run start:dev
```

# Local Routes
After starting the server. We can run our project locally on http://localhost:5000/ and we can access the routes
## POST a user in http://localhost:5000/api/auth/register
## Login A User with using POST in http://localhost:5000/api/auth/login
## Change User Password Using POST in http://localhost:5000/api/auth/change-password
## POST a course in http://localhost:5000/api/courses
## Get All course http://localhost:5000/api/courses
## Post a category http://localhost:5000/api/categories
## Get all categories http://localhost:5000/api/categories
## Post a review http://localhost:5000/api/reviews
## Update a course using PUT in  http://localhost:5000/api/courses/:courseId
## Get reviews of a course http://localhost:5000/api/courses/:courseId/reviews
## Get the best course http://localhost:5000/api/course/best

# Live Link Routes 
## POST a user in https://l2-assignment3-peach.vercel.app/api/auth/register
## Login A User with using POST in https://l2-assignment3-peach.vercel.app/api/auth/login
## Change User Password Using POST in https://l2-assignment3-peach.vercel.app/api/auth/change-password
## POST a course in https://l2-assignment3-peach.vercel.app/api/courses
## Get All course https://l2-assignment3-peach.vercel.app/api/courses
## Post a category https://l2-assignment3-peach.vercel.app/api/categories
## Get all categories https://l2-assignment3-peach.vercel.app/api/categories
## Post a review https://l2-assignment3-peach.vercel.app/api/reviews
## Update a course using PUT in  https://l2-assignment3-peach.vercel.app/api/courses/:courseId
## Get reviews of a course https://l2-assignment3-peach.vercel.app/api/courses/:courseId/reviews
## Get the best course https://l2-assignment3-peach.vercel.app/api/course/best


## Global Error Handling For All the Routes is done
## Validation is done with Zod
## AccessToken implementation and error handling done
 
