const axios = require('axios')

const axApi = axios.create({
    baseURL: `https://teamuniti.atlassian.net/rest`,
    headers: {
        'Content-Type': 'application/json',
    },
    auth: {
        username: process.env.JIRA_USER,
        password: process.env.JIRA_TOKEN
    }
})



async function getAzureDevopsProjects() {
    var allProjects = []
    try {
        const response = await axios.get(`https://dev.azure.com/pcdemolab/_apis/projects?api-version=2.0`, {
            auth: {
                username: process.env.AZURE_DEVOPS_USERNAME,
                password: process.env.AZURE_PERSONAL_ACCESS_TOKEN
            }
        })
        const arrProjects = response.data.value
        for (element in arrProjects) {
            allProjects.push(arrProjects[element].name)
        }
        return allProjects
    } catch (err) {
        console.error(err)
    }
}
getAzureDevopsProjects()

async function addFieldOptions() {
    try {
        var projects = await getAzureDevopsProjects()
        for (element in projects) {

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

console.log(process.env.AZURE_DEVOPS_USERNAME, process.env.JIRA_USER, process.env.AZURE_DEVOPS_TOKEN, process.env.JIRA_TOKEN)

// addFieldOptions()