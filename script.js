// Define the size of each block in the game grid
let blockSize = 25;

// Define the total number of rows and columns in the game grid
let total_row = 17; // Total number of rows
let total_col = 17; // Total number of columns

// Variables to store the canvas and its context
let board; // Canvas element
let context; // 2D rendering context of the canvas

// Initial position of the snake
let snakeX = blockSize * 5; // Initial X position of the snake
let snakeY = blockSize * 5; // Initial Y position of the snake

// Speed of the snake
let speedX = 0; // Speed of the snake in the X coordinate
let speedY = 0; // Speed of the snake in the Y coordinate

// Array to store the positions of the snake's body segments
let snakeBody = []; // Initially an empty array

// Variables to store the position of the food
let foodX; // X position of the food
let foodY; // Y position of the food

// Variable to keep track of game over state
let gameOver = false;

// Variable to store the score
let score = 0; // Initialize score counter

// Function to be executed when the window loads
window.onload = function () {
  // Set up the canvas
  board = document.getElementById("board"); // Get the canvas element
  board.height = total_row * blockSize; // Set canvas height based on number of rows
  board.width = total_col * blockSize; // Set canvas width based on number of columns
  context = board.getContext("2d"); // Get the 2D rendering context of the canvas

  // Place the initial food
  placeFood();

  // Add event listener for keyboard input to control snake movement
  document.addEventListener("keyup", changeDirection);

  // Set interval for updating the game state and rendering
  setInterval(update, 2000 / 10); // Update every 1/10th of a second
};

// Function to update the game state and render it
function update() {
  if (gameOver) {
    return; // If game over, stop updating the game
  }

  // Render the background of the game
  context.fillStyle = "green";
  context.fillRect(0, 0, board.width, board.height);

  // Render the food
  context.fillStyle = "yellow";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  // Check if snake eats the food
  if (snakeX == foodX && snakeY == foodY) {
    // If snake eats food
    snakeBody.push([foodX, foodY]); // Add a new body segment to the snake
    placeFood(); // Place new food
    score++; // Increment score when snake eats food
    document.getElementById("score").textContent = score; // Update score display
  }

  // Move the snake
  for (let i = snakeBody.length - 1; i > 0; i--) {
    // Move each body segment of the snake
    snakeBody[i] = snakeBody[i - 1]; // Move the body segment to the previous position
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY]; // Move the first segment of the snake to the head position
  }

  // Render the snake
  context.fillStyle = "white";
  snakeX += speedX * blockSize; // Update snake's X position
  snakeY += speedY * blockSize; // Update snake's Y position
  context.fillRect(snakeX, snakeY, blockSize, blockSize); // Render snake's head
  for (let i = 0; i < snakeBody.length; i++) {
    // Render each body segment of the snake
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // Check for collisions with walls
  if (
    snakeX < 0 ||
    snakeX > total_col * blockSize ||
    snakeY < 0 ||
    snakeY > total_row * blockSize
  ) {
    // If snake hits a wall
    gameOver = true; // Set game over state
    alert("Game Over"); // Show game over message
  }

  // Check for collisions with snake's own body
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      // If snake eats its own body
      gameOver = true; // Set game over state
      alert("Game Over"); // Show game over message
    }
  }
}

// Function to handle keyboard input and change snake's direction
function changeDirection(e) {
  if (e.code == "ArrowUp" && speedY != 1) {
    // If up arrow key pressed and snake not moving down
    speedX = 0; // Set speed in X direction to 0
    speedY = -1; // Set speed in Y direction to -1 (upward)
  } else if (e.code == "ArrowDown" && speedY != -1) {
    // If down arrow key pressed and snake not moving up
    speedX = 0; // Set speed in X direction to 0
    speedY = 1; // Set speed in Y direction to 1 (downward)
  } else if (e.code == "ArrowLeft" && speedX != 1) {
    // If left arrow key pressed and snake not moving right
    speedX = -1; // Set speed in X direction to -1 (leftward)
    speedY = 0; // Set speed in Y direction to 0
  } else if (e.code == "ArrowRight" && speedX != -1) {
    // If right arrow key pressed and snake not moving left
    speedX = 1; // Set speed in X direction to 1 (rightward)
    speedY = 0; // Set speed in Y direction to 0
  }
}

// Function to place food at random position on the board
function placeFood() {
  // Generate random coordinates for food within the game grid
  foodX = Math.floor(Math.random() * total_col) * blockSize; // Random X position
  foodY = Math.floor(Math.random() * total_row) * blockSize; // Random Y position
}
