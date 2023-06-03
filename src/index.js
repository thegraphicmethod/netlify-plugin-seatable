const fs = require('fs')
const axios = require('axios')
const apptoken = process.env.SEATABLE_APP_TOKEN
const config = {
  method: 'get',
  url: 'https://cloud.seatable.io/api/v2.1/dtable/app-access-token/',
  headers: {
    Accept: 'application/json; charset=utf-8; indent=4',
    Authorization: `Token ${apptoken}`,
  },
}



module.exports = {
  onPreBuild: async ({ utils, inputs }) => {
    const tableName = inputs.SEATABLE_TABLE_NAME
    const baseFolder = inputs.DATA_FOLDER
    let tableNames = tableName.split(',')
    let basetoken, dtableUuid, server = ''
    // transform table name in an array split by comma
    return axios(config)
      .then(function (response) {
        basetoken = response.data.access_token
        dtableUuid = response.data.dtable_uuid
        server = response.data.dtable_server   
        let promises = []
        tableNames.forEach((tableName) => {
          promises.push(pullTableData(tableName, server, basetoken, dtableUuid,baseFolder, utils))
        })    
        return Promise.all(promises)
        
      })
      .catch(function (error) {
        console.log(error)
        utils.build.cancelBuild('Error: ' + error)
      })
  },
}

function pullTableData(tableName, server, basetoken, dtableUuid, baseFolder, utils) {
  const config2 = {
    method: 'get',
    url: `${server}/api/v1/dtables/${dtableUuid}/rows/?table_name=${tableName}&view_name=Default View`,
    headers: {
      Authorization: 'Token ' + basetoken,
    },
  }

  return axios(config2)
      .then(function (response) {
        fs.writeFile(
          `${baseFolder}/${tableName}.json`,
          JSON.stringify(response.data),
          'utf8',
          function (err) {
            if (err) {
              utils.build.cancelBuild(`Error: writting file ${tableName}.json` + err)
            }
            console.log(`JSON file ${tableName}.json has been saved.`)
          }
        )
        console.log(`${response.data.rows.length} rows saved to file.  ${tableName}`)
      })
      .catch(function (error) {
        utils.build.cancelBuild('Error: ' + error)
      })  
}