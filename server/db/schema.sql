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
	PRIMARY KEY("food_id")
)

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