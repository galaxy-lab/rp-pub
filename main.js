import { azureDevopsApi, jiraApi } from './auth.js'

async function getAzureDevopsProjects() {
    var allProjects = []
    try {
        const response = await azureDevopsApi.get(`/_apis/projects?api-version=2.0`, {})
        const arrProjects = response.data.value
        for (const element of arrProjects) {
            allProjects.push(element.name)
        }

        return allProjects
    } catch (err) {
        console.error(err)
    }
}


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

await addFieldOptions()


async function getFieldOptions() {
    try {
        const response = await jiraApi.get(`/api/3/field/customfield_10066/context/10167/option`)
        const fieldOptions = response.data.values;
        return fieldOptions
    } catch (err) {
        console.error(err.message)
    }

}

const fieldOptions = await getFieldOptions()
const devopsProjects = await getAzureDevopsProjects()

const fieldOptionsValues = await fieldOptions.map(x => x.value.toLocaleLowerCase())

function mapOptions(fieldOptionsValues, devopsProjects) {
    let count = 0
    var body = {
        options: [
        ]
    }
    for (let project of fieldOptionsValues) {
        if (devopsProjects.indexOf(project) == -1) {
            body.options.push({
                id: fieldOptions[count].id,
                value: fieldOptions[count].value,
                disabled: true
            })
        }
        count++
    }
    return (body)
}

const optionsToDisable = mapOptions(fieldOptionsValues, devopsProjects)


async function disableFieldOptions(mapOptions) {
    try {
        const response = await jiraApi.put(`/api/3/field/customfield_10066/context/10167/option`, mapOptions)
        console.log(response.data)
    } catch (err) {
        console.error(err.message)
    }
}

disableFieldOptions(optionsToDisable)
