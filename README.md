# Charge-Locator Project

This project was created to quickly and easily allow the driver of an electric car to locate the nearest public charge point. It uses the Google Maps Javascript API to render a map on a webpage. The map is centred on the user's current location. It then searches for the nearest public charge points. The charge points are shown with markers. There is interactive capability to filter the search results, store user preferences and a default location.
 

 
## UX

I created this project because I drive an electric car, and have experience of using Google Maps and other specialized apps to locate public charge points.
The idea occurred to me that it would be useful to have a website which would immediately bring up a map of the nearest charge points. This would be especially valid in the case of a car being low on charge, and needing to get to a charge point in the shortest possible distance. 
 
The target user of the site is an electric car driver who needs to locate a public charge point. The site is aimed at the following user stories:

1)  On loading the website for the first time,the user is prompted to set preferences for car type and default location. The preferences are recorded in local storage. The website will not request the preferences again, but the user can change them at any time.

2) The user loads the website on a mobile device on the road. The car may be low on charge, or the user is simply using some time to charge at the nearest 
 charge point. The mobile device has GPS capability for accurate location of the car. The website marks the nearby charge points on the map, based on the user preferences. The website highlights the marker for the closest charge point to recommend it to the user. The user selects a charge point by clicking on its marker, and the website launches navigation to the charge point in the Google Maps app.
 

3) The user loads the website on a laptop/ desktop or other device not having GPS capability. The website centres the map on the default location selected by the user. The website marks the charge points near the default location, and again highlights the closest charge point on its marker. The user selects a  charge point by clicking on its marker, and the website displays a preview of the route to the charge point on Google Maps.

4) On any type of device, the user wants to check charger location around an alternate location, not necessarily at their current GPS location. They can select an alternate location by clicking on the map. The website re-centres at that location and runs the search for charge points. Again the closest charge point is highlighted.

 

- My wireframe sketch was uploaded to the root folder under the charge-locator project, as wireframe.jpg. It shows the wireframe for the main page and the settings modal.
 


## Features

The site consists of a single page with a map across the full width of the page. There is a navbar across the top showing a logo, the website title "Charge Locator", and "gear" icon for access to a menu to allow the user to edit their preferences. The bottom of the page is used to display status and prompts to the user. 

 
### Existing Features
- On loading the page for the first time on any device, the user is prompted (by modal) to enter their setting preferences. They have a checkbox option to     limit the search to Tesla charge points only. There is an input box to set the blink interval in seconds of the map marker on the closest charge point.       Setting the interval to 0 causes the marker to display without blinking. There is a checkbox option to allow the user to set a default location on the map.   Text prompts are displayed under   the settings. There are buttons at the bottom of the modal to allow the user to Save the options to local storage, or      Cancel the modal without saving settings.

- If the user has opted to set a default location, the website then prompts the user to select it by clicking on the map. The selected location is saved to   local storage, and used if a geolocated start point cannot be found.
 
- The webpage displays the Google map centred on either the user's current location or the default location. The location is shown as a black car icon on the   map.

- The webpage starts a Google maps nearby search for electric car chargers. Tesla charge points are restricted use, so if the Tesla option has been selected   in settings, only those charge points will be displayed. 

- The page displays the closest charge points to the location as blue "lightning bolt" markers, with the nearest point coloured green. The green marker will   blink if a non-zero blink interval has been selected in settings. If the setting is 0 seconds, the green marker is displayed without blinking.

- The user selects a charge point by clicking on its marker. The webpage prompts the user by a dialog box to either confirm the selection (OK) or cancel the   selection and return to the map (Cancel).

- If the device has GPS capability, the webpage immediately launches navigation to the charge point in the Google Maps app.

- If the device does not have GPS capability, the webpage shows a route preview from the default location to the selected charge point, in a separate browser tab.

- The user can then select an alternate start point for the search, by clicking anywhere on the map. The map is re-centered at the selected location, and a new search is begun. Again when the user selects a charge point, the navigation is immediately launched (GPS capable) or a route preview is shown (no GPS capability).

- A CSS media rule is included to reduce the height of the map area to 65% of the vertical space on the page, for screen heights of 320 pixels or less. This
  keeps the bottom message area visible in landscape mode for the Motorola Moto G4 and iPhone 5/SE phones.

### Features Left to Implement

- Future versions of the webpage could include further filtering of results, such as slow or fast charge points only, or different charge point operators.

- It could also include real-time availability information for charge points (is the point operational, and not already in use).

- Waypoints could be included, for example if the user wanted to visit a shopping centre etc on the way to the charge point.

- Ultimately the webpage could obtain real time charge information from the car, to determine its remaining range. This would restrict the search radius if required. 

