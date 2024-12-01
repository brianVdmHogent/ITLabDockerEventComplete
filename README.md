# Asteroids Game with Docker

This project is designed to help students on how to build and run Docker containers using a simple version of the classic Asteroids game.
## Introduction

This repository contains a basic version of the Asteroids game implemented in HTML/JS with an FastAPI server as backend. 
The primary goal of this project is to provide a hands-on learning experience for building and running Docker containers.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/asteroids-docker.git
    cd asteroids-docker
    ```

2. Build the Docker image:

    ```sh
    docker build -t asteroids-game .
    ```

## Usage

1. Run the Docker container:

    ```sh
    docker run -it -p 8000:8000 asteroids-game
    ```

2. Open your web browser and navigate to `http://localhost:8000` to play the Asteroids game.
