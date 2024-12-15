# Activity Finder

**Activity Finder** is a web application built with Next.js and Tailwind CSS. The app allows users to search for activities in a specific city by utilizing a custom-built API and a simple crawling mechanism. It combines the power of Natural Language Processing (NLP) and geospatial data to deliver relevant activity search results.

## Project Overview

This project aims to help users easily discover activities, events, and things to do in various cities. The core functionality revolves around an API that processes a set of JSON data files, extracts useful information, and uses the TF-IDF technique to deliver accurate and relevant results based on user queries. 

The app also integrates Leaflet, a leading JavaScript library for maps, and OpenStreetMap for geocoding.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js
- **Libraries/Tools**: Leaflet, OpenStreetMap, TF-IDF Algorithm
- **Data Storage**: Local JSON files (scanned from the `src/db/` directory)
  
## How It Works

### API - `/api/lookup`
The core of the app resides in the `/api/lookup` endpoint, which handles the user queries and retrieves activity information using the following process:

1. **Crawling**:
   - The first query triggers the server to perform a crawl. It scans the `src/db/` folder for all `.json` files that are formatted as `listX.json`.
   - The server reads each JSON file, concatenates all the activity data, removes duplicates, and processes the content.
   - The server then uses the TF-IDF technique to calculate and store word statistics in a file called `tfidf.json`.

2. **TF-IDF Storage**:
   - After the first request, the `tfidf.json` file is saved to disk, and the server will use the data from this file for subsequent requests.
   - If the server restarts and the `tfidf.json` file already exists, the server automatically loads the data from the file without re-crawling the `.json` files.
   
   This behavior is not highly scalable but is suitable for the current project size. The intention is to avoid setting up a full database and instead leverage local JSON files for simplicity.

3. **Query Handling**:
   - For each query, the server uses the TF-IDF technique to search for the most relevant activities. It compares the query terms with the stored statistics to find the best results.
   - The filtered and ranked results are sent back to the frontend for display.

### Frontend - Displaying Results
Once the results are returned from the server, the frontend displays them in an easy-to-read format. Additionally, Leaflet is used to show maps, and OpenStreetMap is used to convert addresses into geographic coordinates for accurate location mapping.

## Features

- Search for activities by city or location.
- Display results on a map using Leaflet and OpenStreetMap.
- Uses the TF-IDF technique to filter and rank results based on relevance.
- Caches and reuses the TF-IDF data for faster subsequent queries.

## Setup & Installation

To get started with this project locally, follow these steps:

### Prerequisites
- Node.js (version 16.x or higher)
- npm (Node Package Manager)

## Demo

You may find a demo of the website at [to-come]

## Contributing

Feel free to fork the repository and submit pull requests!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, feel free to open an issue or contact me!

