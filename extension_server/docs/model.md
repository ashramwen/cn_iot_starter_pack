##Thing Model API
> Thing model maps to thing attribute `_iot` in Kii Cloud. One thing model may have serveral schema versions, and we keep all the created versions. Schema name is the same as thing model, so thing does not need extra custom attribute for it. `schema_name` in command sending = `_iot` in thing attribute = `thing_model` in portal
> 
> Developers would need to create a thing model with an initial schema version in the portal first. And then use them in the thing side onboarding.

###Common request header
 - **`x-app-id`**: app id
 - **`x-app-key`**: app key
 - **`x-app-site`**: app site [cn, jp, us, sg, beehive, qa]
 - **`authorization`**: Bearer + admin token

###Common response
- **`401`**: unauthorized

###1. create a thing model
`POST /models`
####Body
```
{
	modelID: "0000-1111-2222-3333-4444-5555-6666",
	initialSchema: {
		properties: [
			{
				key: "power",
				displayName: "电源",
				type: "bool",
				controllable: true
			},
			{
				key: "currentTemperature",
				displayName: "当前温度",
				type: "integer",
				unit: "摄氏度", //only apply when type is integer
				controllable: false			
			},
			{
				key: "targetTemperature",
				displayName: "目标温度",
				type: "integer",
				unit: "摄氏度", //only apply when type is integer
				controllable: true,
				min: 16, // only apply when type is integer and controllable
				max: 35 // only apply when type is integer and controllable
			},
			...
		]
	}
}
```
####Reponse
 - **`201`**: Created
 
###2. update a thing model
`PUT /models/:modelID`
####Body
```
{
	modelName: "air conditional",
	description: "whatever it is"
}
```
####Reponse
 - **`200`** OK

###3. remove a thing model
`DELETE /models/:modelID`
####Reponse
 - **`204`**: No Content
 
###4. get all thing models
`GET /models`
####Reponse
 - **`200`**: OK

###4.1 get one thing model with model ID
`GET /models/:modelID`
####Reponse
 - **`200`** OK

###5. add a schema version to a thing model
> Please note that I do not expose update schema content for purpose. add a new version of schema instead. the version does not need to be manually input, but managed incrementally by the system

`POST /models/:modelID/schemas`
####Body
```
{
	properties: [
			{
				key: "power",
				displayName: "电源",
				type: "bool",
				controllable: true
			},
			{
				key: "currentTemperature",
				displayName: "当前温度",
				type: "integer",
				unit: "摄氏度", //only apply when type is integer
				controllable: false			
			},
			{
				key: "targetTemperature",
				displayName: "目标温度",
				type: "integer",
				unit: "摄氏度", //only apply when type is integer
				controllable: true,
				min: 16, // only apply when type is integer and controllable
				max: 35 // only apply when type is integer and controllable
			},
			...
		]
}
```
###Reponse
 - **`200`** OK
 
###6. get all schemas given thing model
`GET /models/:modelID/schemas`
####Reponse
 - **`200`** OK

###7. get schema given thing model and version
`GET /models/:modelID/schemas/:schemaID`
###Reponse
 - **`200`**: OK

