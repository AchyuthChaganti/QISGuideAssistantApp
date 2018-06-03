# Dialogflow: Webhook Template using Node.js and Cloud Functions for Firebase

## Setup Instructions

### Steps
1. Deploy the fulfillment webhook provided in the functions folder using [Google Cloud Functions for Firebase](https://firebase.google.com/docs/functions/):
   1. Follow the instructions to [set up and initialize Firebase SDK for Cloud Functions](https://firebase.google.com/docs/functions/get-started#set_up_and_initialize_functions_sdk). Make sure to select the project that you have previously generated in the Actions on Google Console and to reply `N` when asked to overwrite existing files by the Firebase CLI.
   2. Navigate to the <code>firebase/functions</code> directory and run <code>npm install</code>.
   3. Run `firebase deploy --only functions` and take note of the endpoint where the fulfillment webhook has been published. It should look like `Function URL (yourAction): https://${REGION}-${PROJECT}.cloudfunctions.net/yourAction`
2. Go to the Dialogflow console and select *Fulfillment* from the left navigation menu.
3. Enable *Webhook*, set the value of *URL* to the `Function URL` from the previous step, then click *Save*.
4. Select *Intents* from the left navigation menu. Select the `Default Welcome Intent` intent, scroll down to the end of the page and click *Fulfillment*, check *Use webhook* and then click *Save*. This will allow you to have the welcome intent be a basic webhook intent to test.
5. Build out your agent and business logic by adding function handlers for Dialogflow actions.
6. Enable *Auto-preview changes* and Click *Test*. This will open the Actions on Google simulator
7. Type `Talk to QIS Guide` in the simulator, or say `OK Google, talk to QIS Guide` to any Actions on Google enabled device signed into your developer account.

For more detailed information on deployment, see the [documentation](https://developers.google.com/actions/dialogflow/deploy-fulfillment).
## References and How to report bugs
* Actions on Google documentation: [https://developers.google.com/actions/](https://developers.google.com/actions/).
* If you find any issues, please open a bug here on GitHub.
* Questions are answered on [StackOverflow](https://stackoverflow.com/questions/tagged/actions-on-google).

## License
See [LICENSE](LICENSE).

## Google+
Actions on Google Developers Community on Google+ [https://g.co/actionsdev](https://g.co/actionsdev).
