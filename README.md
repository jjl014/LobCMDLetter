# LobCMDLetter
Command Line Program that sends a letter to your Legislator

## Running the App
Within the app directory, type in:

* `npm install`
* `node index`

## Challenge Overview
* Use Lob's API to send the letter
* Use HTML to create the letter
* Surface errors from Lob or Google Civic Info API
* Use Google Civic Info API to gather info on Legislators given an address
* Output must be a link to a pdf of the letter or error on bad input

## Functionality
* Command line prompts user for name and address
* Uses the input address to find information on officials using Google Civic Info API
* Gives user a list of officials to choose from to send a letter to
* Prompts user for a message to send to the official
* Letter is created and sent through Lob's API

## Tools
* JavaScript
* Inquirer
* node-fetch
* lob

## Notes

### Design
For the design of the command line program, I decided to go with prompts rather than reading from a file to make it more interactive. I decided to use Inquirer to create prompts for the user since it uses promises which allows for better readability and saves us from callback hell.

Inquirer also has a few nifty tools like the list feature which allows the user to choose from a list using the up and down arrow keys.

I made use of Lob's HTML template as well to make the code more simple and clean.

I also decided to ask the user for their information first and use that to get the list of officials and finally prompt them for a message that they would like to send. It just seemed to flow better.

### Debugging and Testing
I mainly logged to the console when testing the command line program.

### Challenges
The main challenges were figuring out how to use the APIs. Lob's API was fairly straight forward and easy to use. The ability to create HTML templates was awesome as well. Google Civic Info API required a little more work, trying to figure out which parameters were necessary and how to filter out specific officials.

There was one point where the Google CI API returned a weird address that Lob's API didn't like and I tried to concat the address line1 and line2 together, but it didn't work. I couldn't seem to get around it since there was only one official that gave a weird address. Changing Lob's strictness setting on the dashboard from regular to relaxed fixed the issue, but I didn't think that was a great idea since it would stop checking for validity in the addresses.

In the end I decided to leave it, so sending a letter to Jerry Hill won't work. Just a heads up.
