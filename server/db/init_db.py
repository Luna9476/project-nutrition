'''
We use this python file to initialzie db, it will execute scripts in schema.sql
'''
import sqlite3

connection = sqlite3.connect('database.db')

with open('schema.sql') as f:
    connection.executescript(f.read())

connection.commit()
connection.close()