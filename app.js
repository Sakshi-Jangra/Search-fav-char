const charactersList = document.getElementById('charactersList');

let hpCharacters = [];

const searchBar = document.getElementById('searchBar');
console.log(searchBar);

searchBar.addEventListener('keyup', e => {
  const searchString = e.target.value.toloweCase();

  // if search String contains capital letters ----> small letters also
  // if search str is small -- > small
  // convert name to slower case & cmpare
  // convert house to lowercase & compare

  const filteredCharacters = hpCharacters.filter(character => {
    return (
      character.name.includes(searchString) ||
      character.house.includes(searchString)
    );
  });

  displayCharacters(filteredCharacters);
});

// loads all charachters from site

const loadCharachters = async () => {
  try {
    const res = await fetch('https://hp-api.herokuapp.com/api/characters');
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
    console.log(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = characters => {
  const htmlString = characters
    .map(character => {
      return `
        <li className="character">
            <h2>${character.name}</h2>
            <p>House: ${character.house} </p>
            <img src="${character.image} "></img>
        </li>
        `;
    })
    .join('');
  charactersList.innerHTML = htmlString;
};
loadCharachters();
