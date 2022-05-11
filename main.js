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

await addFieldOptions()


// console.log(await jiraApi.get(`/api/3/field/customfield_10066/context`))











// RETRIEVE AN ARRAY OF ALL FIELD OPTIONS SORTED ALPHABETICALLY
// TRAZER O ID E O VALUE AQUI
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

// // MAPEAR QUAL ITEM NÃO ESTÁ NO AZURE DEVOPS PARA EXCLUIR
// let fieldOptionsValues = jiraOptions.map(x => x.value.toLocaleLowerCase())
// let fieldOptionsId = jiraOptions.map(x => x.id.toLocaleLowerCase())
// let count = 0

// for (let project of fieldOptionsValues) {
//     if (devopsProjects.indexOf(project) == -1) {
//         console.log(jiraOptions[count].id, jiraOptions[count].value)
//     }
//     count ++
// }





async function disableFieldOptions(mapOptions) {
    // const bodyData = null


    try {
        const response = await jiraApi.put(`/api/3/field/customfield_10066/context/10167/option`, mapOptions)
        console.log(response.data)
    } catch (err) {
        console.error(err.message)
    }
}

disableFieldOptions(optionsToDisable)

// const devopsProjects = await getAzureDevopsProjects()
// const fieldOptions = await getFieldOptions()
// fieldOptions.filter(element => {
//     console.log(element.value.toLowerCase())
// })








// RETRIEVE AN ARRAY OF THE ITENS THAT DOESN'T ON AZURE DEVOPS AS PROJECTS
// PEGAR ESSE RETORNO E EXCLUIR CADA ITEM NO JIRA FIELD OPTION
// const output = fieldOptions.filter(function (obj) {
//     return devopsProjects.indexOf(obj) === -1
// })

// console.log(output)




/*
RODAR O CODIGO PARA VER O OPTION ID MUDA
*/
