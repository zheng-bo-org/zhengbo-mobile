# What's an API is?
```
An API is a way and only way to access *(global data) that stored on somewhere
And its data(code) itself to describle how to access the data. 
*global data: Which means its avaliable for all components, its not component level data, like states or something.
```

# How do I define an API
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

## How do I define an ResetAPI.
```
Rest API use use the keyboards:
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
You can treat the the elements inside the () is an array list.
The first element is a symbol to tell us in which method to send the http request.
The second element is the url format information about the http requets.
The thrid element is a map data strucutre that defines the relation between the request data and the url.
The fourth is a description for the api.

For above example, its a get request and the path of the request is /users/:id, the :id means it should be treated an value.
And the thrid element means how to resolve the request path its a mappings between the /users/:id and the request data {id: number}
If you send the request data with {id: 234} it will be reduced to (Rest/get /users/234)
And for the thrid element there are some utils keybaords exists for make the process of mapping easier.
```
### (Rest/get url urlAndRequestDataMappings (comments))
```
This is for the http get request. For lisp its enghout to make eval it and send an http request.
But for React-Navite with Typescript, its not too much clear, The developr have to know which data should I sent ? Which data that I will get??
For resolve two things above, you should defined a get http request in ts file like below:

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
and which data should I sent and What Data its returns.

You may noticed there is a unnormal keyword "selfMappings" on the thrid element which is the mappings between the url format and the request data.
(Rest/get /users/:id/posts?:postedDateGreaterThan&:deleted selfMappings (get the posts of the user conditionaly))

The selfMappings is nothing but the request data will self mapping its value by its name to the same keyword in the request url.
In this case its will reduce to (Rest/get /users/123/posts?postedDateGreaterThan=2023-10-01&deleted=true) from the request data below: 
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
The second one is a the url 
The thrid one is the mappings between url-format and request data
The forth is the mappings for the http post body data and the request data;
The fifth is the description of the API.

The there are keywords for the urlAndRequestDataMappings and requestBodyAndRequestDataMappings for make it easier.
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
The selfMappings will take value of the id from the request data put it to the url, above example it will be /users/234/posts
The asBody keyword will send the request data without any modification as body with http request, in above example, it will send the body as 
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

What if in the url no format stuffs exists ? You just put an empty map for it, for example:
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
For the thrid one in the rest api definition you can use keywrod 'selfMappings' to make it easier or mapping by yourself.
For the forth one in the rest api definition, you can use keyword asBody to make it easier or mapping by yourself.

Here is the syntax for the rest of them.
(Rest/delete url urlAndRequestDataMappings requestBodyAndRequestDataMappings (comments))
(Rest/put url urlAndRequestDataMappings requestBodyAndRequestDataMappings (comments))
(Rest/patch url urlAndRequestDataMappings requestBodyAndRequestDataMappings (comments)) 
```


## What about local storage?
```
Its same logic with rest api but a little bit diffrent from rest api definition.
You may think of to access the local storage data like its using the a key of a big map data and with some filters.
(get-from-local key-of-the-storage): {
    req: {
        
    },
    res: {
        
    }
}

(set-to-local key-of-the-storage): {
    req: {
        
    },
    res: {
        
    }
}
```