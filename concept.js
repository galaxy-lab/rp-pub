var jiraOptions = [
    { id: '10063', value: 'demo-proj', disabled: false },
    { id: '10046', value: 'Dev', disabled: false },
    { id: '10048', value: 'Finance', disabled: false },
    { id: '10047', value: 'Frontend', disabled: false },
    { id: '10066', value: 'ghapi-ci', disabled: false },
    { id: '10073', value: 'demo-action', disabled: false },
    { id: '10075', value: 'HR', disabled: false },
    { id: '10074', value: 'demo-lab', disabled: false },
    { id: '10076', value: 'teste', disabled: false }
]



// for (let element of jiraOptions) {
//     emptyList.name = element.value
// }
// console.log(emptyList)

var devopsProjects = [
    'demo-action',
    'action-demo',
    'demo-lab',
    'demo-proj',
    'demo-aa',
    'ghapi-ci'
]

// MAPEAR QUAL ITEM NÃO ESTÁ NO AZURE DEVOPS PARA EXCLUIR
let fieldOptionsValues = jiraOptions.map(x => x.value.toLocaleLowerCase())
// let fieldOptionsId = jiraOptions.map(x => x.id.toLocaleLowerCase())
console.log(fieldOptionsValues.indexOf('ghapi-sadci'))




function mapOptions(fieldOptionsValues) {
    let count = 0
    var body = {
        options: [

        ]
    }
    
    for (let project of fieldOptionsValues) {
        if (devopsProjects.indexOf(project) == -1) {
            body.options.push({
                id: jiraOptions[count].id,
                value: jiraOptions[count].value,
                disabled: true
            })
        }
        count++
    }
    return (body)
}

console.log(mapOptions(fieldOptionsValues))

// OS DADOS TEM QUE SER ASSIM
// { options: [ { id: '10075', value: 'HR', disabled: false } ] }







// for (let project of fieldOptionsValues) {
//     if (devopsProjects.indexOf(project) == -1) {

//         console.log(jiraOptions[count].id, jiraOptions[count].value)
//     }
//     count ++
// }



// var test = jiraOptions.map(x => x.value.toLocaleLowerCase())

// for (let element of test) {

//     // var test2 = test.indexOf(element)
//     console.log(devopsProjects.indexOf(element))
// }





//     var new_dict = {}

// for (let element of jiraOptions) {

//     try {
//         new_dict.value = element.id

//     } catch (err) {
//         element.value = []
//         new_dict.value = element.id
//     }
// }

// console.log(new_dict)





function checkArrays() {

    const respo = jiraOptions.filter(element => {
        for (var projects of devopsProjects) {
            if (element.value.toLocaleLowerCase() === projects) {
                console.log(`The project ${projects} on Azure devops and the field item ${element.value.toLocaleLowerCase()} are the same`)
            }
            console.log(`This item [${element.value.toLocaleLowerCase()}] is Jira's field. And this item is on azure devops ${projects} `)
        }

    })
    return respo
}

// checkArrays()



// const equalsIgnoreOrder = (a, b) => {
//     if (a.length !== b.length) return false;
//     const uniqueValues = [...a, ...b];
//     for (const v of uniqueValues) {
//         const aCount = a.filter(e => e === v).length
//         const bCount = b.filter(e => e === v).length
//         if (aCount !== bCount) return false;
//     }
//     return true;
// }

// console.log(equalsIgnoreOrder(jiraOptions, devopsProjects))

var a = [1, 2, 5, 3];
var b = [1, 2, 3, 5, 6, 7];

const output = b.filter(function (obj) {
    return a.indexOf(obj) === -1
})

// console.log(output)


// const another = test.forEach(element => {
//     console.log(element.id, element.value)
// })



var array_data = ['HTML','CSS','JavaScript','jQuery','Bootstrap'];
/* Holder array vairable  */
var data_holder = [];
for(var x = 0; x < array_data.length; x++){
   data_holder.push({
      "data" : array_data[x],
      "data_key" : x
   });
}
/* The output data in JSON format */
// console.log(data_holder);