DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS allergens;
DROP TABLE IF EXISTS user_allergens;
DROP TABLE IF EXISTS food;
DROP TABLE IF EXISTS food_allergens;
DROP TABLE IF EXISTS user_body_records;

CREATE TABLE "allergens" (
	"id"	INTEGER,
	"allergen_name"	TEXT,
	PRIMARY KEY("id")
);


CREATE TABLE "food" (
	"food_id"	INTEGER,
	"food_name"	TEXT,
	"food_image_path"	TEXT,
	"food_calories" INTEGER,
	"vegi_or_not" TEXT,
	"type" TEXT,
	PRIMARY KEY("food_id")
);

CREATE TABLE "food_allergens" (
	"id"	INTEGER,
	"food_id"	INTEGER,
	"allergen_id"	INTEGER,
	PRIMARY KEY("id"),
	FOREIGN KEY("allergen_id") REFERENCES "allergens"("id"),
	FOREIGN KEY("food_id") REFERENCES "food"("food_id")
);

CREATE TABLE "user" (
	"user_id"	INTEGER,
	"email"	TEXT NOT NULL UNIQUE,
	"username"	TEXT,
	"password"	TEXT NOT NULL,
	"avatar_path"	TEXT,
	"gender"	TEXT,
	"vegi"	INTEGER,
	PRIMARY KEY("user_id" AUTOINCREMENT)
);

CREATE TABLE "user_allergens" (
	"id"	INTEGER,
	"user_id"	INTEGER,
	"allergen_id"	INTEGER,
	PRIMARY KEY("id"),
	FOREIGN KEY("user_id") REFERENCES "user"("user_id"),
	FOREIGN KEY("allergen_id") REFERENCES "allergens"("id")
);

CREATE TABLE "user_body_records" (
	"id"	INTEGER,
	"user_id"	INTEGER,
	"height"	NUMERIC,
	"weight"	NUMERIC,
	"updatetime"	NUMERIC,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "user"("user_id")
);

INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Burgers and Seasoned Potatoes', 'images/foods/Burgers-and-Seasoned-Potatoes.png', 660, 'no', 'lunch');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Roasted Chicken and Spiced Potatoes', 'images/foods/Roasted-Chicken-and-Spiced-Potatoes.png', 550, 'no', 'lunch');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Roasted Veggie Pasta', 'images/foods/Roasted-Veggie-Pasta.png', 600, 'yes', 'lunch');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Cheesy Pork Enchiladas', 'images/foods/Cheesy-Pork-Enchiladas.png', 550, 'no', 'lunch');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Teriyaki Shrimp Stir-Fry with Rice', 'images/foods/Teriyaki-Shrimp-Stir-Fry-with-Rice.png', 400, 'no', 'lunch');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Pork Salisbury Steak and Mash', 'images/foods/Pork-Salisbury-Steak-and-Mash.png', 650, 'no', 'lunch');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Hummus Falafel with Rice', 'images/foods/Hummus-Falafel-with-Rice.png', 450, 'yes', 'lunch');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Black Beans with Fried Eggs and Rice', 'images/foods/Black-Beans-with-Fried-Eggs-and-Rice.png', 650, 'yes', 'lunch');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Ricotta and Squash Flatbreads', 'images/foods/Ricotta-and-Squash-Flatbreads.png', 830, 'yes', 'lunch');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Salmon and Shrimp with Garlicky Roasted Potatoes', 'images/foods/Salmon-and-Shrimp-with-Garlicky-Roasted-Potatoes.png', 1000, 'no', 'lunch');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Parmesan Pork Chops with Sweet Potato Mash', 'images/foods/Parmesan-Pork-Chops-with-Sweet-Potato-Mash.png', 450, 'no', 'lunch');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Turkey Burger and Roasted Sweet Potatoes', 'images/foods/Turkey-Burger-and-Roasted-Sweet-Potatoes.png', 900, 'no', 'lunch');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Mexican-Style Bean Bowls with Guacamole', 'images/foods/Mexican-Style-Bean-Bowls-with-Guacamole.png', 400, 'yes', 'breakfast');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('One-Pot Garlicky Shrimp and Broccoli', 'images/foods/One-Pot-Garlicky-Shrimp-and-Broccoli.jpeg', 214, 'no', 'breakfast');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Skillet Lemon Chicken and Potatoes with Kale', 'images/foods/Skillet-Lemon-Chicken-and-Potatoes-with-Kale.jpeg', 374, 'no', 'breakfast');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Baked Lemon-Pepper Chicken', 'images/foods/Baked-Lemon-Pepper-Chicken.jpeg', 286, 'no', 'breakfast');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Garlic Butter-Roasted Salmon with Potatoes', 'images/foods/Garlic-Butter-Roasted-Salmon-with-Potatoes.jpeg', 522, 'no', 'breakfast');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Salmon Rice Bowl', 'images/foods/Salmon-Rice-Bowl.jpeg', 481, 'no', 'breakfast');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Avocado-Egg Toast', 'images/foods/Avocado-Egg-Toast.jpeg', 271, 'yes', 'breakfast');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Strawberry-Pineapple Smoothie', 'images/foods/Strawberry-Pineapple-Smoothie.jpeg', 255, 'yes', 'breakfast');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Peanut Butter and Berries Waffle Sandwich', 'images/foods/Peanut-Butter-and-Berries-Waffle-Sandwich.jpeg', 209, 'yes', 'breakfast');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Peanut Butter-Banana English Muffin', 'images/foods/Peanut-Butter-Banana-English-Muffin.jpeg', 344, 'yes', 'breakfast');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Quick-Cooking Oats', 'images/foods/Quick-Cooking-Oats.jpeg', 150, 'yes', 'breakfast');
INSERT INTO food (food_name, food_image_path, food_calories, vegi_or_not, type) VALUES ('Chicken and Spinach Skillet Pasta with Lemon and Parmesan', 'images/foods/Chicken-and-Spinach-Skillet-Pasta-with-Lemon-and-Parmesan.jpeg', 335, 'no', 'breakfast');

INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Pancake with Honey', 'images/foods/Pancake-with-Honey.png', 350, 'yes', 'breakfast');
INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Bagel with Butter', 'images/foods/Bagel-with-Butter.png', 320, 'yes', 'breakfast');
INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Cornbread', 'images/foods/Cornbread.png', 275, 'yes', 'breakfast');
INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Boiled Noodles', 'images/foods/Boiled-Noodles.png', 150, 'yes', 'breakfast');
INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Sausage', 'images/foods/Sausage.png', 175, 'no', 'breakfast');

INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Egg Sandwich', 'images/foods/Egg-Sandwich.png', 360, 'yes', 'breakfast');
INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Pumpkin Porridge', 'images/foods/Pumpkin-Porridge.png', 105, 'yes', 'breakfast');
INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Seafood Soup', 'images/foods/Seafood-Soup.png', 340, 'no', 'breakfast');
INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Dumplings', 'images/foods/Dumplings.png', 410, 'yes', 'breakfast');
INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Steamed Bun', 'images/foods/Steamed-Bun.png', 230, 'yes', 'breakfast');

INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Bread Baked Chicken', 'images/foods/Bread-Baked-Chicken.png', 920, 'no', 'dinner');
INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Pork Salad', 'images/foods/Pork-Salad.png', 600, 'no', 'dinner');
INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Stir-fried Vegetables', 'images/foods/Stir-fried-Vegetables.png', 505, 'yes', 'dinner');
INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Honey Garlic Ribs', 'images/foods/Honey-Garlic-Ribs.png', 950, 'no', 'dinner');
INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Beef Taco', 'images/foods/Beef-Taco.png', 800, 'no', 'dinner');

INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Greek Shrimp', 'images/foods/Greek-Shrimp.png', 610, 'no', 'dinner');
INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Steak with Sauce', 'images/foods/Steak-with-Sauce.png', 910, 'no', 'dinner');
INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Mashed Potatoes', 'images/foods/Mashed-Potatoes.png', 520, 'yes' 'dinner');
INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('Cauliflower', 'images/foods/Cauliflower.png', 660, 'yes', 'dinner');
INSERT INTO food (food_name,food_image_path,food_calories,vegi_or_not,type) VALUES ('French fries', 'images/foods/French-fries.png', 550, 'yes', 'dinner');

INSERT INTO allergens (allergen_name) VALUES ('milk');
INSERT INTO allergens (allergen_name) VALUES ('wheat');
INSERT INTO allergens (allergen_name) VALUES ('seafood');

INSERT INTO food_allergens (food_id, allergen_id) VALUES (1, 1);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (2, 2);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (3, );
INSERT INTO food_allergens (food_id, allergen_id) VALUES (4, );
INSERT INTO food_allergens (food_id, allergen_id) VALUES (5, );

INSERT INTO food_allergens (food_id, allergen_id) VALUES (6, 2);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (7, );
INSERT INTO food_allergens (food_id, allergen_id) VALUES (8, 3);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (9, );
INSERT INTO food_allergens (food_id, allergen_id) VALUES (10, 2);

INSERT INTO food_allergens (food_id, allergen_id) VALUES (11, 1);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (12, 1);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (13, );
INSERT INTO food_allergens (food_id, allergen_id) VALUES (14, );
INSERT INTO food_allergens (food_id, allergen_id) VALUES (15, );

INSERT INTO food_allergens (food_id, allergen_id) VALUES (16, 1);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (17, );
INSERT INTO food_allergens (food_id, allergen_id) VALUES (18, );
INSERT INTO food_allergens (food_id, allergen_id) VALUES (19, );
INSERT INTO food_allergens (food_id, allergen_id) VALUES (20, );

INSERT INTO food_allergens (food_id, allergen_id) VALUES (21, 2);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (22, );
INSERT INTO food_allergens (food_id, allergen_id) VALUES (23, 2);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (24, 1);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (25, 2);

INSERT INTO food_allergens (food_id, allergen_id) VALUES (26, 2);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (27, 2);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (28, 2);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (29, 1);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (30, 3);

INSERT INTO food_allergens (food_id, allergen_id) VALUES (31, );
INSERT INTO food_allergens (food_id, allergen_id) VALUES (32, 2);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (33, );
INSERT INTO food_allergens (food_id, allergen_id) VALUES (34, 3);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (35, );

INSERT INTO food_allergens (food_id, allergen_id) VALUES (36, );
INSERT INTO food_allergens (food_id, allergen_id) VALUES (37, 3);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (38, 3);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (39, 2);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (40, );

INSERT INTO food_allergens (food_id, allergen_id) VALUES (41, 2);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (42, 2);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (43, 2);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (44, 1);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (1, 2);

INSERT INTO food_allergens (food_id, allergen_id) VALUES (11, 2);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (16, 3);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (24, 2);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (25, 3);
INSERT INTO food_allergens (food_id, allergen_id) VALUES (29, 2);

