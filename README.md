<p align="center">
![Presentation](https://raw.githubusercontent.com/HalasProject/authnosql/master/public/app/logo.png)
</p>

# Introduction
![Presentation](https://raw.githubusercontent.com/HalasProject/authnosql/master/public/app/Authnosql.gif)
a small application to satisfy the need for authentication and authorization of users with **expressjs** and **mongodb** (mongoose), the token is generated using (**JWT**) JSON Web Token with an HS512 encryption and the password encrypt with **bcrype** the view engine is **ejs** you will find  a .env file to customize your application with the following options:

```
APP_NAME="AuthNoSQL"
APP_HOST="localhost"
PORT=3000

MONGO_DB=
MONGO_PORT=27017
MONGO_HOST=localhost

JWT_SECRET="SECREYKEY"
JWT_ALGORITHEM="HS512"

TOKEN_EXPIRATION=24
#24 Hours

TOKEN_REMEMBER=168
#IF CASE REMEMBER ME IS CHECKED
#168 Hours = 1 Week
```

```
git clone https://github.com/HalasProject/AuthNoSQL.git
```

```
npm install
```