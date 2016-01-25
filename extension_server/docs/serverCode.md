##Server Code API
> one server code (js file) consists of serveral pieces of asset code (js functions or objects)

###Headers requirement for all
 - **`x-app-id`**: app id
 - **`x-app-key`**: app key
 - **`x-client-id`**: client id
 - **`x-client-secret`**: client secret
 - **`x-app-site`**: app site [cn, jp, us, sg, beehive, qa]
 - **`authorization`**: Bearer + admin token

###Reponse for all
 - **`401`**: unauthorized

###1. Create server code function
```
POST /serverCodes
```
####Body
 - **`type`**: enum: [`endpoint`, `function`, `hook`]
 - **`name`**: string
 - **`body`**: string

####Backend procedure
 1. javascript syntax check and single function check.
 2. create a record with data:

	```
	cursor: true,
	appID: string,
	type: enum [endpoint, function, hook],
	name: string,
	body: string,
	sold: false,
	uuid: string,
	diabled: false,
	published: {},
	history: {}
	```

####Reponse
 - 201 CREATED

###1.1 Publish server code functions
```
POST /serverCodes/:appID/publish
```
####Backend procedure
 1. query call record `{cursor: true, disabled: false}`
 2. build tmp js file and upload to server. if failed, then throw error; if success:
 3. for each of the queried records, if `sold == false`, 
  - if the record already have been published, then update the coresponding record to add `retiredAt: Date`
  - create another record containing:
 
 	```
 	type: enum [endpoint, function, hook],
 	name: string,
 	body: string,
 	uuid: string
 	```

 
 4. modify the queried record as:
 
 	```
 	cursor: true,
 	appID: string,
	type: enum [endpoint, function, hook],
	name: string,
	body: string,
	sold: true,
	uuid: string,
	published: {
		uuid: string,
		publishedAt: Date
	},
	history: [
		{
			uuid: string,
			publishedAt: Date,
			retiredAt: Date
		},
		...		
	]
 	```

####Reponse
 - **`204`**: No Content

###2. get server code of current version
```
GET /serverCodes/:appID
```
###2.2 get an asset code
```
GET /serverCodes/:appID/assetCodes:/assentCodeID
```
###3. update an asset code, including disabling
```
PUT /serverCodes/:appID/assetCodes/:assentCodeID
``` 
####body
 - **`type`**: enum: [`endpoint`, `function`, `hook`]
 - **`name`**: string
 - **`body`**: string
 - **`disabled`**: bool

####backend procedure
 1. update the asset code
 2. turn `sold` as `false`

###4. remove an asset code 
```
DELETE /serverCodes/:appID/assetCodes/:assentCodeID
```
####backend procedure
actually remove all asset codes with the same name
###5. swich the cursor to a certain version (single asset code)
Obvious, can be done just by update
###6. swich the cursors to a certain version (whole server code)
```
PUT /serverCodes/:appID
```
####body
 - **`publishedAt`**: Date

####Backend procedure
it is actuall bach record update, just need to find the corect history `(publishedAt <= publishedAt && retiredAt > publishedAt)`
###7. check server code log
```
GET /serverCodes/:appID/logs
```
depends on whether we have plan to do websocket ourselves
###8. test endpoint 
call whatever yourself
