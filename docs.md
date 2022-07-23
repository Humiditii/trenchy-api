## Docs for the trenchy-api

# *     Endpoints :->
*   ## Auth
1. /auth/signup: POST 
* * Body: Object: 
    ```
        {
            name:'tade',
            email:'tade@da.in',
            password:'qwerq',
            confirmPwd: 'qwerq'
        }

    ```

2.  /auth/signin: POST 
* * Body: Object: 
    ```
        {
            email:'tade@da.in',
            password:'qwerq'
        }

    ```

3.  /auth/profile: GET 
* * Header: Authorization: ``` `Bearer +${token}` ```

\n

*   # Post

1. /post/write: POST 
* * Body: Object: 
    ```
        {
            post:'i want to dig a trench!'
        }

    ```
* * Header: Authorization: ``` `Bearer +${token}` ```

2.  /post/edit/:postId': PATCH 
* * Body: Object: 
    ```
        {
            post:'i want to dig a trench very big!'
        }
    ```
* * Header: Authorization: ``` `Bearer +${token}` ```

3.  /post/posts: GET 
* * Header: Authorization: ``` `Bearer +${token}` ```

4.  /post/delete/:postId: DELETE 
* * Header: Authorization: ``` `Bearer +${token}` ```


\n

*   # Comment

1. /comment/comments/:postId: GET 
* * Header: Authorization: ``` `Bearer +${token}` ```

2.  /comment//write/:postId': POST 
* * Body: Object: 
    ```
        {
            comment:'together we dig!',
            image: 'comrade.png' File
        }
    ```
* * Header: Authorization: ``` `Bearer +${token}` ```

3.  /comment/edit/:commentId: PATCH 
* * Body: Object: 
    ```
        {
            comment:'together we dig!'
        }
* * Header: Authorization: ``` `Bearer +${token}` ```

4.  /comment/delete/:commentId: DELETE 
* * Header: Authorization: ``` `Bearer +${token}` ```