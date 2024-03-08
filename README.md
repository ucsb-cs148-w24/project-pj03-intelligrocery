# Intelligrocery


Intelligrocery is a smart mobile application that consolidates all of your pantry items, grocery lists, and recipe management into one place. Using Intelligrocery, you can look up a new recipe or select an old favorite, and instantly see what items you need to add to your grocery list, and which ones you already have in your pantry at home. Intelligrocery uses a recipe API that has thousands of recipes so that every single person is sure to find recipes that fit their needs and tastes. Whenever you add a new recipe, Intelligrocery checks your pantry and your ongoing grocery list to see what other items you need to buy, and by saving your favorite recipes you can get to them quickly and add them to your list in an instant. Users such as Alexa, a 32 year old single mother and lawyer, will love Intelligrocery as it saves them time and money! With her busy schedule, Alexa loves being able to add her favortie recipes on the go, and always knowing what she has at home and in her grocery list so she never forgets an ingredient for a special meal she wants to cook for her family. Ilai, a college student loves Intelligrocery as it helps him save money and time! When wanting to try out a new recipe, Ilai knows that Intelligrocery already knows what's in his pantry, so he's sure to not overbuy or buy something he already has at home!

## Group Members:
- Eric Marzouk @EricM5
- Nadav Avital @nadavital
- Daniel Rose @dannyrose30
- Audrey Zhou @apzhou0
- Joshua Son @Joshuason55
- Michael Hu @michaelhu88
- Anderson Lee @andersonlee3

## Tech Stack

For frontend, we are using React Native, and for backend we are using AWS. For databases we will use DynamoDB.

## Testing/Viewing the Application
To test the application, use Expo. 

We recommend downloading the application on your mobile device. It requires npm package manager to be installed.

Please run the app from the Intelligrocery/ directoy, and refer to our README within that directory [here](https://github.com/ucsb-cs148-w24/project-pj03-intelligrocery/blob/main/Intelligrocery/README.md) for further instructions.

## User Roles and Permissions

General users (such as home cooks or professional cooks) are able to edit and view the ingredients in their own pantries and grocery lists. They can create custom recipes that only they can access. General users can also look up and view publically-viewable recipes, but they cannot add to or edit these recipes. 

## Deployment
### Set up
First clone the repo: 
git clone git@github.com:ucsb-cs148-w24/project-pj03-intelligrocery.git 

Make an account at [this site](https://www.edamam.com/) and create an api key for Recipe Search API. Put the app id and api key in a .env file in the Intelligrocery directoy like this:

app_id="xxxxxx"
app_key="yyyyyyyyyyyyyyyyyyyyy"


### How to deploy
To ensure all correct packages are installed, run these commands:\
`rm -rf node_modules`\
`npm install`

Then, to start the app, run:\
`npx expo start`

Finally, pull out your phone on to scan the QR code (on camera for iOS and on the Expo app for android), and...\

Start your intelligrocery list!
