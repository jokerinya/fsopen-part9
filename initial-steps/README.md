# Exercises

## Exercises 9.1.-9.3.

**setup**

Exercises 9.1.-9.7. will all be made in the same node project. Create the project in an empty directory with _npm init_ and install the _ts-node_ and _typescript_ packages. Also create the file _tsconfig.json_ in the directory with the following content:

```json
{
    "compilerOptions": {
        "noImplicitAny": true
    }
}
```

The compiler option [noImplicitAny](https://www.typescriptlang.org/tsconfig#noImplicitAny), that makes it mandatory to have types for all variables used, is actually currently a default, but let us still define it explicitly.

## 9.1 Body mass index

Create the code of this exercise in file bmiCalculator.ts.

Write a function calculateBmi that calculates a [first](https://en.wikipedia.org/wiki/Body_mass_index) based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.

Call the function in the same file with hard-coded parameters and print out the result. The code

```js
console.log(calculateBmi(180, 74));
```

should print the following message:

```js
Normal (healthy weight)
```

Create a npm script for running the program with command `npm run calculateBmi`.
