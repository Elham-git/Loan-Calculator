// Listen for submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  //hide results
  document.getElementById("results").style.display = "none";

  // show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResult, 2000);

  e.preventDefault();
});

// Calculate Results

function calculateResult() {
  console.log("calculating...");

  // UI Variables

  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute monthly payment

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // show results
    document.getElementById("results").style.display = "block";

    //hide the loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers !");
  }
}

/////////check error function

function showError(error) {
  // Create Error
  const errmsg = document.createElement("div");

  //Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add Class
  errmsg.className = "alert alert-danger";

  // create text node and  append to div
  errmsg.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errmsg, heading);

  // clear errormsg after 3 second
  setTimeout(clearError, 3000);
  document.getElementById("loading").style.display = "none";
}
// clearError
function clearError() {
  document.querySelector(".alert").remove();
}
