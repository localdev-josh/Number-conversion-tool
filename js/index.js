window.onload = fetch_current_date;

// Fetch current datetime
function fetch_current_date() {
  var today = new Date();
  var time = format_ampm(today);
  var dayOfWeek = day_of_week(today.getDay());

  // display in DOM 
  document.getElementById("time").innerHTML = time;
  document.getElementById("dayofweek").innerHTML = dayOfWeek;
}

// Format date to AM/PM
function format_ampm(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

// Get day of the week
function day_of_week(day) {
  console.log("day of week"+ day);
  let dayOfWeeks = "";
  if(day == 1) {
    dayOfWeeks = "Monday";
  } else if(day == 2) {
    dayOfWeeks = "Tuesday";
  } else if(day == 3) {
    dayOfWeeks = "Wednesday";
  } else if(day == 4) {
    dayOfWeeks = "Thursday";
  } else if(day == 5) {
    dayOfWeeks = "Friday";
  } else if(day == 6) {
    dayOfWeeks = "Saturday";
  } else if(day == 7) {
    dayOfWeeks = "Sunday";
  } 
  return dayOfWeeks;
}


// Number conversion starts here
var ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
var tens = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];
var teens = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

function convert_millions(num) {
  if (num >= 1000000) {
    return (
      convert_millions(Math.floor(num / 1000000)) +
      " million " +
      convert_thousands(num % 1000000)
    );
  } else {
    return convert_thousands(num);
  }
}

function convert_thousands(num) {
  let output;
  if (num >= 1000) {
    if (num % 100 == 0) {
      output = convert_hundreds(Math.floor(num / 1000)) + " thousand " +
      convert_hundreds(num % 1000);
    } else {
      var digits = num.toString().split('');
      var digitsToArray = digits.map(Number);
      var lastThreeDigits = 
      convert_array_to_number(digitsToArray.slice(Math.max(digitsToArray.length - 3, 1)));
      // convert_array_to_number(digitsToArray.slice(1));
      if(lastThreeDigits < 100) {
        output = convert_hundreds(Math.floor(num / 1000)) + " thousand and " +
          convert_hundreds(num % 1000);
      } else {
        output = convert_hundreds(Math.floor(num / 1000)) + " thousand " +
          convert_hundreds(num % 1000);
      }
    }
    return output;
  } else {
    return convert_hundreds(num);
  }
}

function convert_hundreds(num) {
  let output;
  if (num > 99) {
    if (num % 100 == 0) {
      output =
        ones[Math.floor(num / 100)] + " hundred " + convert_tens(num % 100);
    } else {
      output =
        ones[Math.floor(num / 100)] + " hundred and " + convert_tens(num % 100);
    }
    return output;
  } else {
    return convert_tens(num);
  }
}

function convert_tens(num) {
  if (num < 10) return ones[num];
  else if (num >= 10 && num < 20) return teens[num - 10];
  else {
    return tens[Math.floor(num / 10)] + " " + ones[num % 10];
  }
}

function convert_array_to_number(array) {
  let result = ""
  for (item of array) {
      result += item
  }
  return result
}

function convert(num) {
  if (num == "") {
    return "Text conversion displays here";
  } else if (num == 0) {
    return "Zero";
  } else if(num.length > 9) {
    return "Input cannot be more than 9 digits";
  } else {
    return convert_millions(parseInt(num));
  }
}

// End of conversion code

function main() {
  var inputVal = document.getElementById("numberInput").value;
  let text = convert(inputVal);
  document.getElementById("conversionDom").innerHTML = text;
}

main();