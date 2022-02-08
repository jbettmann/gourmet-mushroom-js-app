let pokemonRepo = (function() {
  let e = [],
    t = "https://pokeapi.co/api/v2/pokemon/?limit=150",
    n = document.querySelector("#modal-container");
  function o(t) {
    "object" == typeof t && "name" in t
      ? e.push(t)
      : alert(
          `${t.name} is not a vailed pokemon. Please check to make sure your mushroom is an object!`
        );
  }
  function a(e, t) {
    return e.addEventListener("click", function() {
      return i(t);
    });
  }
  function i(e) {
    d(e).then(function() {
      l(e);
    });
  }
  function l(e) {
    (modalTitle = $(".modal-title")),
      (modalBody = $(".modal-body")),
      modalBody.empty(),
      modalTitle.empty();
    let t = $("<h1>" + e.name + "</h1>"),
      n = $('<img class="modal-img" style="width:50%">');
    n.attr("src", e.imageUrl);
    let o = $("<p>" + `Height: ${e.height}` + "<p>"),
      a = $("<p>" + `Type(s): ${e.types.join(", ")}` + "<p>");
    modalTitle.append(t),
      modalBody.append(n),
      modalBody.append(o),
      modalBody.append(a),
      $("#modal-container").modal();
  }
  function s() {
    n.classList.remove("is-visible");
  }
  function d(e) {
    let t = e.detailsUrl;
    return fetch(t)
      .then(function(e) {
        return e.json();
      })
      .then(function(t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.types = []);
        for (let n = 0; n < t.types.length; n++) {
          let o = t.types[n].type.name;
          e.types.push(o[0].toUpperCase() + o.substring(1));
        }
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  return (
    $(document).ready(function() {
      $(".myInput").on("keyup", function() {
        var e = $(this)
          .val()
          .toLowerCase();
        $(".pokemon-list li").filter(function() {
          $(this).toggle(
            $(this)
              .text()
              .toLowerCase()
              .indexOf(e) > -1
          );
        });
      });
    }),
    $(window).on("load", function() {
      $("#loading").hide();
    }),
    window.addEventListener("keydown", e => {
      "Escape" === e.key && n.classList.contains("is-visible") && s();
    }),
    n.addEventListener("click", e => {
      e.target === n && s();
    }),
    {
      getAll: function() {
        return e;
      },
      add: o,
      searchName: function(t) {
        return e.filter(e => e.name === t);
      },
      loadList: function() {
        return fetch(t)
          .then(function(e) {
            return e.json();
          })
          .then(function(e) {
            e.results.forEach(function(e) {
              o({ name: e.name, detailsUrl: e.url });
            });
          })
          .catch(function(e) {
            console.error(e);
          });
      },
      loadDetails: d,
      addListItem: async function(e) {
        let t = document.querySelector("ul"),
          n = document.createElement("li"),
          o = document.createElement("button"),
          i = document.createElement("span"),
          l = document.createElement("span"),
          s = document.createElement("span");
        d(e).then(() => {
          (s.innerText = e.name),
            i.classList.add("shadow"),
            l.classList.add("edge"),
            s.classList.add("front"),
            o.classList.add("pokemon-list-button"),
            n.classList.add("group-list-item"),
            n.classList.add("col");
          let d = document.createElement("img");
          (d.src = e.imageUrl),
            d.classList.add("pokemon-image"),
            o.append(i),
            o.append(l),
            s.append(d),
            o.append(s),
            n.append(o),
            t.append(n),
            a(o, e);
        });
      },
      showDetails: i,
      buttonEventClick: a,
      showModal: l
    }
  );
})();
pokemonRepo.loadList().then(function() {
  pokemonRepo.getAll().forEach(function(e) {
    return pokemonRepo.addListItem(e);
  });
});
