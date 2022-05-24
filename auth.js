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


async function getAzureDevopsProjects() {
    console.log('Getting azure devops projects list...')
    var allProjects = []
    var continuationToken = 0
    try {
        do {
            const response = await azureDevopsApi.get(`/_apis/projects?api-version=2.0&continuationToken=${continuationToken}`, {})
            if (response.status !== 200) {
                throw new Error(`Unexpected response code ${response.status} | ${response.statusText}`)
            }
            const objProjects = response.data.value
            objProjects.forEach(objProject => {
                allProjects.push(objProject.name)
            })
            continuationToken = response.headers['x-ms-continuationtoken']
        } while (continuationToken != null)
        return allProjects
    } catch (err) {
        console.log(`It could not be possible retrieve the porjects list from Azure DevOps. [ERROR]: ${err.message}`)
        throw err
    }
}

console.log(await getAzureDevopsProjects())
