'''
Interact with allergens table
'''
import sqlite3

def get_db_connection():
    conn = None
    try:
        conn = sqlite3.connect('./db/database.db')
        conn.row_factory = sqlite3.Row
    except:
        print('No database found')
    return conn

# get allergen options
def get_all_allergies():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'SELECT * FROM allergens'
    )
    rows = cursor.fetchall()
    allergies = []
    for row in rows:
        allergies.append({
            'id': row[0],
            'label': row[1]
        })
    conn.close()
    return {
        'allergies': allergies
    }