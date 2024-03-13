![](./Intelligrocery/images/IntelliGrocery.png) 

Intelligrocery is a smart mobile application that consolidates all of your pantry items, grocery lists, and recipe management into one place. Using Intelligrocery, you can look up a new recipe and instantly see a list of it's ingredients, which you can then add to your grocery list and home pantry. Intelligrocery uses a recipe API that has thousands of recipes so that every single person is sure to find recipes that fit their needs and tastes. It also allows the user to easily customize the name, quantity, and units with a seameless user interface, as well move items from one's grocery list to pantry after they've been purchased. Finally, it keeps track of your grocery list and pantry in an external database, keeping your data safe and ready use the next time you log in to or open the app.

Users such as Alexa, a 32 year old single mother and lawyer, will love Intelligrocery as it saves them time and money! With her busy schedule, Alexa loves being able to add her favortie recipes on the go, and always knowing what she has at home and in her grocery list so she never forgets an ingredient for a special meal she wants to cook for her family. Ilai, a college student loves Intelligrocery as it helps him save money and time! When wanting to try out a new recipe, Ilai knows that Intelligrocery already knows what's in his pantry, so he's sure to not overbuy or buy something he already has at home!

## Group Members:
- Eric Marzouk @EricM5
- Nadav Avital @nadavital
- Daniel Rose @dannyrose30
- Audrey Zhou @apzhou0
- Joshua Son @Joshuason55
- Michael Hu @michaelhu88
- Anderson Lee @andersonlee3

## Tech Stack

For frontend, we are using React Native, and for backend we are using Cloud Firestore with Firebase Authentication.
## Testing/Viewing the Application
To test the application, we require three additional downloads.

1. Expo. We recommend downloading the Expo Go application on your mobile device.
2. Edamam RecipeAPI <br/>
    a. Make an account at [this site](https://www.edamam.com/) and create an api key for Recipe Search API. <br/>
    b. Click "Accounts" at the top right, "Go To Dashboard", "Applications", "Create a New Application" <br/>
    c. Click "Recipe Search API", and add a title and short description, then press "Create Application". Go back to your "Applications" in your Dashboard and it should be there. <br/>
    d. Press "View" on your new API key, you'll be using these credentials in Deployment. <br/>
3. Node.js and npm: Follow the instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to download Node.js and npm package installer.

Once completed, please navigate to the deployment instructions below to run the app.

## User Roles and Permissions

General users (such as home cooks or professional cooks) are able to edit and view the ingredients in their own pantries and grocery lists. They can create custom recipes that only they can access. General users can also look up and view publically-viewable recipes, but they cannot add to or edit these recipes. 

## Deployment
### Set up
First clone the Intelligrocery repo: \
git clone [git@github.com:ucsb-cs148-w24/project-pj03-intelligrocery.git](git@github.com:ucsb-cs148-w24/project-pj03-intelligrocery.git)

Naviate to the Intelligrocery/ directory for the main source code. Create a .env file with vim or whatever IDE you have, and put your API credentials (from the key you made earlier) in the below format: \
app_id="xxxxxx" \
app_key="yyyyyyyyyyyyyyyyyyyyy" 

### How to deploy
To ensure all correct packages are installed for the app, run these commands:\
`rm -rf node_modules`\
`npm install`

Then, to start the app, run:\
`npx expo start`

Finally, pull out your phone on to scan the QR code (on camera for iOS and on the Expo app for android), and...

Start your intelligrocery list!
