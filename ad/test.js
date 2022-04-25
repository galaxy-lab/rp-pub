// import { AuthenticationProvider } from '@microsoft/microsoft-graph-client'
// import axios from 'axios'
// import qs  from "qs"

const { AuthenticationProvider } = require('@microsoft/microsoft-graph-client')
const { Client, GraphRequest } = require("@microsoft/microsoft-graph-client");

// class TestAuthenticationProvider extends AuthenticationProvider {

//     client_id = '3d93ab3c-9293-4724-80f0-d5bc0b321d98'
//     client_secret = 'amB7Q~r_gzQY~KrBp0wnYdGUamOCQ66byk7Ow'
//     scope = ['User.Read.all']
//     tenant_id = '33cc7bb2-6cdc-4fb2-85f4-870fa16c6cb5'
//     auth_url = ''
//     cachedToken = null

//     constructor(client_id, client_secret, scope, tenant_id) {
//         this.client_id = client_id
//         this.client_secret = client_secret
//         this.scope = scope
//         this.tenant_id = tenant_id
//         this.auth_url = `https://login.microsoftonline.com/${tenant_id}/oauth2/v2.0/token`
//         this.cachedToken = null
//     }

//     async getAccessToken() {
//         if (this.cachedToken) {
//             return Promise.resolve(this.cachedToken)
//         }

//         this.logger.debug(`Getting access token from AD for client [${this.client_id}], tenant [${this.tenant_id}] and scope [${this.scope}]`)
//         return new ((resolve, reject) => {

//             let data = qs.stringify({
//                 grant_type: this.grant_type,
//                 client_id: this.client_id,
//                 client_secret: this.client_secret,
//                 scope: this.scope,
//             })

//             axios.post(this.auth_url, data)
//                 .then((response) => {
//                     this.logger.debug(`Token successfully obtained, caching it!`)
//                     this.cachedToken = response.data.access_token
//                     resolve(response.data.access_token)
//                 })
//                 .catch(function (error) {
//                     reject(error)
//                 });
//         });
//     }
// }



// class aadManager {
//     constructor(Client, nome) {
//         this.client = Client
//         this.name = nome
//         this.logger = createLogger(`azuread-manager:${nome}`)
//     }3d93ab3c-9293-4724-80f0-d5bc0b321d98


// }




const msal = require('@azure/msal-node');
const axios = require('axios');
const { ClientRequest } = require('http');

//  Credentials
const TENANT_ID='33cc7bb2-6cdc-4fb2-85f4-870fa16c6cb5'
const CLIENT_ID='3d93ab3c-9293-4724-80f0-d5bc0b321d98'

// You provide either a ClientSecret or a CertificateConfiguration, or a ClientAssertion. These settings are exclusive
const CLIENT_SECRET='amB7Q~r_gzQY~KrBp0wnYdGUamOCQ66byk7Ow'
// CERTIFICATE_THUMBPRINT=Enter_the_certificate_thumbprint_Here
// CERTIFICATE_PRIVATE_KEY=Enter_the_certificate_private_key_Here
// CLIENT_ASSERTION=Enter_the_Assertion_String_Here

//  Endpoints
// the Azure AD endpoint is the authority endpoint for token issuance
const AAD_ENDPOINT='https://login.microsoftonline.com/' // https://login.microsoftonline.com/
// the graph endpoint is the application ID URI of Microsoft Graph
const GRAPH_ENDPOINT='https://graph.microsoft.com/' // https://graph.microsoft.com/



const msalConfig = {
    auth: {
        clientId: CLIENT_ID,
        authority: AAD_ENDPOINT + TENANT_ID,
        clientSecret: CLIENT_SECRET,
    }
};

const apiConfig = {
    uri: GRAPH_ENDPOINT + 'v1.0/users',
};

const tokenRequest = {
    scopes: [GRAPH_ENDPOINT + '.default'],
};

const cca = new msal.ConfidentialClientApplication(msalConfig);
// try {
//     const authResponse = cca.acquireTokenByClientCredential(tokenRequest);
//     console.log(authResponse); // display access token
// } catch (error) {
//     console.log(error);
// }
console.log(cca)
// console.log(cca.acquireTokenByClientCredential());

// console.log(cca)


// async function callApi(endpoint, accessToken) {

//     const options = {
//         headers: {
//             Authorization: `Bearer ${accessToken}`
//         }
//     };

//     console.log('request made to web API at: ' + new Date().toString());

//     try {
//         const response = await axios.default.get(endpoint, options);
//         return response.data;
//     } catch (error) {
//         console.log(error)
//         return error;
//     }
// };




// curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d 'client_id=3d93ab3c-9293-4724-80f0-d5bc0b321d98&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default&client_secret=amB7Q~r_gzQY~KrBp0wnYdGUamOCQ66byk7Ow&grant_type=client_credentials' 'https://login.microsoftonline.com/33cc7bb2-6cdc-4fb2-85f4-870fa16c6cb5/oauth2/v2.0/token'