const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
// get search string in input of html , use to search through data
//make API request to backend ,get filtered data
let hpCharacters = []; // reference to all the harry potter charcters

searchBar.addEventListener('keyup', e => {
  const searchString = e.target.value.toLowerCase();
  // if search String contains capital letters ----> small letters also
  // if search str is small -- > small
  // convert name to lower case & cmpare
  // convert house to lowercase & compare

  // filter and map functions array functions that can be used in JS
  const filteredCharacters = hpCharacters.filter(character => {
    return (
      // if the characters is in the name or house then return it
      character.name.toLowerCase().includes(searchString) ||
      character.house.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch('https://hp-api.herokuapp.com/api/characters');
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = characters => {
  const htmlString = characters
    .map(character => {
      return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
                <img src="${character.image}"></img>
            </li>
        `;
    })
    .join('');
  document.getElementById('charactersList').innerHTML = htmlString;
};

loadCharacters();
