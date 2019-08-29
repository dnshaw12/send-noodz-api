# send-noodz-api

## Models

### User
1. Name
	* String
2. Email 
	* String
3. Phone Number
	* String
4. Address
	* String (mulitple fields)
5. Profile Pic
	* File

### Order
0. User Id

1. Dishes
	* Array of Dish Subdocuments
2. Status
	* String
3. DeliveryInstructions
	* String
4. Address 
	* String (mulitple fields)


### OrderedDish -- when someone actually orders something 
1. Menu Item Id
3. Extra Ingredients -- cost money
	* Array of Ingredient ID
2. SpecialInstructions
	* String


## MenuItem -- what you can order
0. Name -- Build your own
1. NoodleType
	* Ingredient ID
2.	Protein
	* Ingredient ID
3. Base Ingredients 
5. BasePrice
	* Number


### Ingredient
1. Name
	* String
2. Type - Enum
	* String (protein, noodle, general etc.)
3. Vegetarian
	* Boolean
4. Vegan
	* Boolean
5. Price
	* Float (certain ingredients cost more)
6. Image
	* File (multer)
7. inStock
	* Boolean
8. archived
	* Boolean









