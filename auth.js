import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

export const jiraApi = axios.create({
    baseURL: `https://teamuniti.atlassian.net/rest`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    auth: {
        username: process.env.JIRA_USER,
        password: process.env.JIRA_TOKEN
    }
})


export const azureDevopsApi = axios.create({
    baseURL: `https://dev.azure.com/pcdemolab`,
    auth: {
        username: process.env.AZURE_DEVOPS_USER,
        password: process.env.AZURE_DEVOPS_PAT
    }
})

console.log(process.env.AZURE_DEVOPS_USER, process.env.AZURE_DEVOPS_PAT, process.env.JIRA_USER, process.env.JIRA_TOKEN)