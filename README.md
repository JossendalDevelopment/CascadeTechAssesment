# Technical Assessment
USAGE: `node server.js`
## Approach
To create a user friendly end user api interface with at least somewhat configurable parameters

## Problem Solved
Lets assume Cascade Fintech has contracted you to build a small **RESTful API** to support their new user tracking software. 

Data does not need to be persisted between server restarts. 

## Data definition

### Endpoints
- METHOD POST '/user'
  - payload - JSON
    - email - string - required - unique
    - password - string - required
    - phone_number - number - required - format ##########
  - returns 200 'success'
### Event
- type
  - This field is required to create a new event
  - The value can be any non-empty string
 
## Data examples

The following input json would create a user
```json
{
  "email": "tester@cascadefintech.com",
  "password": "VegansRule",
  "phone": "3332221111"
}
```
___
The following input json would create an event with the type LOGIN
```json
{
  "type": "LOGIN"
}
```
___

The following use cases should be satisfied to get user event data
- return all failed login events for all users
- return all login events for a single user
- return all events for the day before last 
- return all events for the week before not including session timeout

The json data returned should at least have the following elements
```json
[
  {
    "type": "LOGIN",
    "created: 47239847298347
  }
]
```
where `created` is the date the event was created.  Choose the format that works best. 
___

## Submission
Choose one of the following
- Come back to this repository and submit a pull request of your solution.
