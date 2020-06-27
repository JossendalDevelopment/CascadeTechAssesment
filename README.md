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

- METHOD POST '/event'
  - payload
    - type - string - required
    - identifier - string  -- user email being used in this case
  - return 200 'success'

- METHOD GET '/user'
  - returns all users
  ```json
  [{
    "email": "tester@cascadefintech.com",
    "password": "VegansRule",
    "phone": 3332221111,
    "created": 87162938746
  }]
  ```

- METHOD GET '/event'
  - return all events
  ```json
  [{
    "type": "LOGIN",
    "created": 12376198273,
    "identifier": <USER_EMAIL>
  }]
  ```

- METHOD GET '/event?identifier=<USER_EMAIL>'
  - return all events matching identifier
  ```json
  [{
    "type": "LOGIN",
    "created": 12376198273,
    "identifier": <USER_EMAIL>
  }]
  ```

- METHOD GET '/event?daybeforelast=true'
  - return all events occuring the day before last
  ```json
  [{
    "type": "FAILED",
    "created": 12366698273,
    "identifier": <USER_EMAIL>
  }]
  ```

- METHOD GET '/event?weeks=1'
  - return all events going back a given number of weeks
  - excludes results with a type of 'SESSION_TIMEOUT'
  ```json
  [{
    "type": "FAILED",
    "created": 12366698273,
    "identifier": <USER_EMAIL>
  }]
  ```

- METHOD GET '/event?type=TYPE'
  - return all events matching given TYPE
  ```json
  [{
    "type": "SESSION_TIMEOUT",
    "created": 12366698273,
    "identifier": <USER_EMAIL>
  }]
  ```
 