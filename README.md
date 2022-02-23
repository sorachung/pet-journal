# Pet Journal

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

Pet Journal is a webapp for tracking and logging information related to your pets.

### Features

* Add pets to your profile - dogs, cats, rabbits, reptiles, etc
* Choose default pet view for Medical, Notes, and Scheduling - you only see the information for the chosen pet
* Dashboard view - see starred info for all of your pets
* Ablility to star any data to show up on dashboard
* Contacts - where you can save information such as phone numbers, addresses, etc for vets, groomers, sitters, etc
* Scheduling - such as events and reminders. 
  * Events and reminders grey out when the datetime has passed
  * Reminders can be checked to indicate that they are complete
* Notes - a place where you can write anything about your pet
* Memories - where you can upload photos with titles and captions of your pets
  * you can filter posts by pet and/or by starred status
* Compile your pets' medical information under Medical
  * Bio - save your pets weight, microchip, allergies, and other basic information
  * Medications - track any medications your pets take or have taken in the past
  * Incidents - track any incidents or illnessees your pets have gone through or are going through
  * Vet Visits - track vet visits for your pets and save any details about the visit, including uploading a picture of the vet invoice
  * Vaccinations - track vaccinations your pet has taken by shot and by date

## Tech Stack
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## How To Use

### Dependencies
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [JSON Server](https://github.com/typicode/json-server)

### Instructions
#### Installation/Starting the app
* clone the repository
* install necessary files with `npm install` in root directory of repo
* clone the [API](https://github.com/sorachung/pet-journal-api)
* install JSON Server with `npm install json-server` in API directory (add the -g flag if you'd like to install it globally)
* host the api on port 8088 with `json-server -p 8088 database.json`
* in root directory of repo, start the app with `npm start`

#### Demo
* existing user login email: sora@chung.com
* can also register as new user and start by adding a pet

## Planning Docs
* [ERD](https://dbdiagram.io/d/61e1fd3f4bca010ae98dbe93)
