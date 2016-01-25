##Developer module APIs
> This set of API work as a middleware to redirect requests to devportal server and kii cloud server. There will not be any locally stored data.

###1. Developer Login
> login as a developer and get a develop access token, which can be used for apps operations

```
POST /login
```
####Headers
 - **`content-type`**: application/json
 
####Body
 - **`username`**: developer username, normally an email address
 - **`password`**: developer password

####Reponse
```
200 OK
{
  "access_token": "7789e4fa20e308261b11305b117df49736b2dac27f055bb19c2ed1288d3e17bb",
  "token_type": "bearer",
  "expires_in": 7200,
  "refresh_token": "750ef172a3ebc3dbfb1f16cf5c19b0817577ec79ed991a8b1d37281bb86f3992",
  "created_at": 1453098611
}
```
 - **`401`**: unauthorized

###2. Create an app
###3. Get all apps info
```
GET /apps
```
####Headers
 - **`Authorization`**: Bearer + token

####Reponse
```
200 OK
{
  "apps": [
    {
      "id": 44,
      "app_id": "5b57cf57",
      "name": "jp",
      "country": "jp",
      "platforms": [
        "ios"
      ],
      "created": "2014-04-21T10:48:57.898Z",
      "inactive": false,
      "owner": true,
      "site_name": "jp"
    },
    {
      "id": 65,
      "app_id": "9076bea1",
      "name": "My More Awesome App",
      "country": "us",
      "platforms": [
        "ios"
      ],
      "created": "2014-07-08T01:25:04.511Z",
      "inactive": false,
      "owner": true,
      "site_name": "us"
    },
    {
      "id": 66,
      "app_id": "6306ade0",
      "name": "My Awsome App again",
      "country": "us",
      "platforms": [
        "android",
        "ios",
        "html5",
        "unity"
      ],
      "created": "2014-07-08T02:58:07.454Z",
      "inactive": false,
      "owner": true,
      "site_name": "us"
    }
  ]
}
```
 - **`401`**: unauthorized

###4. Get single app info
> get single app detailed info, along with access token
```
GET apps/:appID
```
####Headers
 - **`Authorization`**: Bearer + token

####Reponse
> looks like a lot of data, I can drop some in response if needed

