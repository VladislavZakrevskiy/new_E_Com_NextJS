# API

# Roles: Owner => Admin => Client

# Tree 


## Only for admin and higher 
### /admin
##### /admin/feedback
###### DELETE  ( *delete feedback* )

##### /admin/order
###### Now Nothing

##### /admin/product
###### POST ( *create product* )
###### DELETE ( *delete product* )
###### PATCH ( *update product* )

##### /admin/tag
###### POST ( *create tag* )
###### DELETE ( *delete tag* )

##### /admin/user
###### Now Nothing

<br></br>
### /auth
##### /auth/login
###### POST ( *login to account* )

##### /auth/registration
###### POST ( *create account* )

##### /auth/refresh
###### GET ( *get refresh and access tokens* )

##### /auth/logout
###### POST ( *leave from account* )

<br></br>
### /feedback
###### GET ( *get feedbacks* )
###### POST ( *create feedback* )
###### DELETE ( *delete feedback* )

##### /feedback/:id
###### GET ( *get one feedback* )
###### POST ( *like/unlike feedback* )
###### PATCH ( *update feedback* )

<br></br>
### /order
###### Now Nothing

<br></br>
## Only for owner
### /owner
##### /owner/admin
###### GET ( *get all admins* )
###### POST ( *raise from client to admin* )
###### DELETE ( *omit from admin to client* )

<br></br>
### /products
###### GET ( *get all products by params* )

#### /products/:id
###### GET ( *get one product with all deps* )

<br></br>
### /tag
###### GET ( *get all tags* )

<br></br>
### /users
###### GET ( *get user by id* )
###### DELETE ( *delete user from db* )
###### PATCH ( *update user data* )
