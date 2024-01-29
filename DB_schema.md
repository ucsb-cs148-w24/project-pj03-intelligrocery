# Ideas for DynamoDB schema
- Idea one: all in one
- Idea two: Have user primary key with recipe id in new table, recipe table then has recipe id for user and sort key for which recipe
- Idea three: Separate tables for user, recipes, grocery items, and pantry items (maybe best)

# Idea 1:  
Table: Users (primary key UserID)
<pre>
{
	UserID: Number, 
	UserName: String
	GroceryList: List of Strings
	Pantry: List of Strings
	Recipes: List of Recipe Maps
			[
{
Name: String
DateTimeAdded: String
Ingredients: List
			Steps: List
			Image: String (url to S3 bucket)
		}
	]
}
</pre>	

# Idea 2:

<pre>
Table: Users (primary key UserID)
Store user primary key:
{
	UserID: Number, 
	UserName: String
	GroceryList: List of Strings
	Pantry: List of Strings
	RecipesID: Number
}

Table: Recipes (primary key RecipeID, secondary key DateTimeAdded)
{
	RecipesID: Number
	DateTimeAdded: String
	Ingredients: List
	Steps: List
	Image: String (url to S3 bucket)
}
</pre>

# Idea 3
<pre>
Table: Users (primary key UserID)
Store user primary key:
{
	UserID: Number 
	UserName: String
	GroceryList: List of Strings
	Pantry: List of Strings
}

Table: Recipes (primary key UserID, secondary key RecipeID)
{
	UserID: Number
RecipesID: Number
	RecipeName: String
	DateTimeAdded: String
	Ingredients: List
	Steps: List
	Image: String (url to S3 bucket)
}

Table: GroceryItem (primary key UserID, secondary key GroceryID)
{
	UserID: Number
GroceryID: Number
	GroceryName: String
	Quantity: String
	DateTimeAdded: String
}

Table: PantryItem (primary key UserID, secondary key PantryID)
{
	UserID: Number
PantryID: Number
	PantryName: String
	Quantity: String
	DateTimeAdded: String
}
</pre>
