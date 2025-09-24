This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

Before proceeding, make sure you have completed the [**React Native Environment Setup**](https://reactnative.dev/docs/set-up-your-environment).

# React Native Todo App

A simple Todo application built with React Native CLI.  
The app includes **Add, Update, Mark as Done/Undo, and Delete** functionalities.  
Tasks are saved with created date & time, secured with local authentication, and persisted using AsyncStorage.

---

## Features

- Add new tasks with title and timestamp
- Edit existing task labels inline
- Mark tasks as done or undo with one tap
- Delete tasks with confirmation popup
- Secure actions with Local Authentication
- Persistent storage with AsyncStorage

Note: Expo local authentication working is not recorded because of security feature supported by device.

---

## Demo Videos

- **Add Task** → [Watch Video](https://drive.google.com/file/d/1ZJgXTYR2TlLK-K1nd-ZdYYC23rLQ2ZwZ/view?usp=share_link)
- **Update Task** → [Watch Video](https://drive.google.com/file/d/1q9PpczeXX-8yfcbwZVhWWawka_wiTc1h/view?usp=share_link)
- **Mark as Done / Undo** → [Watch Video](https://drive.google.com/file/d/1n6EvmklGJe7K_F7SbWzZRXlmudbtSmDM/view?usp=sharing)
- **Delete Task** → [Watch Video](https://drive.google.com/file/d/1u_RWcS6-vvJ-Zi-VobAqtVKeyJjzc1cE/view?usp=share_link)

---

## Setup

1. Clone the repository

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Run on Android

   ```bash
   npm run android
   ```

4. Run on iOS
   ```bash
   npm run ios
   ```

---

## Download

Test the app directly on Android:  
[Download APK](https://your-android-apk-link)

---

## Tech Stack

- React Native CLI
- TypeScript
- AsyncStorage for local persistence
- Expo Local Authentication

---

## License

This project is licensed under the [MIT License](LICENSE).
