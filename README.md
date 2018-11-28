# Guidelines

## Use AWS Amplify for multiple environments and team workflows
- [Official documents] (https://aws-amplify.github.io/docs/cli/multienv?sdk=js)
- Use Amplify Console for managing deployemnt:
  - [Docs](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
  - [Console](https://console.aws.amazon.com/amplify)

## Steps to create team workflows
- Setup branches: Master (Prod), Test, Dev
- For each branch run ``` amplify init ``` and setup up the development environment for it (Profile and Name).
- Then each developer need to pull the project and init his local development environment.
- Any changes made should be first tested agianst Dev environment. Developer should make a PR on the dev branch.
- After testing Dev environment, we can merge changinmg with Test and Prod environments.
- AWS Amplify Console will be connected with our github repo so it can trigger new deployment whenever new changes got pushed to the repo.
- NEXT: Try to seperate backend and frontend projects and have different deplyment strategy for each.

## Change Cognito User Pool settings to allow user signup/login by email
- All Settings mentioned should be in ```amplify/backend/auth``` inside the colud formation YAML file and under ``` Resources => UserPool => Properties ```
- We can use the following settings to allow user to signup by username but still can login by email:
  - ``` 
    AliasAttributes:
        - email
    ```
- To change signup process to be based on email, we can use the following settings:
  - ``` 
    UsernameAttributes: [email]
    ```


