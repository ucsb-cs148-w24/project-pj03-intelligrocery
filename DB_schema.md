# Ideas for DynamoDB schema
- Idea one: all in one
- Idea two: Have user primary key with recipe id in new table, recipe table then has recipe id for user and sort key for which recipe
- Question is: do we want some recipe order, date added?

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
	

Idea 2:


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
