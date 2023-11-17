# Idears

A place to save your ideas and see other people's ideas.

React with firebase

## Development

This project uses `yarn` but `npm` should work just as well

### Install dependencies

`yarn`

You will also need the [firebase emulator suite](https://firebase.google.com/docs/emulator-suite) installed if you want to use local firebase emulators (recommended)

### Init firebase local emulators:

`yarn run emulators`

This script will export your firestore db and auth storage to `../exported` and will import it when initialized so your db and users are persisted

### Use local emulators:

Before running the app, uncomment the following lines in `firestore.js`:

```
connectFirestoreEmulator(db, 'localhost', 8080);
connectAuthEmulator(auth, 'http://localhost:9099');
```

This will cause the app to use the local emulators for reads and writes instead of the production server

### Run the app:

`yarn start`

Happy coding!

## Building and Deploying

### Build the app

`yarn run build`

This will build a new app bundle and save it to the `build` folder

### Deploy to outofinsight.com

`firebase deploy`

The deploy script is configured to upload the contents of the `build` folder to firebase storage where it will it be served at [outofinsight.com](https://www.outofinsight.com)
