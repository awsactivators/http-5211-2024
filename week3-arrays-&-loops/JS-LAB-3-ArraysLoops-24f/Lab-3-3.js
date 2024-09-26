//LAB 3 - ARRAYS & LOOPS - PART 3

//PART 3 - SHOPPING CART SHIPPING
//==== VARIABLES ========
var cartItem = [];
var totalCost = 0;
var shippingThreshold = 35;

//==== LOGIC ========
//CHECK FOR ITEMS UNTIL THRESHOLD IS MET.
while (totalCost < shippingThreshold) {
	//GET ITEM COST FROM USER
	var itemCost = prompt("Enter the doller Cost of the item $: ");

	//CONVERT USER INPUT TO A NUMBER
  itemCost = parseInt(itemCost);

	//ADD ITEM COST TO RUNNING TOTAL VARIABLE
	totalCost += itemCost;

	//PUSH ITEM COST TO CART ARRAY
	cartItem.push(itemCost);

}

//SEND POPUP MESSAGE TO USER
alert(`Your Shipping for this order will be free! Item Cost is $${totalCost}`);

//SEND OUTPUT TO CONSOLE
console.log(`Item prices: ${cartItem.join(' | ')}`);