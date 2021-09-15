## How to launch

This is simple React app, you will only need to install the dependencies, and start the app

```
npm install
npm start
```

# fighter

Small React application based on "Tinder", where the user can match with other "users" in order to setup fight ?

The main goal of this project is to use React to create multiple generic components, that can be reused in other applications. 
This allow us to create multiple applications based on the same generic concept of "matching" user.

Here we have our first idea : "Fighter", where you can find people in your area and in your weightclass to setup fight. But, if we change only the label, we can have a different concept : "Worker", where you can find worker in your area, that match your need (Developer, Laywer, etc)....

This allow more flexibility in term of finding the "right" concept. The idea of "fighter" may be completely illegal and useless, but we don't have much work to do if we want to adapt it to another idea (in our case : a simple json file containing our label)

## External library used :

- React bootstrap :
Just to make my life easier on the design

- I18next :
This internationalization framework is mainly used to provide a simple way to switch beetween langages. Here, we use it to switch beetween the different concept (fighter-worker)

