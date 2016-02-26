##Server Code API
###Headers requirement for all
 - **`x-app-id`**: app id
 - **`x-app-key`**: app key
 - **`x-app-site`**: app site [cn, jp, us, sg, beehive, qa]
 - **`authorization`**: Bearer + admin token

###Reponse for all
 - **`401`**: unauthorized

###1. Initialize firmware
> in case an app is created from developer portal instead of starter pack portal, the developer still has a way to have firmware feature

```
POST /initFirmware
```
####Body
```
{}
```

####Backend procedure
For each buckets that needs ACL pre process:

 1. create an empty object in the bucket
 2. delete the object
 3. move acl actions of anonymous and authenticated users

####Reponse
> Ideally use ascynchronous http

 - 200 OK
