# API

# Roles: Owner => Admin => Client

# Tree 


## Only for admin and higher 
### /admin
##### /feedback
###### DELETE  ( *delete feedback* )

##### /order
###### Now Nothing

##### /product
###### POST ( *create product* )
###### DELETE ( *delete product* )
###### PATCH ( *update product* )

##### /tag
###### POST ( *create tag* )
###### DELETE ( *delete tag* )

##### /user
###### Now Nothing


### /auth
#### /login
##### POST ( *login to account* )

#### /registration
##### POST ( *create account* )

#### /refresh
##### GET ( *get refresh and access tokens* )

#### /logout
##### POST ( *leave from account* )


### /feedback
##### GET ( *get feedbacks* )
##### POST ( *create feedback* )
##### DELETE ( *delete feedback* )

#### /:id
##### GET ( *get one feedback* )
##### POST ( *like/unlike feedback* )
##### PATCH ( *update feedback* )


### /order
##### Now Nothing


## Only for owner
### /owner
#### /admin
##### GET ( *get all admins* )
##### POST ( *raise from client to admin* )
##### DELETE ( *omit from admin to client* )


### /products
##### GET ( *get all products by params* )

#### /:id
##### GET ( *get one product with all deps* )


### /tag
##### GET ( *get all tags* )


### /users
##### GET ( *get user by id* )
##### DELETE ( *delete user from db* )
##### PATCH ( *update user data* )
