#### CS5610 - Web Development Project 2

# Social
<img src="./assets/static/logo.png" width="400" height="200">


_Group Members:_ Megharth Lakhataria, Nikhil Nikhil, Prajakta Rodrigues, 
Sukhada Khatu

_URL of deployed app:_ https://social.megharth.site

_URL of GitHub repository:_ https://github.com/nikhilj13/social

Our application is properly deployed and working. All of the team members have 
contributed to pretty much all aspects and development of the project, 
including code and presentation.

**_What does your project 2 app do?_**

Social is a web based application that helps people connect with other like 
minded people based on the interests they share. Users can explore new 
meaningful friendships using our application by talking to people they match 
(share similar interests) with. Our application can help users find potential 
friends by recommending them other users in the area that share similar 
interests.

Users can view their friend’s profiles and instagram posts that are imported 
from their instagram accounts. Users can also chat with their friends and view 
their friends on a map. This can be especially helpful in cases when the users 
want to meet up and socialize.

**_How do users interact with your application? What can they accomplish by doing 
so?_**

Users can sign up for a new account and add some relevant information about 
themselves, including their interests and hobbies such as sports, music, movies 
etc. After the user has added this basic information about their interests, the 
application recommends them other users in the area that share the common 
interests. Once the user finds someone they would like to know more about, they 
can send them a friend request, and after this friend request is accepted, the 
two users can chat with each other further. They can also see each other’s 
profile and instagram posts (if available).

Users can search for their friends using the search bar in the website header. 
Users can also see their friends that are in the same area on a map by 
selecting the ‘Map’ option available under user options in the header. The 
friends are shown on the map with their profile pictures and clicking on the 
picture reveals their name.

**_For each project requirement, how does your app meet that requirement?_**

The server side logic of our application is built using Elixir/Phoenix. Social 
is significantly ambitious and has more features than any previous assignment. 
We have used multiple APIs for various features (Login with Facebook and 
getting user’s Instagram posts) and all of the information and logic for 
storing and accessing user information is implemented on the server-side. The 
application is deployed to the VPS of one of our team members 
(https://social.megharth.site). We have self-hosted pictures and other assets 
on the VPN using the webpack bundle.

Our application has user accounts and supports local password authentication 
along with an option to sign in and sign up using a user’s Facebook 
credentials. All of the users and relevant information about the users such as 
their friends, interests and connections, is stored in a Postgres database on 
the server. Our application also uses an external API for logging in with 
Facebook that requires authentication of our application. Our application also 
allows users to connect their account with instagram so they can add their 
instagram posts to their profile. We have used the instagram API for this 
purpose, once the user authorizes our application to access their instagram 
account data then the server receives an access token that is used to get 
user’s instagram posts. This is all done on the server and once the server gets 
the user’s posts from instagram they are saved in the postgres database and 
shown on the user’s profile.

**_What’s the complex part of your app? How did you design that component and 
why?_**

Recommending friends for a user is an important part of our application as we 
want users to consider our application as a way of connecting with people who 
they share similar interests and can connect with. This involves matching users 
with other users having similar interests, who have similar taste in music, 
movies, etc. Also, these users have to be in nearby locations as the user 
otherwise it would not be feasible for the user. Considering all this we have 
built our friend recommendation component which uses the information from 
profile data filled in by the user(interest, movies you like, music you like) 
with the addition of the user location to provide him list of users which are 
similar. We are using basic pattern matching to find users with maximum matches 
with given users. This can be further extended to include techniques like 
cosine similarity. User can also know about the popular interests so that he 
can choose to add them to his profile. The following steps are followed while 
matching users:

- Using user’s location and finding other users in the same zone(+-0.5 
longitude/latitude).
- Using user’s generic interests and finding other users with maximum common 
interests.
- Using user’s movie choices and finding other users with maximum common movies 
choices.
- Using user’ music choices and finding other users with maximum common music 
choices.
- Merging results from all above to present a list of recommended users.

**_What additional features did you implement?_**

We implemented three additional features besides the project requirements. We 
have used Phoenix Channels to push real-time updates to users that are 
triggered by actions of other users. One example of this feature is whenever a 
user sends another user a friend request, they receive a notification that they 
have received a new friend request. Similarly, when a user sends a chat message 
to another user, they receive a notification about the new message.

We have built our application almost entirely as a Single Page Application with 
Redux and React-Router. We have also used the HTML5 geolocation API to show the 
friends that are close to a user’s location.

**_What interesting stuff does your app include beyond the project requirements?_**

We created a map for the users to see all of their friends on a map. Users can 
see their friends on a map with their profile pictures as location pointers. 
Clicking on the location pointers shows the name for that user. It can be 
helpful when the users want to meet up with their friends and socialize. 
This makes use of Mapbox API

We also added the option to connect user profiles with instagram accounts, so 
users can import their instagram posts to their profile. This feature allows 
users to see other user’s instagram posts when they visit their profile. 
Instagram is one of the most popular social media platforms, and having the 
ability to import instagram posts can help users accurately represent their 
interests and hobbies. Instagram API requires app to redirect to their website.
But in order to maintain SPA status, we made a popup auth window which connects
to currently logged in user's channel and on receiving the auth token from the
Instagram API's server, it will push that code through the channel to the server.
The server will make use of that token to get the user's posts. Once the server
receives the data, it will store that data in the Postgres database and then 
that data is sent to the user. We have used genserver to broadcast this data to
the user so that data can be passed to user as an update. As the request is being
made from the different session and we had to pass the data to the current session,
genserver seemed to be suitable option.

Another interesting feature that we have added is the option to log in with 
Facebook, this feature helps users bypass the conventional sign up and sign in 
process and lets them sign in directly with their Facebook account credentials, 
which are verified by Facebook. Also, if a user does not have account in our website,
then they will be allowed to signup using the facebook option too. Once they signup,
they need to fill only the necessary details that are required to complete their
profile.

**_What was the most significant challenge you encountered and how did you solve 
it?_**

Managing multiple channels for chat was the most significant challenge that we
encountered. Because the channel cannot be stored in the state, we had to 
connect to the chat channel everytime the chat componenent was revisited. 
Messages from various users can be sent to one user and one user can send 
messages to multiple users, so managing the channels properly was a challenging
and time consuming task. Due to channel switching, and component not being 
present on the screen all the time, the connection to socket gets lost and thus 
the user cannot receive the message so that was handled with the help of 
notifications channel. 
