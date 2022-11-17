import sqlite3

def get_db_connection():
    conn = None
    try:
        conn = sqlite3.connect('./db/database.db')
        conn.row_factory = sqlite3.Row
    except:
        print('No database found')
    return conn

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

def find_user_by_id(user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'SELECT user_id, username, email, password, gender, vegi FROM user where user_id = ?',
        (user_id, )
    )
    rows = cur.fetchall()
    user = {
        'id': rows[0][0],
        'username': rows[0][1],
        'email': rows[0][2],
        'password': rows[0][3],
        'gender': rows[0][4],
        'vegi': rows[0][5] == 'true' if rows[0][5] is not None else False
    }
    conn.close()
    return user

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

def update_avatar(user_id, path):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'UPDATE user SET avatar_path = ? WHERE user_id = ?', (path, user_id)
    )
    conn.commit()
    conn.close()

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