# Virtual Vending Machine
 A virtual vending machine implementation built with Python (Django Rest Framework) and React. The frontend and API are deployed with [Vercel](https://vercel.com) and [PythonAnywhere](https://www.pythonanywhere.com), respectively.

## How To Use/Interact
 This project is deployed and hosted online at https://colaco.vercel.app/. The API is deployed and hosted at https://dbaack.pythonanywhere.com/sodas. (This is the most convenient way to observe and use this application.)
 
 ### Running Locally
  If you want to clone this repo and run it locally, there is a 'requirements.txt' which includes all the necessary packages.
  Instructions:
 - Confirm you are in the most parent folder 'VirtualVendingMachine' and activate the virtual environment with ```. .venv/bin/activate```
 - Then ```cd virtual_vending_machine-project``` 
 - Followed by running the requirements.txt file with ```pip install -r requirements.txt```
 - If successful, start the API with ```python3 manage.py runserver```
 - Open a new terminal tab and navigate to 'virtual_vending_machine-project/frontend' and run ```npm start```
 - You will then need to swap out three separate API fetch URLs:
     - App.js: swap ```https://dbaack.pythonanywhere.com/sodas``` with ```http://localhost:8000/sodas```
     - Soda.js, line 19: swap ```https://dbaack.pythonanywhere.com/sodas/${soda.name}``` with ```http://localhost:8000/sodas/${soda.name}```
     - Soda.js, line 84: swap ```https://dbaack.pythonanywhere.com/sodas/${soda.name}``` with ```http://localhost:8000/sodas/${soda.name}```
 - The application should then be properly running locally at ```http://localhost:3000```

## Mock Situtation
 The company ColaCo has requested a virtual vending machine to be built for their new line of virtual sodas. Each soda has a unique cost and available quantity. The team has requested the ability to easily change any product information.
 
## Functionalities
 ### Users
  - The user is greeted with an interface displaying the current stock of virtual sodas with various information including their name, description, price, and available quantity. Also displayed is the user's current balance with a button to replenish the amount and various links that allow the user to navigate to the API, GitHub, or Admin Login page.
  - The user's balance is set to $4.00 by default and can be replenished when funds are insufficient.
  - The user is able to select any soda for purchase, after confirming the soda's cost and what their new balance will be, and receive a downloaded JSON file representing their purchased soda.

 ### Admin
  - Any individual with admin access can use the 'Admin Login' button to navigate to the admin access panel. (Requires username/password login)
  - Through the admin access panel, the individual is able to edit any information of the existing items, add new items, or completely delete any existing items.
  - Once logged in, click on 'Sodas' under 'Virtual_Vending_Machine' to access the list of Sodas and edit any information, create new items, or delete any existing items.

## API Routes
  - '[admin](https://dbaack.pythonanywhere.com/admin)' route returns the admin access panel, which is protected by a username/password login.
  - '[sodas](https://dbaack.pythonanywhere.com/sodas)' route returns the list of all existing Soda objects
  - '[sodas/{soda_name}](https://dbaack.pythonanywhere.com/sodas/Fizz)' route returns the JSON for the specific Soda object. (Fizz in example)
