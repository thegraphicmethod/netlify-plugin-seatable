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
    // transform table name in an array split by comma
    const p1 = await axios(config)
      .then(function (response) {
        const basetoken = response.data.access_token
        const dtableUuid = response.data.dtable_uuid
        const server = response.data.dtable_server
        const config2 = {
          method: 'get',
          url: `${server}/api/v1/dtables/${dtableUuid}/rows/?table_name=${tableName}&view_name=Default View`,
          headers: {
            Authorization: 'Token ' + basetoken,
          },
        }
        return config2
      })
      .catch(function (error) {
        console.log(error)
        utils.build.cancelBuild('Error: ' + error)
      })
    
    const p2 = await axios(p1)
      .then(function (response) {
        fs.writeFile(
          `${baseFolder}/${tableName}.json`,
          JSON.stringify(response.data),
          'utf8',
          function (err) {
            if (err) {
              utils.build.cancelBuild('Error: writting file' + err)
            }
            console.log('JSON file 1 has been saved.')
          }
        )
        console.log(response.data.rows.length + 'rows saved to file.')
      })
      .catch(function (error) {
        utils.build.cancelBuild('Error: ' + error)
      })

    return Promise.all([p2])
  },
}
