Kii.initializeWithSite("5f59f57d", "78e36a49a4c8b734299253417bc91fc9", KiiSite.CN3);

Kii.authenticateAsAppAdmin("d97aa9b1e29dc6cdefe2c62cebc43f28", "84502cac7ad0a5868c84a507864877ff5d0d2502be45b7d13aa7464a66d215f0", {
    success: function(adminContext) {
        window.admin = adminContext
    },
    failure: function(error, statusCode) {
        console.log(error);
    }
});

var appBucket = admin.bucketWithName("my_user");

var obj = appBucket.createObject();
obj.set("score", 987);
obj.set("mode", "easy");
obj.set("premiumUser", false);

obj.save({
    success: function(theObject) {
        console.log("Object saved!");
        console.log(theObject);
    },
    failure: function(theObject, errorString) {
        console.log("Error saving object: " + errorString);
    }
});