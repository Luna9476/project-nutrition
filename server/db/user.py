'''
This python file is used to handle db CRUD operations related to user.
'''
from datetime import datetime
import sqlite3

def get_db_connection():
    conn = None
    try:
        conn = sqlite3.connect('./db/database.db')
        conn.row_factory = sqlite3.Row
    except:
        print('No database found')
    return conn

# add new user record into user table
def add_new_user(username, email, password):
    conn = get_db_connection()
    cur = conn.cursor()
    try: 
        cur.execute(
            'INSERT INTO user (username, email, password) VALUES (?, ?, ?)', (username, email, password)
        )
        conn.commit()
    finally:
        conn.close()

# update user's record
def update_user(user_id, user_name, gender, is_vegi, birthdate, allergens):
    conn = get_db_connection()
    cur = conn.cursor()
    try: 
        cur.execute(
            'UPDATE user SET username = ?, gender = ?, vegi = ?, birthdate = ? WHERE user_id = ?',
            (user_name, gender, is_vegi, birthdate, user_id)
        )

        cur.execute(
            'DELETE FROM user_allergens WHERE user_id = ?',
            (user_id,)
        )
        cur.executemany(
            'INSERT INTO user_allergens (user_id, allergen_id) values (?, ?) ON CONFLICT (user_id, allergen_id) DO NOTHING',
            map(lambda allergen: (user_id, allergen) , allergens)
        )
        conn.commit()
    except sqlite3.Error as e:
        print(e)
        return -1
    finally:
        conn.close()
    return 1

# find user's record based on email
def find_user(email):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'SELECT user_id, email, password FROM user where email = ?',
        (email, )
    )
    rows = cur.fetchall()
    user = {
        'id': rows[0][0],
        'email': rows[0][1],
        'password': rows[0][2]
    }
    conn.close()
    return user

# find user's record based on user_id
def find_user_by_id(user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        '''SELECT user.user_id, username, email, password, gender, vegi, birthdate, allergen_id, allergen_name 
            FROM user
            LEFT JOIN user_allergens ON user.user_id = user_allergens.user_id AND user.user_id = ?
            LEFT JOIN allergens  ON user_allergens.allergen_id = allergens.id''',
        (user_id, )
    )
    rows = cur.fetchall()

    allergen_ids = []
    for row in rows:
        if row[7]:
            allergen_ids.append({'id': row[7], 'label': row[8]})
    
    print("allergen_ids: ", allergen_ids)
    user = {
        'id': rows[0][0],
        'username': rows[0][1],
        'email': rows[0][2],
        'password': rows[0][3],
        'gender': rows[0][4],
        'vegi': rows[0][5] == 1 if rows[0][5] is not None else False,
        'birthdate': rows[0][6],
        'allergens': allergen_ids
    }
    conn.close()
    return user

# find user's avatar image path
def find_user_avatar(user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'SELECT avatar_path FROM user WHERE user_id = ?',
        (user_id,)
    )
    rows = cur.fetchall()
    print(rows[0][0])
    conn.close()
    return rows[0][0]

# update user's avatar
def update_avatar(user_id, path):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'UPDATE user SET avatar_path = ? WHERE user_id = ?', (path, user_id)
    )
    conn.commit()
    conn.close()

# find the most recent body record
def find_latest_body_record(user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'SELECT height, weight FROM user_body_records where user_id = ? ORDER BY updatetime DESC LIMIT 1', (user_id, )
    )
    row = cur.fetchone()      
    conn.close()
    if row:
        return {
            'height': row[0],
            'weight': row[1]
        }

# add body record
def add_body_record(user_id, height, weight):
    conn = get_db_connection()
    cur = conn.cursor()
    now = datetime.now()
    cur.execute(
        'INSERT INTO user_body_records (user_id, height, weight, updatetime) values (?, ?, ?, ?)', (user_id, height, weight, now)
    )
    conn.commit()
    cur.execute(
        'SELECT height, weight FROM user_body_records where user_id = ? and updatetime = ?', (user_id, now)
    )
    row = cur.fetchone()
    conn.close()
    return {
        'height': row[0],
        'weight': row[1]
    }

# find user's all body records
def find_user_body_records(user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'SELECT weight, updatetime FROM user_body_records where user_id = ? LIMIT 20',
        (user_id, )
    )
    rows = cur.fetchall()
    records = []
    for row in rows:
        records.append({
            'weight': row[0],
            'date': row[1]
        })
    conn.close()
    return records
    
# test method
def hello():
    conn = get_db_connection()
    rows = conn.execute('SELECT * FROM user').fetchall()
    users = []
    for row in rows:
        users.append({
            'id': row[0],
            'email': row[1]
        });
    conn.close()
    return {"users": users}