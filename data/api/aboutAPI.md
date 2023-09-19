# What's an API is?
```
An API is a way and only way to access *(global data) that stored on somewhere
And its data(code) itself to describle how to access the data. 
*global data: Which means its avaliable for all components, its not component level data, like states or something.
```

# How do I define an API?
```
Use lisp syntax string to do that.
For example which retrive from local storage.
type SystemAPI = {
    (get-from-local app-language {}): {
        req: {
        },
        res: {
            language: "en" | "cn"
        }
    }
}
```

## How do I define a ResetAPI?
```
Use the symbol below: 
 "Rest/get" 
 "Rest/post"
 "Rest/put"
 "Rest/delete"
 "Rest/patch"
 
For example: 
(Rest/get /users/:id {:id id} (get user)): {
    req: {
       id: number 
    },
    res: {
        nickName: string,
        age: number,
        birthDate: Date
    }
}
You may treat the elements inside the () is an array list.

The first element is a symbol to tell us in which method to send the http request.

The second element is the url formatting information about the http requets.

The thrid element is a map data strucutre that defines the mappings between the request data and the url formatting
based on the keywords in the url and the key names in the data request.
If you send the request data with {id: 234} it will be reduced to (Rest/get /users/234) for the definition: /users/:id {:id id}

The fourth is a description for the api
```
### (Rest/get url urlAndRequestDataMappings (comments))
```
This is for the http get request.
But for React-Navite with Typescript, its not too much clear, The developr have to know
which data should I sent ?
Which data that I will get??
To fixs that, you should defined a get http request in ts file in below format:

export type UserAPI = { 
    //Use a map data structure to define the mappings between http request format and the data sent by the caller.
    "(Rest/get /users/:id {:id id} (get the information of the user.))": {
        req: {
           id: number
        },
        res: {
           nickName: string,
           username: string
        }
    }
    //selfMappings is a function that returns a map
    "(Rest/get /users/:id/posts?:postedDateGreaterThan&:deleted selfMappings (get the posts of the user conditionaly))": {
        req: {
            id: number,
            postedDateGreaterThan: Date,
            deleted: boolean
        },
        res: {
           id: number,
           title: string,
           content: string
        }
    }
}

You see there is a type after the api definition: {
   req: {}
   res: {}
} 

Its stands for the request data for the api and the response data of the api returns.
In this way when developrs calling an api its easy for them to know which api is calling right now 
and which data should I sent and what data its returns.

You may noticed there is a unnormal keyword "selfMappings" on the thrid element
which is used for mappings between the url format and the request data.
(Rest/get /users/:id/posts?:postedDateGreaterThan&:deleted selfMappings (get the posts of the user conditionaly))

The selfMappings means the request data will self mapping its value by its name to the same keyword in the request url.
In this case it will reduce to
(Rest/get /users/123/posts?postedDateGreaterThan=2023-10-01&deleted=true)
from the request data below: 
{
    id:123,
    postedDateGreaterThan:2023-10-01,
    deleted: true 
}
```

### (Rest/post url urlAndRequestDataMappings requestBodyAndRequestDataMappings (comment))
```
This is for the http post request.
The first element is a symbol for the http post request
The second one is the url 
The thrid one is the mappings between url-format and request data
The forth is the mappings is the mappings beetween the http post request body and the request data;
The fifth is the description of the API.

There are keywords for the urlAndRequestDataMappings and requestBodyAndRequestDataMappings to make the works easier.

urlAndRequestDataMappings: 
    selfMappings: It will self mapping the request data to the url-format based on the same key.
requestBodyAndRequestDataMappings: 
    asBody: It'll send the request data as body without any modification.

For example:
(Rest/post /users/:id/posts selfMappings asBody (add the post of the user)): {
    req: {
        id: 234,
        postTitle: string,
        postContent: string
    },
    res: {
        success: boolean,
        failedReason: string
    }
}
The selfMappings will take value of the id from the request data put it to the url
In above example it will be /users/234/posts

The asBody keyword will send the request data without any modification as body with http request,
In above example, it will send the body as below
{
        id: 234,
        postTitle: string,
        postContent: string
}

Or:
(Rest/post /users/:id/posts {:id id} {:postTitle postTitle :postContent postContent} (add the post of the user)): {
    req: {
        id: 234,
        postTitle: string,
        postContent: string
    },
    res: {
        success: boolean,
        failedReason: string
    }
}
In this case its means that you are specifiying the keywords by yourself.

What if in the url no formatting stuffs exists ? You may put an empty map for it, for example:
(Rest/post /users/tokens {} asBody (login)): {
    req: {
        username: string,
        pwd:string
    },
    res:{
        token: string | undefined
    }
}
```
### What about the rest of http method?
```
Its the same logic for rest of them.

For the thrid one in the rest api definition,
you may use keywrod 'selfMappings' to make it easier or mapping by yourself.

For the forth one in the rest api definition,
you may use keyword asBody to make it easier or mapping by yourself.

Here is the syntax for the rest of them.
(Rest/delete url urlAndRequestDataMappings requestBodyAndRequestDataMappings (comments))
(Rest/put url urlAndRequestDataMappings requestBodyAndRequestDataMappings (comments))
(Rest/patch url urlAndRequestDataMappings requestBodyAndRequestDataMappings (comments)) 
```


## What about local storage?
```
Its same logic with rest api but a little bit diffrent from rest api definition.
You may think of to access the local storage data like its using
A key of a big map data and with some filters.

(get-from-local key-of-the-storage): {
    req: {
        xxx-should-greater-than: number,
        xxx1-should-be-fully-matched-with: string
    },
    res: {
        data: Data[]
    }
}

(set-to-local key-of-the-storage): {
    req: {
        
    },
    res: {
        
    }
}
```
