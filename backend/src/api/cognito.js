const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentity({region: 'us-east-2'});
const BluebirdPromise = require("bluebird");
const jwtRaw = require('jsonwebtoken');
const request = require('request-promise');
const jwkToPem = require('jwk-to-pem');

const jwt = BluebirdPromise.promisifyAll(jwtRaw);

const UserPoolId = 'us-east-2_dNWijDPgP';
const iss = "https://cognito-idp.us-east-2.amazonaws.com/" + UserPoolId;

const GetPEMSAndValidateToken = async (token) => {
  let response = await request({
    url: iss + '/.well-known/jwks.json',
    json: true
  });

  const body = response;
  console.error(body);

  var pems = {};

  var keys = body['keys'];
  for (var i = 0; i < keys.length; i++) {
    //Convert each key to PEM
    var key_id = keys[i].kid;
    var modulus = keys[i].n;
    var exponent = keys[i].e;
    var key_type = keys[i].kty;
    var jwk = {
      kty: key_type,
      n: modulus,
      e: exponent
    };
    var pem = jwkToPem(jwk);
    pems[key_id] = pem;
  }

  console.error(pems);

  let sub = await ValidateToken(pems, token);
  return sub;
};

const ValidateToken = async (pems, token) => {
  // Fail if the token is not jwt
  let decodedJwt = jwt.decode(token, {complete: true});

  if (!decodedJwt) {
    return null;
  }

  //Fail if token is not from your User Pool
  if (decodedJwt.payload.iss != iss) {
    return null;
  }

  //Reject the jwt if it's not an 'Access Token'
  if (decodedJwt.payload.token_use != 'access') {
    return null;
  }

  // Get the kid from the token and retrieve corresponding PEM
  var kid = decodedJwt.header.kid;
  var pem = pems[kid];
  if (!pem) {
    return null;
  }

  // Verify the signature of the JWT token to ensure it's really coming from your User Pool
  const payload = await jwt.verifyAsync(token, pem, {issuer: iss});
  return payload.sub;
};

module.exports = {
  GetPEMSAndValidateToken,
  ValidateToken
};
