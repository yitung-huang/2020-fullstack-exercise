# RE: Uniti Full Stack Development Coding Challenge

## Introduction

In the end I've chosen to use Ruby on Rails so I don't lose time on learning the syntax for C#, I hope that is okay with you!

### Details
*  Ruby version 2.6.5
*  Frontend: React

### Setting up
To run the test project on your machine, please clone this repository and move into the `2020-fullstack-exercise` folder.

Run
```
bundle install
```
to install the Ruby Gems inside the `Gemfile`.

Next, run
```
rails db:migrate
```
to create the database required for the test project.

### Database

Sorry I didn't make a parser to parse `exercise.yaml`. You will have to add the entries by using the rails console:

```
rails console
User.create({username: "thomas", password: "banana"})
Customer.create({customer_id: "f312b57e-a655-4a35-b27f-416c464c3730", num_employees: 4, name: "Fancy Pants", tags: ["commercial", "clothing", "pants"]})

```

### Running the server
Congratulations! You're now ready to go!

Simply run
```
rails server
```
inside the `2020-fullstack-exercise` folder to start your server.


### Notes

Checklist on the things covered:
#### Authorisation
*  Authorizes usernames and passwords
*  ...return a JWT to authenticate against the customer endpoint: I have implemented JWT tokens but I'm not sure where to return it.
*  Added error message when credentials are invalid
*  Added error message when trying to access the customer list without being authorised

#### Displaying list of customers
*  Implemented based on given `ui.png` using React Bootstrap
*  Wasn't sure how many entries to display per page so I added a dropdown for the user to choose how many entries they want to see per page
*  Added labels in front of the tag and number of employees filter
