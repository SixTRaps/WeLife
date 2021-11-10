# WeLife

------
Matthew Vargas Code Review: 
* I really like your registration and login pages.  They are quite simple, and it's really good to have a confirm password.
* something I didn't understand was the home page after logging in.  I get a blank screen with no content in it.  Is there supposed to be something there?
* Your general.js file is really loaded with code.  Is there a better way to organize or clean it up?  The displayMoments function is really long
* Your index.js file for your routes is really clean!  I like the added comments for each request.
* I also like your MongoDB file, also really clean.
* The site is really nice!  Cool project, nice work!
------


## Author
[Anni Lin](https://github.com/Annie0207)  
[Xuejia Yang](https://github.com/SixTRaps)

## Project Objective
This is a website application for international students to share their life moments. It consists of 5 parts: website introduction page, authentication(signin/signup/logout), all-posts page (Like), personal home page (Edit and Delete) and post creation page. 

Users can read the website introduction and then **register** a new accout. On the general page, they can view all moment posts shared by other users and **Like** the posts they're touched. On the personal home page, they can view all moments posted by themselves, **edit** and **delete** these posts.

## Screenshot
![introduction_page](https://user-images.githubusercontent.com/51539363/140631243-1ca59811-8da7-47bb-8658-1a37078d0d4b.png)

![general_page](https://user-images.githubusercontent.com/51539363/140437699-f43d5b8b-75c6-4921-b784-1f2cd7b14456.png)

## Tech requirements
* HTML/CSS/JavaScript
* bcrypt
* passport
* express
* mongodb
* node
* AJAX

## How to install/use locally
Use the website deployed here:   
**WeLife Web Deployed in Heroku** <https://welife-web-dev.herokuapp.com/>

or

* Clone this repo and run npm install
* Create an .env file in the root directory of this project and include the api key in it.
* Keep your mongodb running
* Run npm start or nodemon app.js

## Reference to the class
[CS5610](https://johnguerra.co/classes/webDevelopment_fall_2021/)

## Video Demonstration
[Demo Vedio](https://youtu.be/RuSrqHEUV-M)

## Google Slides
[Slides](https://docs.google.com/presentation/d/1pLbUGlIsU2DRF0bAdil7N2dIWhsOQ82wgUj1Sad0GJM/edit?usp=sharing)

## MIT License
[MIT License](https://github.com/SixTRaps/WeLife/blob/main/LICENSE)

## Release
[Release V1.1](https://github.com/SixTRaps/WeLife/releases/tag/v1.1)
