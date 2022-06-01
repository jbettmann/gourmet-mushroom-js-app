//  IIFE for pokemonList to avoid accidentally accessing the Global state
let pokemonRepo = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");

  // accesses pokemonList array
  function getAll() {
    return pokemonList;
  }

  // adds new pokemon item to pokemonList array
  function add(item) {
    // checks item is an object in order to be summited
    if (typeof item === "object" && "name" in item) {
      // alerts that new pokemon was found!
      pokemonList.push(item);
      // If not valid object, alerts to double check pokemon is an object.
    } else {
      alert(
        `${item.name} is not a vialed pokemon. Please check to make sure your mushroom is an object!`
      );
    }
  }

  // adds list items to ul
  async function addListItem(pokemonName) {
    // declares variable
    let pokemonListItems = document.querySelector("ul");
    // creates list items
    let listItem = document.createElement("li");

    // creates buttons for list
    let button = document.createElement("button");
    // creates bottom layer for button styling
    let spanShadow = document.createElement("span");
    // creates middle layer for button styling
    let spanEdge = document.createElement("span");
    // creates front layer of button for styling
    let spanFront = document.createElement("span");

    // AJAX request to get image url for each pokemon
    loadDetails(pokemonName).then(() => {
      // You mutate the object you pass in. Ideally, you should return a new object that contains the properties you need for this.

      // sets text of button to pokemon name
      spanFront.innerText = pokemonName.name;

      // adds classes to selected span elements
      spanShadow.classList.add("shadow");
      spanEdge.classList.add("edge");
      spanFront.classList.add("front");
      button.classList.add("pokemon-list-button");
      // applys 'group-list-item' class (Bootstrap class name) to 'li'
      listItem.classList.add("group-list-item");
      listItem.classList.add("col");

      let pokemonImage = document.createElement("img");
      pokemonImage.src = pokemonName.imageUrl;
      pokemonImage.classList.add("pokemon-image");

      // myImg.attr("src", pokemonName.imageUrl);

      // appends (attaches) passed elements to attached element
      button.append(spanShadow);
      button.append(spanEdge);
      spanFront.append(pokemonImage);
      button.append(spanFront);
      listItem.append(button);
      pokemonListItems.append(listItem);
      // Event Listener function to listen for 'click' on <button>, than console log pokemon name of button clicked
      buttonEventClick(button, pokemonName);
    });
  }

  // Event listener for 'click' and console logs name of object clicked.
  // parameter names do not matter, just as long as the match each other in function
  function buttonEventClick(button, pokemon) {
    return button.addEventListener("click", function () {
      return showDetails(pokemon);
    });
  }

  // loads detail of pokemon in modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // creates modal using jQuiry
  function showModal(pokemon) {
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");

    modalBody.empty();
    modalTitle.empty();

    //  assign pokemon name to pokemonTitle
    let pokemonTitle = $("<h1>" + pokemon.name + "</h1>");
    //  assign pokemon image scr to pokemonIamge
    let pokemonImage = $('<img class="modal-img" style="width:50%">');
    //  attach pokemon image src to pokemonImage
    pokemonImage.attr("src", pokemon.imageUrl);
    //  assing pokemon height to pokemonHeight
    let pokemonHeight = $("<p>" + `Height: ${pokemon.height}` + "<p>");
    //  attach pokemon types \ to pokemonType
    let pokemonTypes = $(
      "<p>" + `Type(s): ${pokemon.types.join(", ")}` + "<p>"
    );

    // attach pokemonName to modalTitle (pokemonName becomes child element on modalTitle)
    modalTitle.append(pokemonTitle);
    // attach pokemon detals to modalBody (pokemon details becomes child element on modalBody)
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonTypes);

    $("#modal-container").modal();
  }

  // OLD MODAL - BUILT FROM SCRATCH - VANILLA JAVASCRIPT
  // clears modal so only modal clicked on shows and not clicked modals and previous clickd modals
  // modalContainer.innerHTML = '';

  // creates div for modal in modalContainer
  // let modalInside = document.createElement('div');
  // modalInside.classList.add('modal_inside');

  // let modal = document.createElement('div');
  // modal.classList.add('modal');

  // Add the new modal content
  // let closeButtonElement = document.createElement('button');
  // closeButtonElement.classList.add('modal-close');
  // closeButtonElement.innerText = 'X';
  // closeButtonElement.addEventListener('click', hideModal);

  // let titleElement = document.createElement('h1');
  // titleElement.innerText = pokemon.name;

  // let contentElement = document.createElement('p');
  // contentElement.innerText = `Height: ${pokemon.height}`;
  //
  // let typesElement = document.createElement('p');
  // let pokemonTypes = pokemon.types;
  // typesElement.innerText = `Type: ${pokemonTypes.join(', ')}`;
  // Create an <img> element
  // let myImage = document.createElement('img');
  // myImage.src = pokemon.imageUrl;

  // modalInside.appendChild(myImage);
  // modalInside.appendChild(titleElement);
  // modalInside.appendChild(contentElement);
  // modalInside.appendChild(typesElement);
  // modal.appendChild(closeButtonElement);
  // modal.appendChild(modalInside);
  // modalContainer.appendChild(modal);
  //
  // modalContainer.classList.add('is-visible');

  // hides modal by removing 'is-visible' class from modalContainer
  function hideModal() {
    modalContainer.classList.remove("is-visible");
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
  }

  // Function Loads pokemon details from external API
  function loadList() {
    // make a request/fetches to API for data
    return fetch(apiUrl)
      .then(function (response) {
        // returns a JSON
        return response.json();
      })
      .then(function (json) {
        // .results come frome the pokemon api url. Open url and find the "results" at top of page
        json.results.forEach(function (item) {
          // creates pokemon object with key-value pair from external API
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          // adds pokemon to pokemonList via add() fucntion
          add(pokemon);
        });
        // catches any errors
      })
      .catch(function (e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-disable no-console */
      });
  }

  // loads data from pokemon api and defines objects with key-value
  function loadDetails(item) {
    // .detailUrl refers to variable defined above in .loadList function
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (respones) {
        return respones.json();
        // gets key names and values for inside detailUrl link
      })
      .then(function (details) {
        // item refers to the parameter set above. imageUrl is made up, can be what you want it to be.
        // .sprites referes to image source in pokemon api URL
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        // create an empty array for pokemon types
        item.types = [];
        // run a loop over types to and sets typeDetails to types via API path
        for (let i = 0; i < details.types.length; i++) {
          let typeDetails = details.types[i].type.name;
          // pushes typeDetails to item.types array.
          // Also sets first letter of each type to uppercase with toUpperCass and .substring
          item.types.push(
            typeDetails[0].toUpperCase() + typeDetails.substring(1)
          );
        }
      })
      .catch(function (e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-disable no-console */
      });
  }

  // searches for pokemon name in search input field on HTML
  $(document).ready(function () {
    $(".myInput").on("input", function () {
      // .toLowerCase makes the search case insensitive
      var value = $(this).val().toLowerCase();
      // .toggle removes any rows(search items) that do not match
      $(".pokemon-list li").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });

  // removes loading icon (div id="loading") once page has loaded
  $(window).on("load", function () {
    $("#loading").hide();
  });

  // adds event listener to modal above in showDetails to close when "escape" key is presed
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });
  // adds event listener to modal above in showDetails to close when click
  // specifically happens outside of modal or in modalContainer
  modalContainer.addEventListener("click", (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  // objects being defined
  return {
    getAll,
    add,
    searchName,
    loadList,
    loadDetails,
    addListItem,
    showDetails,
    buttonEventClick,
    showModal,
  };
})();

// fetches data from external API to show pokemon data
pokemonRepo.loadList().then(function () {
  // Executes an IIFE (mushroomRepo) and implements methodes (getAll()) to iterate over mushroomList and print array
  pokemonRepo.getAll().forEach(function (list) {
    return pokemonRepo.addListItem(list);
  });
});
