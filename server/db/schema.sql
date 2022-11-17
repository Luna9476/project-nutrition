DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS allergens;
DROP TABLE IF EXISTS user_allergens;
DROP TABLE IF EXISTS food;
DROP TABLE IF EXISTS food_allergens;

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

CREATE TABLE "allergens" (
	"id"	INTEGER,
	"allergen_name"	TEXT,
	PRIMARY KEY("id")
);

CREATE TABLE "user_allergens" (
	"id"	INTEGER,
	"user_id"	INTEGER,
	"allergen_id"	INTEGER,
	PRIMARY KEY("id")
);

CREATE TABLE "food" (
	"food_id"	INTEGER,
	"food_name"	TEXT,
	PRIMARY KEY("food_id")
);

CREATE TABLE "food_allergens" (
	"id"	INTEGER,
	"food_id"	INTEGER,
	"allergen_id"	INTEGER,
	PRIMARY KEY("id")
);