/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */  
 

module.exports.routes = {

  // Email configs
  'GET /emailConfigs/:emailConfigID': {
    controller: 'EmailConfigsController',
    action: 'findOne'
  },

  'POST /emailConfigs': {
    controller: 'EmailConfigsController',
    action: 'create'
  },

  'DELETE /emailConfigs/:emailConfigID': {
    controller: 'EmailConfigsController',
    action: 'destroy'
  },

  'PUT /emailConfigs/:emailConfigID': {
    controller: 'EmailConfigsController',
    action: 'update'
  },

  'POST /emailConfigs/:emailConfigID/emails': {
    controller: 'EmailConfigsController',
    action: 'sendEmails'
  },


  // Templates
  'POST /emailConfigs/:emailConfigID/templates': {
    controller: 'TemplatesController',
    action: 'create'
  },

  'GET /emailConfigs/:emailConfigID/templates': {
    controller: 'TemplatesController',
    action: 'find'
  },

  'GET /emailConfigs/:emailConfigID/templates/:templateID': {
    controller: 'TemplatesController',
    action: 'findOne'
  },

  'PUT /emailConfigs/:emailConfigID/templates/:templateID': {
    controller: 'TemplatesController',
    action: 'update'
  },

  'DELETE /emailConfigs/:emailConfigID/templates/:templateID': {
    controller: 'TemplatesController',
    action: 'destroy'
  },  

  //Developers
  'POST /login': {
    controller: 'DevelopersController',
    action: 'login'
  },

  'POST /apps': {
    controller: 'DevelopersController',
    action: 'create'
  },

  'GET /apps': {
    controller: 'DevelopersController',
    action: 'find'
  },

  'GET /apps/:appID': {
    controller: 'DevelopersController',
    action: 'findOne'
  },

  //ServerCode
  'POST /serverCode': {
    controller: 'ServerCodeController',
    action: 'create'
  },

  //Models
  'POST /models': {
    controller: 'ModelsController',
    action: 'create'
  },

  'GET /models': {
    controller: 'ModelsController',
    action: 'find'
  },

  'GET /models/:modelID/schemas': {
    controller: 'ModelsController',
    action: 'populate'
  },

  'GET /models/:modelID': {
    controller: 'ModelsController',
    action: 'findOne'
  },

  'POST /models/:modelID/schemas': {
    controller: 'ModelsController',
    action: 'add'
  },

  'GET /models/:modelID/schemas/:versionNumber': {
    controller: 'ModelsController',
    action: 'findSchema'
  }
};
