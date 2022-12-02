import sqlite3

def get_db_connection():
    conn = None
    try:
        conn = sqlite3.connect('./db/database.db')
        conn.row_factory = sqlite3.Row
    except:
        print('No database found')
    return conn


def get_food_by_calories(calories, type, user_id, is_vegi):
    print(calories, type, user_id, is_vegi)
    conn = get_db_connection()
    cursor = conn.cursor()
    if is_vegi:
        cursor.execute(
        '''SELECT food_id, food_name, food_image_path, food_calories 
        FROM food 
        WHERE type = ? 
        AND vegi_or_not = 'yes'
        AND food_id not in (SELECT food_id FROM food_allergens WHERE allergen_id  IN (SELECT allergen_id FROM user_allergens WHERE user_id = ?))
        ORDER BY ABS(food_calories - ?) LIMIT 3
        ''',
        (type, user_id, calories)
        )
    else:
        cursor.execute(
        '''SELECT food_id, food_name, food_image_path, food_calories 
        FROM food 
        WHERE type = ? 
        AND food_id not in (SELECT food_id FROM food_allergens WHERE allergen_id  IN (SELECT allergen_id FROM user_allergens WHERE user_id = ?))
        ORDER BY ABS(food_calories - ?) LIMIT 3
        ''',
        (type, user_id, calories)
        )
    rows =cursor.fetchall()
    conn.close()
    foods = []
    for i in range(0, len(rows)):
        foods.append({
            'id': rows[i][0],
            'name': rows[i][1],
            'path': rows[i][2],
            'calories': rows[i][3]
        })
    return {'foods': foods}
