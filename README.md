Netlify Build plugin seatable - Downloads and save a seatable database as json file.
By runing this plugin a json file will be downloaded from a seatable database and saved in the specified folder.

Please notice that this plugin is not officialy supported by seatable.

The json file is saved before building the site so it can be used in the build process for instance when generating a static site with NUXT.
The json file is not commited to the repository, it is only available during the build process.


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