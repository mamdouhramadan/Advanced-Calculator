// Initialize Bootstrap Tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Calculator Logic
document.addEventListener('DOMContentLoaded', function () {
  // Get the display element
  const display = document.getElementById('display');
  // Get all the buttons
  const buttons = document.querySelectorAll('.btn');
  // Initialize the current input
  let currentInput = '';
  // Initialize the operator clicked flag
  let operatorClicked = false;

  // Add an event listener to each button to handle the click event
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const buttonValue = button.innerText;

      if (buttonValue === 'C') {
        clearDisplay();
      } else if (buttonValue === '←') {
        backspace();
      } else if (buttonValue === '=') {
        calculateResult();
      } else {
        updateDisplay(buttonValue);
      }
    });
  });

  // Clear the display and reset the current input to an empty string
  function clearDisplay() {
    currentInput = '';
    display.value = '';
  }

  // Remove the last character from the current input and update the display
  function backspace() {
    // Remove the [last character] from the current input
    currentInput = currentInput.slice(0, -1);
    // Update the display
    display.value = currentInput;
  }

  // Calculate the result of the current input and update the display
  function calculateResult() {
    try {
      // Evaluate the current input and convert it to a string
      currentInput = eval(currentInput).toString();
      // Update the display
      display.value = currentInput;
    } catch (error) {
      // If an error occurs, display an error message
      display.value = 'Error';
      // Reset the current input  to an empty string
      currentInput = '';
    }
  }

  // Update the display based on the button clicked by the user "C, ←, =, or a number/operator"
  function updateDisplay(value) {
    // If an operator is clicked and the last character in the current input is an operator
    if (operatorClicked && ['+', '-', '*', '/'].includes(value)) {
      // Remove the last character from the current input
      currentInput = currentInput.slice(0, -1);
    }
    // Update the current input
    currentInput += value;
    // Update the display
    display.value = currentInput;
    // Check if an operator is clicked
    operatorClicked = ['+', '-', '*', '/'].includes(value);
  }
});
