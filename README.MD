[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />

<p align="center">
  <p align="center">
    <img src="https://d33wubrfki0l68.cloudfront.net/4205d0600846259a187789ac358b9107a308d949/a4ec6/img/logo.svg" alt="Logo" width= 40%>
  </p>

  <h3 align="center">HR MANAGEMENT</h3>
</p>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
        <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

### Built With

This app is being developed by phuocleoceo, currently studying at Danang University of Technology. We're using these technologies to develope the app:
* [C#](https://docs.microsoft.com/en-us/dotnet/csharp/)
* [ASP.NET API](https://dotnet.microsoft.com/apps/aspnet/apis)
* [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
* [AutoMapper](https://automapper.org/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [Axios](https://www.npmjs.com/package/axios)

## Getting Started

Necessary program to build and run this code:
  1. Visual Studio Code or Terminal
  2. Microsoft SQL Server 2019
  3. NodeJS
  4. npm
  


### Installation

1. Copy the address of the project
2. Clone the repo
   ```
   git clone https://github.com/phuocleoceo/HRManagement
   ```
3. Open with Visual Studio Code, change connectionstring in WebAPI/appsettings.json
   ```
    "DefaultConnection": "Server={yourServerName};Database={yourDBName};Trusted_Connection=True;MultipleActiveResultSets=true"
   ```
4. Run the Migration ( detail in WebAPI/README.md ):
   ```
    dotnet ef migrations add Init ; dotnet ef database update
   ```
5. Run the WebAPI:
   ```
    dotnet run
   ```
6. Change directory to client-app, edit API_URL in src/api/apiService.js and run:
   ```
    npm i
   ```
7.  Run the Client-App: 
	```
    npm start
    ```

## Usage

**1. Home Page**
    <br/>
    <br/>
    ![homepage](https://raw.githubusercontent.com/phuocleoceo/HRManagement/master/screen-shot/HomePage.jpg)

**2. Employee List**
    <br/>
    <br/>
    ![emplist](https://raw.githubusercontent.com/phuocleoceo/HRManagement/master/screen-shot/Employee.jpg)

**3. Employee Upsert**
    <br/>
    <br/>
    ![empAdd](https://raw.githubusercontent.com/phuocleoceo/HRManagement/master/screen-shot/AddEmployee.JPG)
	<br/>
    <br/>
    ![empEdit](https://raw.githubusercontent.com/phuocleoceo/HRManagement/master/screen-shot/EditEmployee.JPG)

**4. Department List**
    <br/>
    <br/>
    ![emplist](https://raw.githubusercontent.com/phuocleoceo/HRManagement/master/screen-shot/Department.JPG)

**5. Department Upsert**
    <br/>
    <br/>
    ![empAdd](https://raw.githubusercontent.com/phuocleoceo/HRManagement/master/screen-shot/AddDepartment.JPG)
	<br/>
    <br/>
    ![empEdit](https://raw.githubusercontent.com/phuocleoceo/HRManagement/master/screen-shot/EditDepartment.JPG)

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->
## Contact

Facebook and Gmail : [Facebook](https://facebook.com/phuocleoceo) - ht10082001@gmail.com

Project Link : [HR Management](https://github.com/phuocleoceo/HRManagement)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/badge/CONTRIBUTORS-_1_-brightgreen?style=for-the-badge
[contributors-url]: https://github.com/phuocleoceo/HRManagement/graphs/contributors
[forks-shield]: https://img.shields.io/badge/FORKS-_0_-blue?style=for-the-badge
[forks-url]: https://github.com/phuocleoceo/HRManagement/network/members
[stars-shield]: https://img.shields.io/badge/STARS-_0_-blue?style=for-the-badge
[stars-url]: https://github.com/phuocleoceo/HRManagement/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/phuocleoceo/HRManagement/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/phuocleoceo/HRManagement/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[product-screenshot]: images/screenshot.png
