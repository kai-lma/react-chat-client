## Part 1: Requirement Breakdown

1. Create user with a name
2. Log user in with a name
3. Get list of users in the chatroom
4. Get history messages from the chatroom
5. Receive message sent by the user
6. Broadcast received message to other users in the chatroom

## Part 2: Document

### Setup and run

1. `git clone`
2. `yarn install`
3. `cp .env.example .env`
4. `yarn build`
5. `yarn global add serve`
6. `serve -s build`

Make sure you have `node` and `yarn` on your machine.

### Why Websocket

- UX first: Realtime chat (not refresh to receive new messages)
- Scaling (typing / sent / read states, quick delete, message reactions...)

### Why Redux Observable and RxJS

- Functional Reactive Programming, declaretive
- Fit for socket (show doc)
- Easy to create mock for debug and test (Subject, DI, Marbles)
- Scalable (built-in operators)
- Trade off: steep learning curve

### Socket Server and Mocking

- Flows
- isMyMessage
- Scheme
- Socket event and Redux action

### Other notes

- Why not using static type check (Flow or Typescript)
- React List view (well tested library)
- Bundles setting
- Including animations (info, on touch message)

## Part 3: Think Ahead

### Security

- Using wss
- Validate input
- CORS
- Authenticate before connect to socket
- Rate limiting (debounce)

### Quality

- Buffer to reduce event back-pressure on redux and render UI

### Failure tolerant

- Retry when disconnect
- Display proper error messages
