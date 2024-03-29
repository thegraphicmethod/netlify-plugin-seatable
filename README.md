Netlify Build plugin seatable - Downloads and save a seatable database as json file. 
Seatable is nocode database with multiple features like forms, automations, api, etc. https://seatable.io/ With this plugin you can use seatable as a headless cms or a database for your static site. JAMstack style!

By runing this plugin a json file will be downloaded from a seatable database and saved in the specified folder.

The json file is saved before building the site so it can be used in the build process for instance when generating a static site with NUXT.
The json file is not commited to the repository, it is only available during the build process.

THIS PLUGIN WILL OVERWRITE THE FILE IF IT ALREADY EXISTS.

# Install

Please install this plugin from the Netlify app or the netlify.toml file.

# Configuration

The following `inputs` options are available.
SEATABLE_TABLE_NAME which is the name of the table to download. If you want to download multiple tables simply write the names separated by a comma (no spaces betwen names)
DATA_FOLDER which is the folder where the json file will be saved.

***IMPORTANT***
Besides the inputs in the netlify.toml file it is **mandatory** to include the following environment variables in the netlify app:
* SEATABLE_APP_TOKEN which is the token of the seatable app. You can get the api Key for a Base in the advanced section of the base settings.

This is my first netlify plugin so any feedback is welcome.

Please notice that this plugin is not officialy supported by seatable. It is a plugin we created for our own needs. 
We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with SeaTable, or any of its subsidiaries or its affiliates. 
The plugin hasn't been extensively tested and it is provided as is. Do some testing before moving to production **We do not take any responsibility for the use of this plugin.**