import axios from 'axios'
// const axios = require('axios')


export const jiraApi = axios.create({
    baseURL: `https://teamuniti.atlassian.net/rest`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    auth: {
        username: process.env.JIRA_USERNAME,
        password: process.env.JIRA_TOKENA
    }
})


export const azureDevopsApi = axios.create({
    baseURL: `https://dev.azure.com/pcdemolab`,
    auth: {
        username: process.env.AZURE_DEVOPS_USER,
        password: process.env.AZURE_DEVOPS_PAT
    }
})

