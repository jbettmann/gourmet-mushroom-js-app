

//  IIFE for mushroomList to avoid accidentally accessing the Global state
let mushroomRepo = (function () {
  let mushroomList = [
      //name of object--------------------------------
    { name: 'Shiitake',
      //market value of object $/lbs
      value: 11,
      //flavor notes of ojbect
      flavor: ['nutty', 'meaty']
    },
      //name of object--------------------------------
    { name: 'Oyster',
      //market value of object $/lbs
      value: 12,
      //flavor notes of ojbect
      flavor: ['earthy', 'peppery', 'shellfish']
    },
      //name of object--------------------------------
    { name: 'Lion\'s Mane',
      //market value of object $/lbs
      value: 10,
      //flavor notes of ojbect
      flavor: ['crab', 'lobster']
    },
      //name of object--------------------------------
    { name: 'Chanterelle',
      //market value of object $/lbs
      value: 200,
      //flavor notes of ojbect
      flavor: ['fruity', 'nutty']
    },
      //name of object--------------------------------
    { name: 'White Truffle',
      //market value of object $/lbs
      value: 4500,
      //flavor notes of ojbect
      flavor: ['garlic', 'shallots']
    }
  ];

  // accesses mushroomList array
  function getAll() {
    return mushroomList;
  }

  // adds new mushroom item to mushroomList array
  function add(item) {

    // checks item is an object in order to be summited
    if (typeof item === 'object') {

      //  checks item has identical keys in order to be summited. If so, alerts that new mushroom was found!
      if (Object.keys(mushroomList[0]).every(key => key in item)) {
        alert(`You have found a new mushroom! ${item.name} has been added to your list.`)
        mushroomList.push(item);

      // If not all keys submited, alerts to double check all data is entered.
    } else {
        alert(`The data for the new mushroom you found isn't complete. Please make sure you have no missing fields.`);
      }
    }
    //  If no match, alerts that data is not correct data type.
    else {
      alert(`${item.name} is not a vailed mushroom. Please check to make sure your mushroom is an object!`);
    }
  };
    // filters .mushroomList array by 'name' key
  function searchName(name) {
      // assign the filter function to variable 'findName'
      var findName = mushroomList.filter((mushroom) => {
        // returns 'true' if argument is equal to mushroomList.name is equal
       return mushroom.name === name;
     });
     // returns 'findName' varable to 'searchName' function with new array if mushroom.name === name
    return findName;
  };


  // objects being defined
  return {
    getAll: getAll,
    add: add,
    searchName: searchName
  };
})();

console.log(mushroomRepo.searchName('Shiitake'));

// Executes an example of creating an IIFE (mushroomRepo) and implements methodes (getAll()) to iterate over mushroomList and print array
mushroomRepo.getAll().forEach(function(list) {
      // condition for values 10 and 11 (Shiitake and Lion's Mane)
  if (list.value >= 10 && list.value <= 11) {
    document.write(`<p> ${list.name} (price: ${list.value} $/lbs) <br> <span> That's a pretty reasonable price!</span></p>`);

    // condition for value 200 (Chanterelle)
  } else if (list.value === 200) {
    document.write(`<p> ${list.name} (price: ${list.value} $/lbs) <br> <span> That's an expensive mushroom.</span></p>`);

    // condition for value 4500 (White Truffle)
  } else if (list.value >= 4500) {
    document.write(`<p> ${list.name} (price: ${list.value} $/lbs) <br> <span> WOW. Nevermind, THAT is an expensive mushroom!</span></p>`);

  } else {
    document.write(`<p> ${list.name} (price: ${list.value} $/lbs)</span></p>`);
    }
  });
