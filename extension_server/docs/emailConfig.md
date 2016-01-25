##EmailConfig Related API
> This set of APIs are only meant to be used by app admin with a unique kii appID. emails can be used to auto send monthly device statement report, advertisement, alerts, etc. 
> 
> TODO: place holders design for IOT scenario

###1. Create Email Config
```
POST /emailConfigs
```
####Headers
 - **`X-App-ID`**: Kii App ID (app id will be the id of email config we well)
 - **`X-App-Key`**: Kii App Key
 - **`X-App-Site`**: Kii App Site. e.g. `cn|jp|us|sg`
 - **`Authorization`**: Bearer [app admin token]
 - **`Content-Type`**: application/json

####Body
 - **`emailAddr`**: email address
 - **`username`**: username of the email account, normally same as email address
 - **`password`** password of the email account
 - **`smtpHost`**: smtp server location
 - **`portNum`**: smtp server port number

####Response
 - **`201`**: created
 - **`401`**: Unauthorized, returned when the token in request header can not be validated

###2. Get Email Config
> Please note that the email config ID here is the Kii app ID

```
GET /emailConfigs/:emailConfigID
```
####Headers
 - **`X-App-ID`**: Kii App ID (app id will be the id of email config we well)
 - **`X-App-Key`**: Kii App Key
 - **`X-App-Site`**: Kii App Site
 - **`Authorization`**: Bearer [app admin token]

####URL Parameters
 - **`:emailConfigID`**: `X-App-ID`

####Response
 - **`200`**: OK. return json object containing email config info
 - **`401`**: Unauthorized, returned when the token in request header can not be validated

###3. Update Email Config
> Please not that it is a full update, so please include everything in the body data

```
PUT /emailConfigs/:emailConfigID
```
####Headers
 - **`X-App-ID`**: Kii App ID (app id will be the id of email config we well)
 - **`X-App-Key`**: Kii App Key
 - **`X-App-Site`**: Kii App Site
 - **`Authorization`**: Bearer [app admin token]
 - **`Content-Type`**: application/json

####Body
 - **`emailAddr`**: email address
 - **`username`**: username of the email account, normally same as email address
 - **`password`** password of the email account
 - **`imap`**: imap server location
 - **`smtp`**: smtp server location
 
####Response
 - **`204`**: No Content
 - **`401`**: Unauthorized, returned when the token in request header can not be validated

###4. Delete Email Config
```
DELETE /emailConfigs/:emailConfigID
```
####Headers
 - **`X-App-ID`**: Kii App ID (app id will be the id of email config we well)
 - **`X-App-Key`**: Kii App Key
 - **`X-App-Site`**: Kii App Site
 - **`Authorization`**: Bearer [app admin token]

####Response
 - **`204`**: No Content
 - **`401`**: Unauthorized, returned when the token in request header can not be validated

###5. Create Email template
```
POST /emailConfigs/:emailConfigID/templates
```
####Headers
 - **`X-App-ID`**: Kii App ID (app id will be the id of email config we well)
 - **`X-App-Key`**: Kii App Key
 - **`X-App-Site`**: Kii App Site
 - **`Authorization`**: Bearer [app admin token]
 - **`Content-Type`**: application/json

####Body
 - **`Subject`**: email subject
 - **`Content`**: email content
 
####Reponse
 - **`201`**: Created, return with templateID
 - **`401`**: Unauthorized

###6. Get Email templates
```
GET /emailConfigs/:emailConfigID/templates
```
####Headers
 - **`X-App-ID`**: Kii App ID (app id will be the id of email config we well)
 - **`X-App-Key`**: Kii App Key
 - **`X-App-Site`**: Kii App Site
 - **`Authorization`**: Bearer [app admin token]
 
####Reponse
 - **`200`**: OK, return with templates content array of objects
 - **`401`**: Unauthorized

###7. Get one Email template
```
GET /emailConfigs/:emailConfigID/templates/:templateID
```
####Headers
 - **`X-App-ID`**: Kii App ID (app id will be the id of email config we well)
 - **`X-App-Key`**: Kii App Key
 - **`X-App-Site`**: Kii App Site
 - **`Authorization`**: Bearer [app admin token]
 
####Reponse
 - **`200`**: OK, return with template content json object
 - **`401`**: Unauthorized

###8. Update one email template
> Please note this is a full update

```
PUT /emailConfigs/:emailConfigID/templates/:templateID
```
####Headers
 - **`X-App-ID`**: Kii App ID (app id will be the id of email config we well)
 - **`X-App-Key`**: Kii App Key
 - **`X-App-Site`**: Kii App Site
 - **`Authorization`**: Bearer [app admin token]
 - **`Content-Type`**: application/json

####Body
 - **`Subject`**: email subject
 - **`Content`**: email content
 
####Response
 - **`204`**: No Content
 - **`401`**: Unauthorized

###9. Delete one email template
```
DELETE /emailConfigs/:emailConfigID/templates/:templateID
```
####Headers
 - **`X-App-ID`**: Kii App ID (app id will be the id of email config we well)
 - **`X-App-Key`**: Kii App Key
 - **`X-App-Site`**: Kii App Site
 - **`Authorization`**: Bearer [app admin token]

####Response
 - **`204`**: No Content
 - **`401`**: Unauthorized

###10. Instant Send Email
```
POST /emailConfigs/:emailConfigID/emails
```
####Headers
 - **`X-App-ID`**: Kii App ID (app id will be the id of email config we well)
 - **`X-App-Key`**: Kii App Key
 - **`X-App-Site`**: Kii App Site
 - **`Authorization`**: Bearer [app admin token]
 - **`Content-Type`**: application/json

####Body
 - **`receivers`**: 
  - **`type`**: Enum: `[all, who]`
  - **`who`**:(optional,if `type` == `who`): a Kii User ID
 - **`body`**:
  - **`type`**: Enum: `[template, what]`
  - **`templateID`**(optional, if `type` == `template`): template ID
  - **`subject`**(optional, if `type` == `what`): email subject
  - **`contentType`**(optional, if `type` == `what`): email content type 
  - **`content`**(optional, if `type` == `what`): email content
 
####Reponse
 - **`200`**: OK:
  - **`success`**: int, number of successfully emails sent
  - **`failure`**: Array of userID 
 - **`401`**: Unauthorized
  
###11. Create send email schedule(one time and periodic) 
```
POST /emailConfigs/:emailConfigID/schedules
```


