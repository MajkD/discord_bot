DiceRoller = function() {

  this.number_markups = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"];

  DiceRoller.prototype.roll = function(msg, onError, onDiceRolled) {
    this.onError = onError;
    this.onDiceRolled = onDiceRolled;
    this.msg = msg;

    var message = msg.content;
    var message = message.substr(1).slice(0, -1);
    var vals = message.split("D");
    var numDice = vals[0];
    var diceValue = vals[1];

    if(this.check_err_numerical(numDice, diceValue)) {
      return;
    }

    numDice = parseInt(numDice);
    diceValue = parseInt(diceValue);

    if(this.check_err_values(numDice, diceValue)) {
      return;
    }

    this.roll_dice(numDice, diceValue);
  };

  DiceRoller.prototype.check_critical = function(message, numDice, diceValue, sum) {
    if(numDice == 1 && diceValue == 100 && sum == 1) {
      return message + "  Yay critical!! :fire:"
    }
    if(numDice == 1 && diceValue == 100 && sum == 100) {
      return message + "  Botch!! :poop:"
    }
    return message;
  }

  DiceRoller.prototype.roll_dice = function(numDice, diceValue) {
    var title = this.msg.author.username + " rolled: " + numDice + "D" + diceValue;
    var composedMesage = "";
    var sum = 0;
    for(var diceIndex = 0; diceIndex < numDice; diceIndex++) {
      var randomNumber = Math.floor(Math.random() * diceValue) + 1;
      sum += randomNumber;
      composedMesage = composedMesage + this.get_number_markup(randomNumber) + " + ";
    }
    composedMesage = composedMesage.slice(0, -2);
    composedMesage = composedMesage + " = " + sum

    composedMesage = this.check_critical(composedMesage, numDice, diceValue, sum);

    var result = { 
      title: title,
      message: composedMesage,
    }
    this.onDiceRolled(this.msg, result);
  }

  DiceRoller.prototype.get_number_markup = function(number) {
    var output = "";
    var digits = number.toString();
    for(digitIndex = 0; digitIndex < digits.length; digitIndex++){
      var num = parseInt(digits[digitIndex]);
      output = output + this.number_markups[num];
    }
    return output;
  }

  DiceRoller.prototype.check_err_numerical = function(numDice, diceValue) {
    if(numDice == undefined || diceValue == undefined) {
      this.onError(this.msg, "Invalid values entered Format should be eg. :2D6:");
      return true;
    }

    if (this.contains_forbidden_chars(numDice) || this.contains_forbidden_chars(diceValue)) {
      var errorMsg = "You entered: " + numDice + " and " + diceValue + ", Please enter only numerical values"
      this.onError(this.msg, errorMsg);
      return true;
    }
  }

  DiceRoller.prototype.check_err_values = function(numDice, diceValue) {
    if (!this.validate_dice_number(numDice)) {
      var errrMsg = "Invalid number of dice: " + numDice + " (min: 1 max: 20)"
      this.onError(this.msg, errrMsg);
      return true;
    }

    if (!this.validate_dice_value(diceValue)) {
      var errrMsg = "Invalid dice value: " + diceValue + " (2, 4, 6, 8, 10, 12, 20, 100)"
      this.onError(this.msg, errrMsg);
      return true;
    }
  }

  DiceRoller.prototype.validate_dice_number = function(numDice) {
    return numDice > 0 && numDice <= 20;
  }

  DiceRoller.prototype.validate_dice_value = function(diceValue) {
    var valueNums = [2, 4, 6, 8, 10, 12, 20, 100];
    return valueNums.includes(diceValue);
  }

  DiceRoller.prototype.contains_forbidden_chars = function(string) {
    var allowed_chars = ['1','2','3','4','5','6','7','8','9','0']
    for(index = 0; index < string.length; index++) {
      if(!allowed_chars.includes(string[index])) {
        return true;
      }
    }
    return false;
  }
}

module.exports = DiceRoller;