# Questio

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Architecture
Features of the application: Login page and questions repository
The login page is implemented in the app module.
Questions feature is a module and is lazy loaded. It has multiple components for searching, showing question details, and displaying all the questions.
Authentication is provided by services and inner routes are protected.

## Libraries used
1. Bootstrap - For grid
2. Angular material - For the material components

## What could have been improved
1. Accessibility
2. UI design