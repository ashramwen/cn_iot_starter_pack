# cn_iot_starter_pack
1) Extension SDK

  It is a wrapped KiiCloudSDK.js which support building operational portal who use KiiCloud as a backend. 
  
  It provides solution for manage models, firmwares, device simulation, emailing and other functions which are not yet supported in Kii developer portal.

  Not only team of Kii, but external developers who are using kii cloud and interested in building their own portal can use it as a shortcut.

2) extension server

  It is a backend server which provides Extesion SDK with services which KiiCloud doesn't include for the moment. Its apis will also be exposed to external users.
  
3) Starter pack portal

 It is an operational portal that utilizes KiiCloud API, extension server's API and extension SDK to provide operational services for start-up users/companies to manage Kii data(users and devices registered).
