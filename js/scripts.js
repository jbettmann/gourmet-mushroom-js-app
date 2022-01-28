//  IIFE for pokemonList to avoid accidentally accessing the Global state
let pokemonRepo = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // accesses pokemonList array
  function getAll() {
    return pokemonList;
  }

  // adds new pokemon item to pokemonList array
  function add(item) {
    // checks item is an object in order to be summited
    if (typeof item === 'object' && 'name' in item) {
      // alerts that new pokemon was found!
      pokemonList.push(item);
        // If not valid object, alerts to double check pokemon is an object.
    } else {
      alert(`${item.name} is not a vailed pokemon. Please check to make sure your mushroom is an object!`);
    }
  };

  // adds list items to ul
  function addListItem(pokemonName) {
    // delaries variable
    let pokemonListItems = document.querySelector('ul');
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
    // sets text of button to pokemon name
    spanFront.innerText = pokemonName.name;

    // adds classes to selected span elements
    spanShadow.classList.add('shadow');
    spanEdge.classList.add('edge');
    spanFront.classList.add('front');
    button.classList.add('pokemon-list-button');

    // appends (attaches) passed elements to attached element
    button.appendChild(spanShadow);
    button.appendChild(spanEdge);
    button.appendChild(spanFront);
    listItem.appendChild(button);
    pokemonListItems.appendChild(listItem);

    // Event Listener function to listen for 'click' on <button>, than console log pokemon name of button clicked
    buttonEventClick(button, pokemonName);
  };

 // Event listener for 'click' and console logs name of object clicked.
  // parameter names do not matter, just as long as the match each other in function
 function buttonEventClick(button, pokemon) {
    return button.addEventListener('click', function() {
      return showDetails(pokemon);
    })
  };

  // function logs name of pokemon to console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
    console.log(pokemon);
    });
  }

  // filters .pokemonList array by 'name' key
  function searchName(name) {
    // assign the filter function to variable 'findName'
    var findName = pokemonList.filter((pokemon) => {
      // returns 'true' if argument is equal to pokemonList.name is equal
      return pokemon.name === name;
    });
    // returns 'findName' varable to 'searchName' function with new array if pokemon.name === name
    return findName;
  };

  // objects being defined
  return {
    getAll: getAll,
    add: add,
    searchName: searchName,
    addListItem: addListItem,
    showDetails: showDetails,
    buttonEventClick: buttonEventClick
  };
})();

// Executes an IIFE (mushroomRepo) and implements methodes (getAll()) to iterate over mushroomList and print array
mushroomRepo.getAll().forEach(function(list) {
  return mushroomRepo.addListItem(list);
});
