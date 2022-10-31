# Exercises

## Exercises 9.1.-9.7 : [initial-steps](https://github.com/jokerinya/fsopen-part9/tree/main/initial-steps)

> ## Exercises 9.8.-9.9.

**Before you start the exercises**

For this set of exercises you will be developing a backend for an existing project called **Patientor**, which is a simple medical record application for doctors who handle diagnoses and basic health information of their patients.

The [frontend](https://github.com/fullstack-hy2020/patientor) has already been built by outsider experts and your task is to create a backend to support the existing code.

## 9.8: Patientor backend, step1

Initialise a new backend project that will work with the frontend. Configure eslint and tsconfig with the same configurations as proposed in the material. Define an endpoint that answers to HTTP GET requests to route **/api/ping**.

The project should be runnable with npm scripts, both in development mode and, as compiled code, in production mode.

## 9.9: Patientor backend, step2

Fork and clone the project [patientor](https://github.com/fullstack-hy2020/patientor). Start the project with the help of the README file.

You can run this command if you get error message when trying to start the frontend:

```bash
npm update chokidar
```

You should be able to use the frontend without a functioning backend.

Ensure that backend answers to the ping request that _frontend_ has made on startup. Check developer tool to make sure it really works:

![DevTools](./readmeimg/16a.png)

You might also want to have a look at the console tab. If something fails, [part 3](https://fullstackopen.com/en/part3) of the course shows how the problem can be solved.

> ## Exercises 9.10.-9.11.

Similarly to Ilari's flight service, we do not use a real database in our app but instead use hardcoded data that is in the files [diagnoses.json](https://github.com/fullstack-hy2020/misc/blob/master/diagnoses.json) and [patients.json](https://github.com/fullstack-hy2020/misc/blob/master/patients.json). Get the files and store those in a directory called data in your project. All data modification can be done in runtime memory, so during this part it is _not necessary to write to a file._

## 9.10: Patientor backend, step3

Create a type Diagnose and use it to create endpoint _/api/diagnoses_ for fetching all diagnoses with HTTP GET.

Structure your code properly by using meaningfully-named directories and files.

**Note** that diagnoses may or may not contain the field _latin_. You might want to use [optional properties](https://www.typescriptlang.org/docs/handbook/interfaces.html#optional-properties) in the type definition.

## 9.11: Patientor backend, step4

Create data type _Patient_ and set up the GET endpoint _/api/patients_ which returns all patients to the frontend, excluding field _ssn_. Use a [utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html) to make sure you are selecting and returning only the wanted fields.

In this exercise, you may assume that field _gender_ has type _string_.

Try the endpoint with your browser and ensure that _ssn_ is not included in the response:

![Ssn is not in the backend](./readmeimg/22g.png)

After creating the endpoint, ensure that the _frontend_ shows the list of patients:

![Frontend](./readmeimg/22h.png)

> ## Exercises 9.12.-9.13.

## 9.12: Patientor backend, step5

Create a POST endpoint _/api/patients_ for adding patients. Ensure that you can add patients also from the frontend. You can create unique ids of type string using the uuid library:

```js
import { v1 as uuid } from 'uuid';
const id = uuid();
```

## 9.13: Patientor backend, step6

Set up safe parsing, validation and type guards to the POST _/api/patients_ request.

Refactor the gender field to use an [enum type](https://www.typescriptlang.org/docs/handbook/enums.html).
