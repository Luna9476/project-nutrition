# Final Project: Health Management System
Group 5: Jingwen Zhou, Minghang Li, Lei Lu

# About the Project 
## Motivation and Objectives
Nowadays people pay more attention to healthy diet, some want to lose weight, some want to build muscle, and some want to keep fit. Some people concern about their height and weight changes and want to keep track of them easily. Although people care about calories and nutrients in food, many people may not know how to choose food due to the lack of nutrition knowledge. 

Our project aims to recommend three meals a day based on each user’s physical condition. We want to build a system that helps users reach their health goals.
The system can tell users calories of food, and help users manage their daily calorie intake. Also, for people who would like to easily track their weight and height and see the curve, our system provide a record function for them. Users can update and record their height or weight every day, then the system will draw the curve based on the data.

## Main Features
1. Profile
   - Record users’ personal  information (username password, email, gender, vegi, avatar… )
2. Body Record
   - Record people’s body information with different date so that system can draw a curve based on the data
3. Food Bank
   - Recommend different foods with allergic tags for breakfast, lunch and dinner

## Technical stack 
- **Frontend**: React.js
- **Backend**: Python (Flask as Web Framework) 

## Database Structure
**Three main entities:** Users; Foods; Allergens

**Two relationships:** User-allergens; Food-allergens

## ER diagram
[ER diagram (health management system).pdf](https://github.com/Luna9476/project-nutrition/files/10179091/ER.diagram.health.management.system.pdf)


# Demo
https://user-images.githubusercontent.com/90715605/206268644-2e41ec54-b2c8-42fc-b4f5-c54c5da2fc91.mp4



# How to start

## Python virtual environment
cd to the project folder
1. Create virtual environment
```
python3 -m venv venv
source venv/bin/activate
```

2. Check we are under virtual environment, run 
```
which python
```

it should say that we are using the virtual python environment under our project like
```
.../.../project-nutrition/venv/bin/python
```

3. Add .gitignore file with * under venv folder to exclude all the files under venv folder
``` 
*
```

4. Install Python dependencies in our virtual environment
```
cd server
pip install -r requirements.txt
```

## Init database
```
cd server/db
python init_db.py
```

it will call `schema.sql` to create tables and do db setup.
## Start server

Start python server
```
cd server
python server.py
```

## Start client

Start react client
```
cd client
npm install
npm start
```
It will show the App log in page with localhost:3000
