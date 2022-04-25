// With ES5
const JiraApi = require('jira-client');
const axios = require('axios');
// const JiraOpts = require('jira-opts')
// // With ES6
// import JiraApi from 'jira-client';

// Initialize


var jira = new JiraApi({
    protocol: 'https',
    host: 'teamuniti.atlassian.net',
    username: 'netcpalves@gmail.com',
    password: 'RQFOi2und5z3uOlOsyuD4404',
    apiVersion: '2',
    strictSSL: true
});


const usernameJ = 'netcpalves@gmail.com'
const pass = 'RQFOi2und5z3uOlOsyuD4404'

const axApi = axios.create({
    baseURL: `https://teamuniti.atlassian.net/rest`,
    // headers: {
    //     'Content-Type': 'application/json',
    //     'X-ExperimentalApi': 'opt-in'
    // },
    auth: {
        username: usernameJ,
        password: pass
    }
})


// FIND THE STATUS OF AN ISSUE
// ES5
// We are using an ES5 Polyfill for Promise support. Please note that if you don't explicitly
// apply a catch exceptions will get swallowed. Read up on ES6 Promises for further details.

var issueNumber = 'DESK-101'

// jira.findIssue(issueNumber)
//   .then(function(issue) {
//     console.log(issue.fields.summary);
//   })
//   .catch(function(err) {
//     console.error(err);
//   });

// ES6
// jira.findIssue(issueNumber)
//   .then(issue => {
//     console.log(`Status: ${issue.fields.status.name}`);
//   })
//   .catch(err => {
//     console.error(err);
//   }); 


// ES7
async function logIssueName(issueNumber) {
    try {
        const issue = await jira.findIssue(issueNumber);
        console.log(`Status: ${issue.fields.status.name}`);
    } catch (err) {
        console.error(err);
    }
}
// logIssueName(issueNumber)




/*
const bodyData = `{
    "searcherKey": ${null},
    "name": "Funcoes",
    "description": "Select the manager and the corresponding employee."
  }`;

fetch('https://teamuniti.atlassian.net/rest/api/2/field/customfield_10066', {
    method: 'PUT',
    headers: {
        'Authorization': `Basic ${Buffer.from(
            'netcpalves@gmail.com:g08drB5l3zaJYnspGN5l1DF9'
        ).toString('base64')}`g08drB5l3zaJYnspGN5l1DF9,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: bodyData
})
    .then(response => {
        console.log(
            `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));


fetch('https://teamuniti.atlassian.net/rest/api/3/customFieldOption/customfield_10011', {
    method: 'GET',
    headers: {
        'Authorization': `Basic ${Buffer.from(
            'netcpalves@gmail.com:RQFOi2und5z3uOlOsyuD4404'
        ).toString('base64')}`,
        'Accept': 'application/json'
    }
})
    .then(response => {
        // console.log(
        //     `Response: ${response.status} ${response.statusText}`
        // );
        console.log(response)

        const data = response.json();
        // return data.total
    })
    // .then(text => console.log(text))
    .catch(err => console.error(err));
    */


// async function addItemFromComponent(item) {
//     const componentId = "10066"

//     try {

//         const resp = await api.post(`/api/3/customField/${componentId}/option`, {
//             options: [{
//                 cascadingOptions: [],
//                 value: item
//             }]
//         })
//         console.log(resp)
//     } catch (err) {
//         console.error(err);
//     }
// }

// PEGAR LISTA DE PROJETOS NO AZURE DEVOPS E POSTA OPÇÕES EM CAMPO NO JIRA
// PEGA PROJETOS NO AZURE DEVOPS
async function getAzureDevopsProjects(){
    var allProjects = []
    try {
        const response = await axios.get(`https://dev.azure.com/pcdemolab/_apis/projects?api-version=2.0`, {
            auth: {
                username: 'pauloc.alves@live.com',
                password: process.env.AZURE_PERSONAL_ACCESS_TOKEN
            }
        })
        const arrProjects = response.data.value
        for (element in arrProjects) {
            // console.log(arrProjects[element].name)
            allProjects.push(arrProjects[element].name)
        }
        return allProjects
    } catch (err) {
        console.error(err)
    }
}


// POSTAR ITEM EM CUSTOM FIELD
async function addFieldOptions(){
    try {
        var projects = await getAzureDevopsProjects()
        const formProject = projects
        for (element in projects){

            console.log(`Adicionando o projeto ${projects[element]}`)
            const response = await axApi.post(`/api/3/customField/10066/option`, {

                options: [{
                    cascadingOptions: [],
                    value: projects[element]
                }]
            })
            console.log(response.data)
        }
    } catch (err) {
        console.error(err)
    }
}


addFieldOptions()

// const consult = async () => {
//     try {
//         const response = await axios.get(`https://dev.azure.com/pcdemolab/_apis/projects?api-version=2.0`, {
//             auth: {
//                 username: 'pauloc.alves@live.com',
//                 password: process.env.AZURE_PERSONAL_ACCESS_TOKEN
//             }
//         })
//         var allProjects = response.data.value
//         var projectsNames = []
//         for (let i = 0; i < allProjects.length; i++) {
//             projectsNames.push(allProjects[i].name)
           
//         }

//         console.log(projectsNames)

//     } catch (e) {
//         console.log('DEU RUIM NESSE LUGAR AQUI')
//     }
// }


// // consult()

