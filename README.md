[![Codeship Status for dovakeen118/grocery-list](https://app.codeship.com/projects/f918eb20-8abc-0137-fe48-4a2b1c33cef4/status?branch=master)](https://app.codeship.com/projects/354863)

## Overview

Cart Curator is a grocery list application to help users be more mindful about their decisions at the grocery store. Once a user has created an account, they can save grocery lists in the app for different stores. When adding an item, a category selection is required. First, items are displayed by category so the user can visualize their food choices - accompanied by a pie chart from Google Charts API. Items can optionally save information about quantity to purchase and aisle location. Once the user has finished adding their items, they can switch to the shopping view. The shopping view is mobile browser friendly and sorts items based on aisle location. As they are shopping, users can check items off as they go.

Visit Cart Curator: https://cart-curator.herokuapp.com/

## Setup
```
Ruby version 2.4.5
Rails version 5.2.3
Bundler version 2.0.2
```

## Getting Started

After you fork, clone, or download the repo, execute the following commands to run the application locally:
```
bundle install
yarn install
```

To build the database:
```
rake db:create
rake db:migrate
```

Run the following commands in separate terminal windows:
```
rails s
yarn start
```
View the app in development locally at https://localhost:3000/

## In Progress

* Grocery item nutritional facts
* Kitchen and pantry databse for users
* Add contributors to your grocery lists
* Drag-and-drop aisles in the shopping view
