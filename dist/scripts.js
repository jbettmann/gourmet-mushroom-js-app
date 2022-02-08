let pokemonRepo = (function() {
  let e = [],
    t = 'https://pokeapi.co/api/v2/pokemon/?limit=150',
    n = document.querySelector('#modal-container');
  function o(t) {
    'object' == typeof t && 'name' in t
      ? e.push(t)
      : alert(
          `${t.name} is not a vailed pokemon. Please check to make sure your mushroom is an object!`
        );
  }
  function a(e, t) {
    return e.addEventListener('click', function() {
      return i(t);
    });
  }
  function i(e) {
    l(e).then(function() {
      s(e);
    });
  }
  function s(e) {
    let t = $('.modal-title'),
      n = $('.modal-body');
    n.empty(), t.empty();
    let o = $('<h1>' + e.name + '</h1>'),
      a = $('<img class="modal-img" style="width:50%">');
    a.attr('src', e.imageUrl);
    let i = $('<p>' + `Height: ${e.height}` + '<p>'),
      s = $('<p>' + `Type(s): ${e.types.join(', ')}` + '<p>');
    t.append(o),
      n.append(a),
      n.append(i),
      n.append(s),
      $('#modal-container').modal();
  }
  function c() {
    n.classList.remove('is-visible');
  }
  function l(e) {
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
      $('.myInput').on('keyup', function() {
        var e = $(this)
          .val()
          .toLowerCase();
        $('.pokemon-list li').filter(function() {
          $(this).toggle(
            $(this)
              .text()
              .toLowerCase()
              .indexOf(e) > -1
          );
        });
      });
    }),
    $(window).on('load', function() {
      $('#loading').hide();
    }),
    window.addEventListener('keydown', e => {
      'Escape' === e.key && n.classList.contains('is-visible') && c();
    }),
    n.addEventListener('click', e => {
      e.target === n && c();
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
      loadDetails: l,
      addListItem: async function(e) {
        let t = document.querySelector('ul'),
          n = document.createElement('li'),
          o = document.createElement('button'),
          i = document.createElement('span'),
          s = document.createElement('span'),
          c = document.createElement('span');
        l(e).then(() => {
          (c.innerText = e.name),
            i.classList.add('shadow'),
            s.classList.add('edge'),
            c.classList.add('front'),
            o.classList.add('pokemon-list-button'),
            n.classList.add('group-list-item'),
            n.classList.add('col');
          let l = document.createElement('img');
          (l.src = e.imageUrl),
            l.classList.add('pokemon-image'),
            o.append(i),
            o.append(s),
            c.append(l),
            o.append(c),
            n.append(o),
            t.append(n),
            a(o, e);
        });
      },
      showDetails: i,
      buttonEventClick: a,
      showModal: s
    }
  );
})();
pokemonRepo.loadList().then(function() {
  pokemonRepo.getAll().forEach(function(e) {
    return pokemonRepo.addListItem(e);
  });
});
