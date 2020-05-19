# The Great Pizza Application

Sample application of programming paradigms and patterns using .Net Core and Angular :fire:

![PizzasWorking](https://thumbs.gfycat.com/MarriedBestHarpyeagle-size_restricted.gif)

## Techonologies in use and roadmap
This section cover the base technologies in use for this app and some others that the application may benefit in the future.

### Techonologies :computer:

The following is a list of techonologies in use in The Great Pizza

- **.Net Core 3** for the backend implementation
- **Angular 9** for the frotend
- **SQL Server** localdb for the database in development environment
- **EF Core** as the ORM for data access
- **Swagger** for Api documentation
- **Angular Material** for creating easily a nice, modern looking app

The list above provides a great foundation to build an extensible and performant application.

### Roadmap for tech :rocket:
The following are some ideas of frameworks, libraries, etc that the application may benefit from in the future

- **IdentityServer**: For authentication and authorization. Identity Server is a great library based on the OpenId Connect specification that enables authentication as a servie, token expiration, access to resources and more. It is extremly powerful and extensible.
- **Dapper**: If the app grows and needs more complex queries spitting the domain and query model is a great place to start. Implementing CQRS and using Dapper for the query side makes queries run faster and keeps the code clean.
- **Azure DevOps**: Every app benefits from a solid CI & CD pipeline and Azure is one of the best places to achieve that.
- **Docker**: Container dont need much explanation this days. Scalability, more reliable and repeatable deployments are just the tip of the iceberg for the benefits that you can get from containers.
- **Others**: Docker Swarm for orchestration, App Insights, Sonarqube for code analysis, ELK for logs, etc offer great posibilities for the application lifecycle. But complexity should be added when the necesity arrises, not just for the sake of using the latest and shiniest tech

## Architectural Overiew :page_with_curl:
Many of the patterns found in this code base are overkill for a simple app like the one being built, but the idea was to use this as a sample of some architectural concepts, patterns and good practices that should be used in a real project.  
Below is a list of some of the more relevant architectural concepts and patterns found in this app:

### Backend
The backend is built with 2 key goals in mind: Maintainability and Performance.

- **Layered Architecture**: The great pizza is built using a layered architecture were the application core or domain is the center and does not have any dependencies. This type of architecture helps achieve the Single Responsability Principle and supports using patterns as Domain Driven Design
- **Domain Driven Design**: This is an approach to software development coined by Eric Evans in his famous blue book. The importance of such approach becomes evident as the complexity of the application increases.  
The Great Pizza makes use of some DDD principles like encapsulating logic in the domain classes, use private setters to increase encapsulation and maintaining data integrity and will use many others as the complexity like Value Objects, Aggregate Roots, etc as the complexity increases.
- **Dtos in the Api**: The app uses dto's for exchanging information with the outside world even if those dto's are almost identical as their domain model counterparts. This helps in achieving decoupling and avoids introducing breaking changes without noticing. Moreover it gives the possibility to evolve the domain classes without worring about breaking compatibility or exposing sensible information to external consumers.
- **Result Class**: The result class is based in the following inplementation(https://enterprisecraftsmanship.com/posts/functional-c-handling-failures-input-errors/) and it goals is to communicate results of operations performed by the domain classes.
- **Query Projections**: The api uses query projections for all Get requests. This is a good balance between simplicity and performance. For more complex queries it is worth to further divide the domain and query model using Dapper or in some cases stored procedures.

### Frontend
The fronted implementation of The Great Pizza has less patterns and focuses primarly on showing some basic interaction with the backend using Angular Material for providing a clean and modern look to the app. However the following can be noticed:

- **Feature Modules**: Even if the app is really small right now all features have been built into its own module and routes configured as childs inside them to allow lazy loading in the future.
- **Shared Module**: To import common functionality such as confirmation dialog and Angular Material.
- **Http Interceptor**: To handle errors from the backend in a centralized place.

## Getting Started
The application can be run locally and only requires .Net Core 3 SDK and Angular 9 installed. Follow this steps to get started in no time:

### Backend
1. Clone the repository
2. Change directory to the Api folder
     ```
     cd Services\TheGreatPizza\TheGreatPizza.Api
     ```
3. Restore required packages by running:
      ```
     dotnet restore
     ```
4. Run migrations. This will create a local database named TheGreatPizzaDb
    ```
	   dotnet ef database update
    ```
5. Run the api
    ```
     dotnet run
     ``` 
6. Launch [https://localhost:5001/swagger](http://localhost:5000/swagger) in your browser to test the Api with Swagger

### Angular Application
1. Standing in the root of the repo change directory to the Angular app.
    ```
     cd Clients\TheGreatPizza
     ```
2. Install npm packages
    ```
     npm install
     ```
3. Run the app
    ```
     npm start
     ``'
4. Navigate to http://localhost:4200 and start creating some tasty pizzas :wink:
