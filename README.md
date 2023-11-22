# Farm Management System
The Farm Management System Angular App serves as a management tool for farms within a farm management system. The primary use case of this project is to provide a user-friendly interface for users to efficiently manage and organize farm-related operations.To visualize the system features, the Use Case Diagram below showcases the key interactions and functionalities of the system.
![Farm Management System Use Case Diagram]()

# Features 
1. `View Farms`: Users can access the application and view a list of all farms in the system. This feature allows them to get an overview of the farms and their details, such as location.

2. `Add Farms` : Users can add new farms to the system through the "Add Farm" functionality. They can provide the necessary details, such as the farm's name, location, and any additional information required.

3. `Edit Farms`: Users have the ability to edit the details of existing farms using the "Edit Farm" feature. This allows them to update farm information, such as the name, location, or any other relevant details.

4. `Search Farms` : The application provides a search functionality that enables users to search for specific farms based on criteria such as the farm's name or location. This helps users quickly find the farms they are looking for within the system.

5. `View Single Farm Details` : Users can select a specific farm from the list and view detailed information about that farm, including its location and the employees associated with it. This feature provides a comprehensive view of a particular farm's data.

## Application Routes and Features
The below table provides an overview of the various routes and their corresponding features within the application. It outlines the URLs that can be accessed and describes the functionality available on each route. This information serves as a guide for navigating through the application and understanding the features offered by each route.

| URL                                      | Feature                          |
| ---------------------------------------- | -------------------------------- |
| http://localhost:4200/                   | Home Page                        |
| http://localhost:4200/farms              | List of Farms                    |
| http://localhost:4200/farms/add          | Add a New Farm                   |
| http://localhost:4200/farms/:id          | View Details of a Farm and manage its operations  |
| http://localhost:4200/farms/:id/edit     | Edit a Farm                      |


## Prerequisites
  
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=vscode,git,github,angular,nodejs,html" />
  </a>
</p>

- Node.js and npm should be installed on your machine.
- [Angular CLI](https://github.com/angular/angular-cli) version 16.2.9.
- HTML
- CSS
- Heroku
- 
## Installation
To run the development server, follow these steps:

1. Run the back-end server

2. Clone the repository to your local machine.

   ````shell
   git clone <repository-url>
   ````
   
3. Open a terminal and navigate to the project's root directory.

4. Run the following command to install the dependencies:

   ````shell
   npm install
   npm install bootstrap bootstrap-icons
   npm install @angular/material-icons
   npm install @angular/material
   npm install @angular/animations
   npm install ngx-pagination
   ````
   
5. Once the dependencies are installed, start the development server by running the following command:

   ````shell
   ng server
   ````
6. Open your web browser and navigate to http://localhost:4200/ to access the application. The page will automatically reload if you make any changes to the source files.

