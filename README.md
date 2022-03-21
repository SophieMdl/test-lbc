# Context :

At leboncoin, our users can share messages about a transaction, or ask for informations about any products.

Your job is to create the interface to consult those messages.
The interface needs to work on both desktop & mobile devices.

In addition to your code, a README explaining your thought process and your choices would be appreciated.

# Exercice :

- Display a list of all the conversations
- Allow the user to select a conversation
  - Inside the conversation, there is a list of all the messages between these two users.
  - As a user, you can type and send new messages in this conversation

**As your application can be used by millions of users, make sure to provide some robust safety guards.**

### Sketches :

Obvisouly, it is up to you to make something nice and pretty, you are free to design it the way you like. The sketches are here to give you an idea on how it should look.

<details>
  <summary>Click to see the sketches</summary>
  
Mobile list :

![](./sketches/list-mobile.jpg)

Desktop list :

![](./sketches/list-desktop.jpg)

Mobile conversation :

![](./sketches/conv-mobile.jpg)

Desktop conversation :

![](./sketches/conv-desktop.jpg)

</details>

### API :

You can find the API swagger file in `docs/api-swagger.yaml`.

For a better readibility, you can view it on [https://leboncoin.tech/frontend-technical-test/](https://leboncoin.tech/frontend-technical-test/).

---

## Bonus 1 :

We provide some conversation samples, but can you improve the app so the user can now create new conversations ?

## Bonus 2 :

Our infrastructure is a bit shaky.. Sometimes the servers are crashing. “It’s not you, it’s me”, but maybe you can display something nice to warn the user and handle it gracefully.

## Do you want to make the app even better ?

Feel free to make as many improvements as you like.
We love creativity and technical challenges.

If you are out of ideas, here are some thoughts :

- As we want to reach our users anywhere, we need to make sure the app is performing well. What can you do to make it really fast ?

- Our goal is to support everybody in the country, including people with disabilities. As a good citizen and a good developer, can you make sure the app is accessible for everyone ?

- We all love to relax after a hard day’s work. It would be a shame if we didn’t feel confident enough about the upcoming automatic deployment. Are you sure everything has been tested thoroughly ?

## What I have done

- Css: I used Bulma to make UI prettier. I chose it for its lightness.
- For the api calls, I used react-query. React-query is very performant: it handles caching and allows to easily handle api state (load, error...). It also allows to access and change the data without using a global state. It's simpler and it's a good practice to avoid multiple sources of truth.
- What I could make to add security:
  1. Encrypt messages before sending them to the api.
  2. Made a verification to avoid spamming: do not allow sending too much messages for a short time
  3. Use `getServerSideProps` nextJS function to get data. It runs api request on the server side, before rendering the page on the browser. It's more secure and performant than requesting the api on client side. Unfortunately it's not compatible with react-query.
- I made some basic unitary tests with RTL and Jest for the conversationsList component, I would make deeper tests if I had more time
- I spent ~7 hours of work on this exercice

## Remarks

- The doc https://leboncoin.tech/frontend-technical-test/ does not seem up-to-date, I noticed post message route body is not exhaustive on the doc
- The delete message api route doesn't seem implemented
