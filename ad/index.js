const { Client } = require("@microsoft/microsoft-graph-client")
const { TokenCredentialAuthenticationProvider } = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials")
const { ClientSecretCredential } = require("@azure/identity")
const { clientId, clientSecret, scopes, tenantId } = require("./secrets")
require("isomorphic-fetch")

const JiraApi = require('jira-client')

const credential = new ClientSecretCredential(tenantId, clientId, clientSecret)
const authProvider = new TokenCredentialAuthenticationProvider(credential, { scopes: [scopes] })

const client = Client.initWithMiddleware({
	authProvider: authProvider,
	debugLogging: true,
	credential
});
module.exports = {
	client: client,
};
var jira = new JiraApi({
	protocol: 'https',
	host: 'teamuniti.atlassian.net',
	username: 'netcpalves@gmail.com',
	password: 'g08drB5l3zaJYnspGN5l1DF9',
	apiVersion: '2',
	strictSSL: true
})

// client
// 	.api("/users/batman@paulocalveslive.onmicrosoft.com")
// 	.patch({"accountEnabled": false})
// 	.then((res) => {
// 		console.log(res)
// 	})
// 	.catch((err) => {
// 		console.log(err)
// 	});


// With ES5

// // With ES6
// import JiraApi from 'jira-client'

// Initialize





// FIND THE STATUS OF AN ISSUE
// ES5
// We are using an ES5 Polyfill for Promise support. Please note that if you don't explicitly
// apply a catch exceptions will get swallowed. Read up on ES6 Promises for further details.
// jira.findIssue(issueNumber)
//   .then(function(issue) {
//     console.log('Status: ' + issue.fields.status.name)
//   })
//   .catch(function(err) {
//     console.error(err)
//   });

// ES6
// jira.findIssue(issueNumber)
//   .then(issue => {
//     console.log(`Status: ${issue.fields.status.name}`)
//   })
//   .catch(err => {
//     console.error(err)
//   })

var issueNumber = 'DESK-104'

// const email = jira.findIssue(issueNumber)
//   .then(function(issue) {
//     console.log(issue.fields.summary)
//   })
//   .catch(function(err) {
//     console.error(err)
//   })


async function logIssueName(issueNumber) {
	try {
		const issue = await jira.findIssue(issueNumber)

		// CHANGE CITY TO SP
		const email = issue.fields.customfield_10057
		const funcao = issue.fields.customfield_10066.value
		const offboarding = issue.fields.customfield_10010.requestType.name



		// se o campo summary = Remover acessos
		// block user no aad

		// se o campo summary = a um email para
		// executa mudança de cidade

		// se o campo summary = onboaridng & a funçao = dev
		// libera o acesso ao sistemas de dev





		try {

			if (offboarding == 'Employee exit') {
				const response = await client
					.api("/users/" + email)
					// .get('accountEnabled', 'mail', 'city')
					.update({ "accountEnabled": false })
					console.log(`O usuário ${email} foi bloqueado.`)
			}

		} catch (err) {
			console.error(err)
		}

	}
	catch (err) {
		console.error(err)
	}

}
logIssueName(issueNumber)
// client
// 		.api("/users/" + email)
// 		// .get('accountEnabled', 'mail', 'city')
// 		.update({ "city": 'São Paulo' })
// 		.then((res) => {
// 			console.log("REQ OK", res)
// 		})
// 		.catch((err) => {
// 			console.log('REQ DENIED', err)
// 		})

// changeCity(email)
/*
const user = {
	businessPhones: [
		'+1 425 555 0109'
	],
	officeLocation: '18/2111'
};

 client.api('/users/tony.stark@paulocalveslive.onmicrosoft.com')
	.update(user)
	.then((res) => {console.log(res)})
	.catch ((err) => {console.log(err)})
*/
/*
client.api('/users/tony.stark@paulocalveslive.onmicrosoft.com')
.select('displayName', 'jobTitle')
.get()
.then((res) => {
		console.log(res)
	})
	.catch((err) => {
		console.log(err)
	})*/