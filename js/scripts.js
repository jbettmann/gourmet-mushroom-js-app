//  IIFE for mushroomList to avoid accidentally accessing the Global state
let mushroomRepo = (function() {
  let mushroomList = [
    //name of object--------------------------------
    {
      name: 'Shiitake',
      //market value of object $/lbs
      value: 11,
      //flavor notes of ojbect
      flavor: ['nutty', 'meaty']
    },
    //name of object--------------------------------
    {
      name: 'Oyster',
      //market value of object $/lbs
      value: 12,
      //flavor notes of ojbect
      flavor: ['earthy', 'peppery', 'shellfish']
    },
    //name of object--------------------------------
    {
      name: 'Lion\'s Mane',
      //market value of object $/lbs
      value: 10,
      //flavor notes of ojbect
      flavor: ['crab', 'lobster']
    },
    //name of object--------------------------------
    {
      name: 'Chanterelle',
      //market value of object $/lbs
      value: 200,
      //flavor notes of ojbect
      flavor: ['fruity', 'nutty']
    },
    //name of object--------------------------------
    {
      name: 'White Truffle',
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

  // adds list items to ul
  function addListItem(mushroomName) {
    // delaries variable
    let mushroomListItems = document.querySelector('ul');
    // creates list items
    let listItem = document.createElement('li');

    // creates buttons for list
    let button = document.createElement('button');
    // creates bottom layer for button styling
    let spanShadow = document.createElement('span');
    // creates middle layer for button styling
    let spanEdge = document.createElement('span');
    // creates front layer of button for styling
    let spanFront = document.createElement('span');
    // sets text of button to mushroom name
    spanFront.innerText = mushroomName.name;

    // adds classes to selected span elements
    spanShadow.classList.add('shadow');
    spanEdge.classList.add('edge');
    spanFront.classList.add('front');
    button.classList.add('mushroom-list-button');

    // appends (attaches) passed elements to attached element
    button.appendChild(spanShadow);
    button.appendChild(spanEdge);
    button.appendChild(spanFront);
    listItem.appendChild(button);
    mushroomListItems.appendChild(listItem);

  }

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
    searchName: searchName,
    addListItem: addListItem
  };
})();

// Executes an IIFE (mushroomRepo) and implements methodes (getAll()) to iterate over mushroomList and print array
mushroomRepo.getAll().forEach(function(list) {
  return mushroomRepo.addListItem(list);
});
