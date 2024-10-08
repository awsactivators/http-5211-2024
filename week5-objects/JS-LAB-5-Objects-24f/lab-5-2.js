//#### LAB 5 - OBJECTS ####
//PART 2:  CREATE A BANK CUSTOMER OBJECT
//1. Create the object structure first.
//2. Add the required properties to your object.
//3. Add your first method and test it. Remember, the methods will change the properties of the object.
//4. Add your second method and test it.
//5. Create the required output to complete steps 6-10 of the lab.
//6. Once everything is working, tackle the Stretch Goal!

var bankCustomer = {
  lastName: "Self",
  branchNumber: 5122,
  accountBalance: 500.25,
  interestRate: 1.03,
  multipleAccounts: true,
  makeDeposit: function(amount){
    bankCustomer.accountBalance += amount;
    return(`Thank you, your current balance after deposit is now $${bankCustomer.accountBalance.toFixed(2)}`);
  },
  makeWithdrawal: function(amount){
    bankCustomer.accountBalance -= amount;
    return(`Thank you, your current balance after withdrawal is now $${bankCustomer.accountBalance.toFixed(2)}`);
  },
  makeInterestRate: function(){
    var tempInterestrate = bankCustomer.interestRate;
    if(bankCustomer.multipleAccounts == true){
      tempInterestrate += 0.005
    }
    bankCustomer.accountBalance *= tempInterestrate;
    return(`Thank you, your current balance with interest is now $${bankCustomer.accountBalance.toFixed(2)}`);
  }
  
}

console.log(`Starting balance is $${bankCustomer.accountBalance}`);
console.log(`Your current balance after deposit is $${bankCustomer.makeDeposit(200)}`);
//console.log(`Your current balance after deposit is $${bankCustomer.accountBalance.toFixed(2)}`);
console.log(`Your current balance after withdrawal is $${bankCustomer.makeWithdrawal(75)}`);
//console.log(`Your current balance after withdrawal is $${bankCustomer.accountBalancel}`);
console.log(`Your cuurent balance after interest is  $${bankCustomer.makeInterestRate()}`);
//console.log(`Your cuurent balance after interest is $${bankCustomer.makeInterestRate}`);
