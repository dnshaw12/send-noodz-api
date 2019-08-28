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

### Order
1. Dishes
	* Array of Dish IDs
2. Status
	* String
3. Complete
	* Boolean
4. DeliveryInstructions
	* String
5. Address 
	* String (mulitple fields)
6. Total
	* Float (total of dishes)

### Dish
1. NoodleType
	* Ingredient ID
2.	Protein
	* Ingredient ID
3. Ingredients
	* Array of Ingredient ID
4. SpecialInstructions
	* String
6. Total
	* Float

### Ingredient
1. Name
	* String
2. Type
	* String (protein, noodle, general etc.)
3. Vegitarian
	* Boolean
4. Vegan
	* Boolean
5. Price
	* Float (certain ingredients cost more)
6. Image
	* File (multer)









