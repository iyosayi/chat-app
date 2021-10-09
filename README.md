# Introduction
This is the API for the chat app. It has the functionalities listed below:

**Users** can: 

- Can signup / login
- Create channel
- Send messages in the channel
- Can see the messages in a channel
- Search for a channel

For sending messages in the channel, `Sockets` were implemented. These are the following events that are emitted and can be listened to.

## Socket events
- `channelCreated` - emitted when a channel is created.
- `joinRoom` - emitted when a user joins a channel.
- `userJoined` - emitted when a user has successfully joined a channel.
- `leaveRoom` - emitted when a user leaves a channel.
- `message` - emitted when a user sends a message.
- `chat` - emitted when users receives messages in a channel.

To test the socket events, we can use `Postman`, simply click on the `New` button and select `Websockets` and choose `SocketIO`, then input the link which is `wss://dabatech.herokuapp.com` and these requests can be made successfully. Unfortunately, these socket requests can't be saved in a collection on Postman. 

## API Docs
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/dc860d17f0894e44afc7?action=collection%2Fimport)
Tests are also run in Postman to test the API.

## How To Use

<!-- Example: -->

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/iyosayi/chat-app.git

# Install dependencies
$ yarn install

# Run the app
$ yarn dev
```
