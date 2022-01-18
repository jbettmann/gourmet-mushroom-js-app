

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


      // condition for values 10 and 11 (Shiitake and Lion's Mane)
  if (list[i].value >= 10 && list[i].value <= 11) {
    document.write(`<p> ${list[i].name} (price: ${list[i].value} $/lbs) <br> <span> That's a pretty reasonable price!</span></p>`);

    // condition for value 200 (Chanterelle)
  } else if (list[i].value === 200) {
    document.write(`<p> ${list[i].name} (price: ${list[i].value} $/lbs) <br> <span> That's an expensive mushroom.</span></p>`);

    // condition for value 4500 (White Truffle)
  } else if (list[i].value >= 4500) {
    document.write(`<p> ${list[i].name} (price: ${list[i].value} $/lbs) <br> <span> WOW. Nevermind, THAT is an expensive mushroom!</span></p>`);

  } else {
    document.write(`<p> ${list[i].name} (price: ${list[i].value} $/lbs)</span></p>`);
    }
  }
}

printList(mushroomList);