## Technologies Used

- This project uses **HTML** for basic layout and text, and **CSS** for styling the content. The HTML includes screen reader content also.

- [Bootstrap](https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css)
    - This project uses **Bootstrap** to ease development by use of the Bootstrap grid system and design templates. It provides responsive CSS to adjust to 
      different screen sizes in phones, tablet and desktop devices. The Bootstrap Navbar feature is used to provide access to the settings, and logo at the       top of the page. A Bootstrap modal is used for the settings inputs.

- **Javascript** is used for the main coding of the interactive and logical elements. It handles the interaction with the Google Maps API, the inputs and prompts to   the user, and the decision/display logic around the search results.

- [JQuery](https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js)
  **jQuery** is used to select and control some of the HTML elements, for example updating the status/prompt text area at the bottom of the webpage.

- [Popper](https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js)
For popovers and drop down menus. Provides dynamic positioning and viewport detection.

- The **Google Maps API** is used to interface with Google Maps for the main map display on the page, and all search and display functions for the map.

- [FontAwesome](https://use.fontawesome.com/releases/v5.1.1/css/all.css) for the "lightning" marker icon.

## Testing

The website was tested with the following devices and scenarios:

- Asus F553M laptop with Google Chrome,Microsoft Edge and Opera browsers
- Asus F553M laptop with Google Chrome developer tools used to view various mobile (phone and tablet) device screen sizes
- Apple iPhone
- Motorola Moto G4 Android smartphone with Google Chrome
- Samsung Galaxy Tab 2 Android tablet with FlashFox browser

Testing showed the following results:
The page loaded successfully on all devices. The settings modal popped up on first use on a device, as designed. The map, and charge point markers were visible centred on the search location. The search operated correctly from a GPS located location or alternate location selected by the user, and a default location. Settings were stored correctly in local storage, and available on re-opening the site. There were some cases in landscape mode on mobile devices where the settings modal text area was partially obscured by the footer border. However, the Cancel and Save buttons remained visible.
The test cases were as follows:

### Test Cases
1) First time page load (settings modal should pop up and the user is prompted to configure)

2) Selection of Tesla charge points only filter

3) Blink interval setting (0 and non-zero)

4) Default location setting

5) Map centering and search operation

6) Marker display including closest marker

7) Charge point selection and confirmation

8) Navigation/route preview operation

9) Alternate start point selection and search

10) 65% map height media rule for iPhone 5/SE and Moto G4 in landscape mode

**Test Table**

|  **Test Case**    |  **Chrome**         |  **Edge**           |  **Opera**        |  **Dev tools**         |  **iPhone**          |  **Moto G4**     |  **Galaxy Tab2** |       
| ------------- | ----------- | ------- | -------- | ------------- | ---------- | ----------- | ------------- |  
| **1** | Pass  | Pass | Pass  | Pass | Pass  | Pass | Pass  | 
| **2** | Pass  | Pass | Pass  | Pass | Pass  | Pass | Pass  | 
| **3** | Pass  | Pass | Pass  | Pass | Pass  | Pass | Pass  | 
| **4** | Pass  | Pass | Pass  | Pass | Pass  | Pass | Pass  | 
| **5** | Pass  | Pass | Pass  | Pass | Pass  | Pass | Pass  | 
| **6** | Pass  | Pass | Pass  | Pass | Pass  | Pass | Pass  | 
| **7** | Pass  | Pass | Pass  | Pass | Pass  | Pass | Pass  | 
| **8** | Pass  | Pass | Pass  | Pass | Pass  | Pass | Pass  | 
| **9** | Pass  | Pass | Pass  | Pass | Pass  | Pass | Pass  |
| **10** | N/A  | N/A | N/A  | Pass | Pass  | Pass | N/A  | 





## Deployment

The project was deployed on GitHub Pages. To do this, I clicked on the "Settings" tab of the charge-locator repository in GitHub. Then I scrolled down to the GitHub Pages section. From the Source drop-down menu I selected "master branch" to deploy the website from the latest master code. GitHub then published the website at: [charge-locator](https://rphanley.github.io/charge-locator/)

- **Local Install**: The website can be installed locally by clicking the "Clone or download" button at : [charge-locator](https://github.com/rphanley/charge-locator), then clicking on "Download ZIP" to download the folder structure and all files to your device.



## Credits

### Content
- Modal logo and car icon courtesy of bigstockphoto.com. 
- Lightning marker icon courtesy of FontAwesome.

### Acknowledgements
I want to acknowledge the invaluable help and guidance of my tutor Xavier, and mentor Ignatius, in developing this project.
