const CognitoExpress = require("cognito-express")


//Initializing CognitoExpress constructor
const cognitoExpress = new CognitoExpress({
  region: "us-east-1",
  cognitoUserPoolId: "us-east-1_lRHQIAbeA",
  tokenUse: "access", //Possible Values: access | id
  tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});

//Our middleware that authenticates all APIs under our 'auth' Router
function auth(req, res, next) {
  
  //I'm passing in the access token in header under key accessToken
  // let accessTokenFromClient = req.headers.accesstoken;
  // passing it as id instead of access
  let accessTokenFromClient = req.headers.accesstoken;

  //Fail if token not present in header. 
  if (!accessTokenFromClient) return res.status(401).send("Access Token missing from header");

  cognitoExpress.validate(accessTokenFromClient, function(err, response) {
      
      //If API is not authenticated, Return 401 with error message. 
      if (err) return res.status(401).send(err);
      
      //Else API has been authenticated. Proceed.
      res.locals.user = response;
      next();
  });
};

module.exports = auth