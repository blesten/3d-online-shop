<div id="top"></div>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/blesten/3d-online-shop">
    <img src="client/public/images/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Stitch Lab</h3>

  <p align="center">
    An awesome 3D online shop application based on website
    <br />
    <a href="https://github.com/blesten/3d-online-shop"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/blesten/3d-online-shop/issues">Report Bug</a>
    ·
    <a href="https://github.com/blesten/3d-online-shop/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

Welcome to the **Stitch Lab** Github repository! Here, you'll find the source code for our sleek and sophisticated 3D online shop application. Built with modern technologies and a focus on user experience, our application aims to provide customers with an effortless shopping experience.

<p align="right"><a href="#top">back to top</a></p>

### Built With

Main technology used to built this application are listed below:

* [Vite](https://www.vite.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [React.js](https://www.reactjs.org/)
* [Tailwind CSS](https://www.tailwindcss.com/)
* [Three JS](https://threejs.org/)
* [Stripe](https://stripe.com/)
* [Cloudinary](https://cloudinary.com/)
* [Node.js](https://www.nodejs.org/)
* [Express.js](https://www.expressjs.com/)
* [MongoDB](https://www.mongodb.com/cloud/atlas/)

<p align="right"><a href="#top">back to top</a></p>

## Getting Started

To get started with this project locally, follow below steps:

### Prerequisites

Make sure you have Docker, Node.js, and package manager (either npm or yarn) installed

>**FYI**: This project uses **npm** as the package manager, but you're free to use **yarn** too.

### Installation

Below steps will guide you through the local installation process of this application

1. Clone the repo
   ```
   git clone https://github.com/blesten/3d-online-shop.git
   ```
2. Complete the .env variable at /server directory
Rename .env.example file at ```/config``` directory become ```.env```, then fill the value for every key. Below is the guideline for filling the .env value:<br/>
    | Key | What to Fill | Example Value |
    | :---: | :---: | :---: |
    | PORT | Your server port | 5000 |
    | MONGO_URL | Your MongoDB connection URL | mongodb+srv://username:password@main.14znatw.mongodb.net/DBName?retryWrites=true&w=majority |
    | IGNORE_ERR | Error that can be ignored at frontend | TEST_IGNORE_ERR |
    | ACCESS_TOKEN_SECRET | Your JWT access token secret | NzeWG39JJNWASRKTeM85Ki77yZbdXZapvfIfepxz7d2WG |
    | REFRESH_TOKEN_SECRET | Your JWT refresh token secret | KS3VuMkQkGzzQ5BhMyxgpGV2xelxR7B7UummWAG5r5c |
    | STRIPE_SECRET_KEY | Your <a href="https://www.stripe.com/">Stripe</a> Secret key | sk_test_1234 |
    | STRIPE_SUCCESS_URL | Client URL for success payment | http://localhost:3000/success_payment |
    | STRIPE_ERROR_URL | Client URL for failed payment | http://localhost:3000/failed_payment |
    | CLIENT_URL | Client URL | http://localhost:3000 |
3. Complete the key.ts variabel at /client directory
Rename key.example.ts file at ```/config``` directory become ```key.ts```, then fill the value for every key. Below is the guideline for filling the key.ts value:<br/>
    | Key | What to Fill | Example Value |
    | :---: | :---: | :---: |
    | CLOUDINARY_LOGO_FOLDER_ID | Your <a href="https://cloudinary.com/">Cloudinary</a> folder ID to store shirt logo image | 1234abc |
    | CLOUDINARY_TEXTURE_FOLDER_ID | Your <a href="https://www.cloudinary.com/">Cloudinary</a> folder ID to store shirt texture image | 1234abc |
    | CLOUDINARY_CLOUD_NAME | Your <a href="https://www.cloudinary.com/">Cloudinary</a> cloud name | abc_1234 |
    | STRIPE_PUBLISHABLE_KEY | Your <a href="https://www.stripe.com/">Stripe</a> publishable key | pk_test_1234 |
    | SERVER_URL | Your server application URL | http://localhost:5000 |
4. Open your terminal, and ```cd``` to the client directory, then run ```npm install``` command to install client dependency
5. Open your terminal, and ```cd``` to the server directory, then run ```npm install``` command to install server dependency
6. Lastly, run ```npm run dev``` command on both ``client``` and ```server``` directory at your terminal to start the application

<p align="right"><a href="#top">back to top</a></p>

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right"><a href="#top">back to top</a></p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right"><a href="#top">back to top</a></p>

## Contact

LinkedIn: [Stanley Claudius](https://www.linkedin.com/in/stanleyclaudius)

Project Link: [https://github.com/blesten/3d-online-shop](https://github.com/blesten/3d-online-shop)

<p align="right"><a href="#top">back to top</a></p>

## Acknowledgments

Special thanks to:

* [Othneildrew](https://github.com/othneildrew/) for providing an amazing README template.
* [Tailwind CSS](https://tailwindcss.com) for providing CSS framework to be used in this application.
* [React Icons](https://react-icons.github.io/react-icons/) for providing icon to be used in this application.

<p align="right"><a href="#top">back to top</a></p>

[forks-shield]: https://img.shields.io/github/forks/blesten/3d-online-shop.svg?style=for-the-badge
[forks-url]: https://github.com/blesten/3d-online-shop/network/members
[stars-shield]: https://img.shields.io/github/stars/blesten/3d-online-shop.svg?style=for-the-badge
[stars-url]: https://github.com/blesten/3d-online-shop/stargazers
[issues-shield]: https://img.shields.io/github/issues/blesten/3d-online-shop.svg?style=for-the-badge
[issues-url]: https://github.com/blesten/3d-online-shop/issues
[license-shield]: https://img.shields.io/github/license/blesten/3d-online-shop.svg?style=for-the-badge
[license-url]: https://github.com/blesten/3d-online-shop/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/stanleyclaudius