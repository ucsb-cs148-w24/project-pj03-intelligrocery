# Intelligrocery
## Set up
First clone the repo: 
git clone git@github.com:ucsb-cs148-w24/project-pj03-intelligrocery.git 

Make an account at [this site](https://www.edamam.com/) and create an api key for Recipe Search API. Put the app id and api key in a .env file in the Intelligrocery directoy like this:

app_id="xxxxxx"
app_key="yyyyyyyyyyyyyyyyyyyyy"


## How to deploy
To ensure all correct packages are installed, run these commands:\
rm -rf node_modules/\ (if these already exist for you)
npm install

Then, to start the app, run:\
npx expo start

Finally, pull out your phone on to scan the QR code (on camera for iOS and on the Expo app for android), and...\

Start your intelligrocery list!
