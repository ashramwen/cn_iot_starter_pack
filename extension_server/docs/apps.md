##Server Code API

###Headers requirement for all
 - **`authorization`**: `Bearer ` + developer token

###Reponse for all
 - **`401`**: unauthorized

###1. Create application
```
POST /apps
```
####Body
```
{
    "name": "app name",
    "server": "jp",
    "platforms": ["ios"]
}
```

####Backend procedure
 1. create an app
 2. get its admin token
 3. initialise firmwares
####Reponse
 - 201 CREATED
