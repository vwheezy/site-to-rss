# site-to-rss

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#future-development">Future Development</a></li>

  </ol>
</details>



<!-- ABOUT  -->
## About

`site-to-rss` is a lightweight web application that scrapes and extracts data from user-inputted websites to create/host RSS feeds.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

`site-to-rss` (currently) runs on the MEN stack. We just need to install Node and MongoDB.

### Prerequisites

Install [Node.js](https://nodejs.org/en/download) and [MongoDB](https://www.mongodb.com/download-center/community/releases) however you see fit (this application was built on top of versions 21.4.0 and 10.2.5, respectively, ensure compatibility with the application). 
* Node
  ```sh
  sudo pacman -S nodejs
  ```
* MongoDB
  ```sh
  paru -S mongodb-bin
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/vwheezy22/site-to-rss.git && cd site-to-rss
   ```
2. Install NPM packages
   ```sh
   npm i
   ```
3. Run [MongoDB](https://www.mongodb.com/docs/manual/installation/)
   ```sh
   systemctl start mongodb
   ```
4. Run the application and navigate to http://localhost:3000
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Future Development -->
## Future Development

- [ ] Prettify frontend while maintaining mostly static environment
    - [ ] Using Prism.js to syntax highlight the extracted items list
    - [ ] Overall CSS styling to make it look like it's not from the 90s
    - [ ] More reactivity in the frontend -- i.e. provide feedback to user if requests fail 
- [ ] Speed up regex extraction on websites, it's **very** slow right now
- [ ] Provide some mechanism of authentication/rate limiting on `/api/build-feeds` to prevent DoS
- [ ] Clean up input validation... it's a mess

See the [open issues](https://github.com/vwheezy22/site-to-rss/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