```
200 OK
{
  "app": {
    "id": 44,
    "name": "jp",
    "description": "",
    "urls": {},
    "preferences": {},
    "icon_uid": null,
    "app_id": "5b57cf57",
    "app_key": "a1d88b4caa0d55c5c89f7387457895e6",
    "platforms": [
      "ios"
    ],
    "state": null,
    "user_id": 4,
    "deleted_at": null,
    "created_at": "2014-04-21T10:48:57.898Z",
    "updated_at": "2014-04-21T10:48:57.898Z",
    "client_id": "e67183fc16ee1bedf059f630aadb0df9",
    "client_secret": "b6d72c1bdbfe82b8f1947b59013f4a42cd312fdd4a354a24bd3bb27586715a73",
    "access_token": "gwEkOM1W_hEsFYHq5i2ZfY4t5IlV0AQ0F0bndAhXQL8"
    "ads_enabled": null,
    "ads_settings": null,
    "country": "jp",
    "configuration": {},
    "gcm_key": null,
    "apns_configuration": {},
    "email_from_address": null,
    "sent_message_count": 0,
    "draft_message_count": 0,
    "zuora_subscription_id": "",
    "kii_cloud_plan_id": "",
    "kii_fa_packs": "",
    "plan_id": null,
    "usage": null,
    "addon_ids": null,
    "downgrades": {},
    "jpush_keys": {},
    "inactive": false,
    "inactivated_at": null,
    "activities": null,
    "supported_bucket_types": [
      "READ_WRITE"
    ],
    "removed": false,
    "removed_at": null,
    "site_name": "jp",
    "app_name": "Jp",
    "app_sites": {
      "ios": "kiiSiteJP",
      "html5": "KiiSite.JP",
      "android": "Site.JP",
      "unity": "Kii.Site.JP"
    },
    "addon_product_ids": [],
    "stats": [
      {
        "id": 258,
        "title": "Kii_um_created",
        "name": "",
        "app_id": 44,
        "position": null,
        "remote_id": "938466",
        "application_id": null,
        "remote_metric_name": "Kii_um_created",
        "data_provider": null,
        "data": "{\"metric\":{\"id\":938466,\"name\":\"Kii_um_created\",\"system_name\":\"Kii_um_created\",\"unit\":\"users\"},\"period\":{\"name\":null,\"since\":\"2014-04-21T00:00:00Z\",\"until\":\"2014-07-09T23:59:59Z\",\"granularity\":\"day\"},\"total\":0,\"values\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\"application\":{\"id\":1409610584602,\"name\":\"jp\",\"state\":\"live\",\"description\":\"empty\",\"plan\":{\"id\":2357355552181,\"name\":\"Limited plan\"},\"account\":{\"id\":2445580581632,\"name\":\"N/A\"}},\"change\":0.0}",
        "created_at": "2014-04-23T02:52:18.492Z",
        "updated_at": "2014-07-08T04:24:19.544Z"
      },
      {
        "id": 260,
        "title": "Files created",
        "name": "",
        "app_id": 44,
        "position": null,
        "remote_id": "822606",
        "application_id": null,
        "remote_metric_name": "Kii_dm_file_increased_count",
        "data_provider": null,
        "data": "{\"metric\":{\"id\":822606,\"name\":\"Files created\",\"system_name\":\"Kii_dm_file_increased_count\",\"unit\":\"files\"},\"period\":{\"name\":null,\"since\":\"2014-04-21T00:00:00Z\",\"until\":\"2014-07-09T23:59:59Z\",\"granularity\":\"day\"},\"total\":0,\"values\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\"application\":{\"id\":1409610584602,\"name\":\"jp\",\"state\":\"live\",\"description\":\"empty\",\"plan\":{\"id\":2357355552181,\"name\":\"Limited plan\"},\"account\":{\"id\":2445580581632,\"name\":\"N/A\"}},\"change\":0.0}",
        "created_at": "2014-04-23T02:52:19.115Z",
        "updated_at": "2014-07-08T04:24:19.772Z"
      },
      {
        "id": 259,
        "title": "Kii_dm_flex_created",
        "name": "",
        "app_id": 44,
        "position": null,
        "remote_id": "977086",
        "application_id": null,
        "remote_metric_name": "Kii_dm_flex_created",
        "data_provider": null,
        "data": "{\"metric\":{\"id\":977086,\"name\":\"Kii_dm_flex_created\",\"system_name\":\"Kii_dm_flex_created\",\"unit\":\"objects\"},\"period\":{\"name\":null,\"since\":\"2014-04-01T00:00:00Z\",\"until\":\"2015-09-30T23:59:59Z\",\"granularity\":\"month\"},\"total\":0,\"values\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\"application\":{\"id\":1409610584602,\"name\":\"jp\",\"state\":\"live\",\"description\":\"empty\",\"plan\":{\"id\":2357355552181,\"name\":\"Limited plan\"},\"account\":{\"id\":2445580581632,\"name\":\"N/A\"}}}",
        "created_at": "2014-04-23T02:52:18.825Z",
        "updated_at": "2015-09-10T01:58:22.667Z"
      }
    ],
    "conversion_rules": [],
    "created": "2014-04-21T10:48:57.898Z",
    "owner": true,
    "kiicloud_endpoint": "https://qa21.internal.kii.com/api",
    "acl": {
      "deny": [],
      "allow": []
    },
    "plan": {
      "id": 5,
      "type": "free",
      "limits": "{\"Kii_cloud_datasize\":{\"name\":\"Kii Cloud Datasize\",\"units\":1,\"overage\":0.2,\"unit_multiplier\":\"1\"},\"Kii_cloud_bandwidth_usage\":{\"name\":\"Kii Cloud Bandwidth Usage\",\"units\":999999999999,\"overage\":0.0,\"unit_multiplier\":\"1\"},\"Kii_cloud_push_sent\":{\"name\":\"Kii Cloud Push Notifications\",\"units\":1000,\"overage\":0.07,\"unit_multiplier\":\"1000\"},\"Kii_cloud_api_call\":{\"name\":\"Kii Cloud Api Call\",\"units\":1000,\"overage\":0.07,\"unit_multiplier\":\"1000\"},\"Kii_cloud_email_sent\":{\"name\":\"Kii Cloud Email Sent\",\"units\":999999999999,\"overage\":0.0,\"unit_multiplier\":\"1\"},\"Kii_cloud_sms_sent\":{\"name\":\"Kii Cloud SMS Sent\",\"units\":999999999999,\"overage\":0.0,\"unit_multiplier\":\"1\"}}",
      "monthly": 0,
      "pending": false
    }
  }
}
```
 - **`401`**: unauthorized

