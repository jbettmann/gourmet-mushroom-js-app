

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

for (let i = 0; i < mushroomList.length; i++) {
      // condition for values 10 and 11 (Shiitake and Lion's Mane)
  if (mushroomList[i].value >= 10 && mushroomList[i].value <= 11) {
    document.write(`<p> ${mushroomList[i].name} (price: ${mushroomList[i].value} $/lbs) <br> <span> That's a pretty reasonable price!`);

    // condition for value 200 (Chanterelle)
  } else if (mushroomList[i].value === 200) {
    document.write(`<p> ${mushroomList[i].name} (price: ${mushroomList[i].value} $/lbs) <br> <span> That's an expensive mushroom.`);

    // condition for value 4500 (White Truffle)
  } else if (mushroomList[i].value >= 4500) {
    document.write(`<p> ${mushroomList[i].name} (price: ${mushroomList[i].value} $/lbs) <br> <span> WOW. Nevermind, THAT is an expensive mushroom!`);

  } else {
    document.write(`<p> ${mushroomList[i].name} (price: ${mushroomList[i].value} $/lbs)  `);
  }
}
