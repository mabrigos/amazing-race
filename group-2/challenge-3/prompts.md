1. Can you check the whole code for the directory `/challenge-3/data-maze-files/, how it works and how the unit tests work.
2. Thank you for this.

This is the scenario.

Your company just acquired a small e-commerce startup. During the data migration, you receive a USB drive from their former CTO with a note:

*"Sorry about the mess. We had 3 different developers working on the API over 2 years, and... well, consistency wasn't our strong suit. The data's all there, just needs some love. Good luck! 😅*

*P.S. - At least our last dev believed in TDD (Test-Driven Development). Check the tests - they're solid and will tell you exactly what needs to work. Follow the tests, and you'll find your way out of the maze!"*

You open `orders.json` and your heart sinks. The data is completely inconsistent — different field names, multiple date formats, numbers stored as strings, missing values everywhere.

Your manager needs a clean, normalized dataset by end of day. The tests will tell you what the cleaned data should look like.

## 🎯 Your Mission
1. **Read the tests** - They tell you exactly what each function should do
2. **Implement the transform functions** - They're exported but empty!
3. **Make all tests pass** - Green means clean data
4. **Run the transformation** - Generate `orders_clean.json`

## 💡 Hints
- *"The previous developer loved TDD - the tests are your specification!"*
- *"Data never lies, but it sure can be cryptic. Look for patterns in the chaos."*
- *"How many ways can you spell 'customer'? Each order is a puzzle piece."*
- *"The tests are your map through the maze - follow them!"*

3. i ran the node transform.js but it didn't generate the orders_clean.json. where is it? and generate it.

4. The file does not generate, can you reconfigure the transform.js and make sure the orders_clean.json gets generated properly in the proper direcotry.

5. where does the orders_clean.json gets generated? rerun the script and make sure the files gets generated. Reconfigure if no files are generated and rerun the script

6. I have created the orders_clean.json can you update this with the actual data. I think its not creating because the code we have is write file