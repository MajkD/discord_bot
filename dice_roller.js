DiceRoller = function() {

  DiceRoller.prototype.parse_message = function(message, sender) {
    var message = message.substr(1).slice(0, -1);
    var vals = message.split("D");
    var numDice = vals[0];
    var diceValue = vals[1];

    if (this.contains_forbidden_chars(numDice) || this.contains_forbidden_chars(diceValue)) {
      return this.error("numeric",  numDice + " and " + diceValue);
    }

    numDice = parseInt(numDice);
    diceValue = parseInt(diceValue);

    if (!this.validate_dice_number(numDice)) {
      return this.error("dice_num", numDice);
    }

    if (!this.validate_dice_value(diceValue)) {
      return this.error("dice_val", diceValue);
    }

    return sender + "rolled: " + numDice + " D " + diceValue;
  };

  // Send error messages only to roller
  // TODO Implement proper reply

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

  DiceRoller.prototype.error = function(type, value) {
    if (type == "numeric") {
      return "You entered: " + value + ", Please enter only numerical values"  
    }
    if (type == "dice_num") {
      return "Invalid number of dice: " + value + " (min: 1 max: 20)"
    }
    if (type == "dice_val") {
      return "Invalid dice value: " + value + " (2, 4, 6, 8, 10, 12, 20, 100)"
    }
    return "Ooops there was an error";
  }

}

module.exports = DiceRoller;