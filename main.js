import { azureDevopsApi, jiraApi } from './auth.js'

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

// console.log(await getAzureDevopsProjects())

async function addFieldOptions() {
    console.log('Adding options on custom field...')
    try {
        var projects = await getAzureDevopsProjects()
        for (let element of projects) {
            await jiraApi.post(`/api/3/customField/10066/option`, {
                options: [{
                    cascadingOptions: [],
                    value: element
                }]
            })
            console.log(`Adding the project ${element.toLocaleLowerCase()} to customfield 10066`)
        }
        console.log("-----------------------------------------------------")
    } catch (err) {
        console.log(`It could not be possible add a new item to field. [ERROR]: ${err.message}`)
        throw err
    }
}

// await addFieldOptions()


function onlyOneList(collectionOfArray) {
    var allItems = []
    collectionOfArray.forEach((collection) => {
        collection.forEach((unitData) => {
            allItems.push(unitData);
        });
    });
    return allItems
}

async function getFieldOptions() {
    console.log('Getting all options of field...')
    var startAt = 0
    var isLast = false
    let fieldOptions = []
    try {
        do {
            const response = await jiraApi.get(`/api/3/field/customfield_10066/context/10167/option?startAt=${startAt}`)
            fieldOptions.push(response.data.values)
            isLast = response.data.isLast
            startAt += 100
        } while (isLast === false)
        console.log(`Saving field options...`)
        return fieldOptions
    } catch (err) {
        console.error(`It was not possible to get field options. [ERROR]: ${err.message}`)
        throw err
    }
}


const fieldOptions = await getFieldOptions()
// console.log(fieldOptions)
const collectionOptions = onlyOneList(fieldOptions)
const devopsProjects = await getAzureDevopsProjects()


function mapOptions(fieldOptions, devopsProjects) {
    let options = [
    ]
    for (let fieldOption of fieldOptions) {
        if (devopsProjects.indexOf(fieldOption.value) == -1) {
            options.push({
                id: fieldOption.id,
                value: fieldOption.value,
                disabled: true
            })
        }
    }
    return (options)
}

const optionsToDisable = mapOptions(collectionOptions, devopsProjects)
console.log(optionsToDisable)

async function disableFieldOptions(mapOptions) {
    console.log('Building a map of options to disable...')
    try {
        const response = await jiraApi.put(`/api/3/field/customfield_10066/context/10167/option`, { options: mapOptions })
        console.log('Field(s) disabled(s): ')
        console.log(response.data)
    } catch (err) {
        console.error(`It was not possible to disable the field option. [ERROR]: ${err.message}`)
        throw err
    }
}


disableFieldOptions(optionsToDisable)



// CRIAR FUNÇÃO PARA PROJETO QUANDO DELETADO E CRIADO NOVAMENTE COM O MSM NOME DEVE SER HABILITADO