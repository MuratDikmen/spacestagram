## Spacestagram: Explore the Space

This is my take on Shopify's app challenge for prospective Winter 2022 interns.

## See in Action
Visit [the link](https://explore-the-space.netlify.app/) to see the app in action.

## How to Install
1. After cloning the repo, run `npm install` to download all required dependencies.
2. Create the file `.env` in the root directory, and include your NASA API key (get it from [here](https://api.nasa.gov/)) in the following format: `REACT_APP_API_KEY=your-api-key`
3. Run `npm start`.

## Features
- Users can browse photo(s) of the day provided by NASA API, presented in a feed.
- Users can like/unlike the photos.
- Likes are stored in local storage.
- Infinite scrolling (capped at ~100 photos).

## Learnings
- I had the chance to explore Polaris design system. While I really enjoyed the structured (and opinionated) nature of it, I also experienced the challenges associated with customization and shortcomings.
- I have implemented infinite scrolling for the first time. Really learned a lot about Intersection Observer API.

## Known Issues / Areas for Improvement
- Testing: Due to time constaints, I was not able to implement tests and follow TDD/BDD.
- Performance: Earlier versions of Safari on iOS have some issues with loading and animations.
- Architecture: The architecture can be improved. Currently, some components are loaded and can be broken down.
