### Description

1. Created a simple search page with filters and infinite scroll on search results, according to given design.
2. Added Prettier and Eslint for code format.
3. Responsive design.
4. Created unit tests using Jest.
5. Tested on Chrome, Mozzilla and Safari (all desktop and mobile).

### Remarks

-   Couldn't find a query that provided the available filters so I hardcoded them in `config.js`.
-   I tried to use as much custom code as possible, as opposed to installing modules.

### Instructions

1. git clone `<repo>`
2. cd dir
3. yarn
4. npm start

### Running the tests

`npm t || yarn test`

Pressing `a` will run all the tests.
Pressing `w` will show the help.

### Tools used

-   ESLint
-   react-apollo
-   graphql
-   prop-types
-   styled-components

### Main structure

1. In project/src we have:

-   `/src/__tests__` - where all tests are;
-   `/src/themes` - JS file with constants for general use;
-   `/src/images` - images provided by assignment;
-   `/src/config.js` - includes the apiUrl, BaseUrl and available filters array;
-   `/README.md` - instructions for running the project;

2. In project.src.components we have:

-   `/src/components/generic` - components for general use (FiltersList, SearchBar, SearchResults);
-   `/src/components/pages/Home` - component containing main functionality and logic;

### Functionality

-   Landing page is presented with search input. Inserted values can be searched by clicking on the search icon on the left part of the input or by hitting 'Enter' key. Input value can be cleared by clicking the clear icon on the right of the input (which is visible only when input has value).
-   In case there is an error while exectuing search, an error message is displayed bellow input.
-   If search is successful, available filters list will be displayed below input, together with search results or message 'No results found' if there are no results.
-   Available filters list is scrolled horizontally and will show shadows at start and end of scroll. Selecting a filter will scroll it to center of list.
-   Each search result displays specific label, image and selected filters. Clicking on a search result will open new browser tab directing to specific link. Label text is displayed with ellipsis format (on screen width larger than 992px) with title showing entire label on mouse hover, whilst on screen width smaller than 992px the label is displayed entirely.
-   In the design each result has the category(filter) under the title. There was no option to get that info from the query so I added the active filters. Decided to show all of them without ellipsis.
-   Search results list is scrollable with infinite scroll pagination.

### Known issues

-   Could not include 'Helvetica Neue' because it can only be bought (found a similar format of 'Helvetica Neue' but it seems to give the text a smaller width comparing with the design).
