import axios from 'axios'
// const axios = require('axios')


export const jiraApi = axios.create({
    baseURL: `https://teamuniti.atlassian.net/rest`,
    headers: {
        'Content-Type': 'application/json',
    },
    auth: {
        username: process.env.JIRA_USER,
        password: process.env.JIRA_TOKEN
    }
})


export const azureDevopsApi = axios.create({
    baseURL: `https://dev.azure.com/pcdemolab`,
    auth: {
        username: process.env.AZURE_DEVOPS_USERNAME,
        password: process.env.AZURE_PERSONAL_ACCESS_TOKEN
    }
})

