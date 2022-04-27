// const { azureDevopsApi, jiraApi } = require('./auth')
import { azureDevopsApi, jiraApi } from './auth.js'

async function getAzureDevopsProjects() {
    var allProjects = []
    try {
        const response = await azureDevopsApi.get(`/_apis/projects?api-version=2.0`, {})
        const arrProjects = response.data.value
        for (const element of arrProjects) {
            allProjects.push(element.name)
            // console.log(element.name)
        }

        return allProjects
        // console.log(allProjects)
    } catch (err) {
        console.error(err)
    }
}

// getAzureDevopsProjects()

async function addFieldOptions() {
    try {
        var projects = await getAzureDevopsProjects()
        for (const element of projects) {

            console.log(`Adicionando o projeto ${element}`)
            const response = await jiraApi.post(`/api/3/customField/10066/option`, {

                options: [{
                    cascadingOptions: [],
                    value: element
                }]
            })
            console.log(response.data)
        }
    } catch (err) {
        console.error(err)
    }
}

// console.log(process.env.AZURE_DEVOPS_USERNAME, process.env.JIRA_USER, process.env.AZURE_PERSONAL_ACCESS_TOKEN, process.env.JIRA_TOKEN)

addFieldOptions()