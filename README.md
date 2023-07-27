**README.md**

# Social_Post Repository

This repository contains the source code for the Social_Post application. The application is divided into two parts: the server and the client. To get started, follow the instructions below for setting up and running the server and client components.

## Getting Started

### Prerequisites

Before running the application, make sure you have the following prerequisites installed on your system:

- Node.js (https://nodejs.org) - Ensure you have Node.js installed, as it is required for running both the server and client.

### Cloning the Repository

To clone this repository, run the following command in your terminal or command prompt:

```
git clone https://github.com/MochtaufiqHi/Social_Post.git
```

Setting up the Database

There are two options to set up the database for the Social_Post application:
Option 1: Create a New Database MySql CLI or with PhpMyAdmin

    CREATE DATABASE machine_vision_db;

Option 2: Use Provided Database Dump

    Social_Post/machine_vision_db.sql

### Running the Server

1. Navigate to the "server" folder within the cloned repository:

```
cd Social_Post/server
```

2. Install the required dependencies by running the following command:

```
npm install
```

3. Start the server by running the following command:

```
node index.js
```

The server should now be up and running on your port 5000.

### Running the Client

1. Navigate to the "mvtest" directory within the cloned repository:

```
cd Social_Post/mvtest
```

2. Install the required dependencies by running the following command:

```
npm install
```

3. Start the client application with the following command:

```
npm start
```

The client application should now be running and accessible through your web browser.

## Contributing

If you would like to contribute to this project, please follow the standard GitHub workflow:

1. Fork the repository to your GitHub account.
2. Create a new branch with a descriptive name for your changes.
3. Make your changes and commit them with clear commit messages.
4. Push the changes to your forked repository.
5. Create a pull request to the main repository's `master` branch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or inquiries about this project, feel free to contact the project owner: [Mochammad Taufiq Hidayat](mailto:mochammadtaufiq779@gmail.com).

Happy coding!