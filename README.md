# project-nutrition

# How to start

## Python virtual environment

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
npm start
```
It will show the App log in page with localhost:3000
