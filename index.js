//run f on dom load
document.addEventListener('DOMContentLoaded', fetchVolunteer)
//fetch randomuser data from API then run f
function fetchVolunteer() {
    fetch("https://randomuser.me/api/")
    .then(res => res.json())
    .then(data => displaySubject(data))
}

//create initial heading with subjects first and last name
function displaySubject(data) {
    randomSubject.innerHTML = "";
    let volunteer = data.results[0];
    let subjectName = (volunteer.name.first + " " + volunteer.name.last);
    let heading = document.createElement("h1");
    heading.innerHTML = subjectName;
    heading.setAttribute("id", "usersName")
    randomSubject.appendChild(heading);
//add image below the header
    let subjectImg = document.createElement("img");
    subjectImg.src = volunteer.picture.large;
    subjectImg.setAttribute("id", "usersImg")
    randomSubject.appendChild(subjectImg);
//add country below image
    let subjCountry = document.createElement("p");
    subjCountry.innerHTML = volunteer.location.country;
    randomSubject.appendChild(subjCountry);
//add user cell data
    let subjCell = document.createElement('p');
    subjCell.innerHTML = volunteer.cell;
    subjCell.setAttribute("id", "usersCell");
    randomSubject.appendChild(subjCell);
//add user age, no display
    let subjAge = document.createElement('p');
    subjAge.innerHTML = volunteer.dob.age;
    subjAge.setAttribute('id','usersAge');
    randomSubject.appendChild(subjAge);
    document.getElementById('usersAge').hidden = true;
}

//next user button activated
document.getElementById('nextProfile').addEventListener('click', fetchVolunteer);

let agesArray = [];

//add subject button activated leading to f addtolist
document.getElementById('addSubject').addEventListener('click', addToList);
//creates a new list item from the current random user
function addToList() {
    let heading1 = document.createElement('h1');
    let newHeader = document.getElementById('usersName');
    heading1.innerHTML = newHeader.innerHTML;
    subjectList.appendChild(heading1);

    let subjectImg1 = document.createElement('img');
    let imgElement = document.getElementById('usersImg');
    let newImg = imgElement.cloneNode(true);
    subjectImg1 = newImg;
    subjectList.appendChild(subjectImg1);

    let subjCell1 = document.createElement('p');
    let newCell = document.getElementById('usersCell');
    subjCell1.innerHTML = newCell.innerHTML;
    subjectList.appendChild(subjCell1);

    let subjAge1 = document.createElement('p');
    let newAge = document.getElementById('usersAge');
    subjAge1.innerHTML = newAge.innerHTML;

    agesArray.push(subjAge1.textContent);
}


document.getElementById('filter').addEventListener('click', filterAge);
function filterAge() {
  agesArray.forEach(saveYounglings);
}
function saveYounglings(item, agesArray) {
  if (item < 30) {
    alert(`Age: ${item} years old, outside of the standard age parameters for these studies.`);
  } else {
    alert(`Age: ${item} years old, within the standard age parameters for these studies.`);
  }
}


//mouseover mouseout events for addsubject and nextprofile btns
document.getElementById('addSubject').addEventListener('mouseover', (e) => {
  e.target.style.color = 'blue';
})

document.getElementById('addSubject').addEventListener('mouseout', (e) => {
  e.target.style.color = 'black';
})

document.getElementById('nextProfile').addEventListener('mouseover', (e) => {
  e.target.style.color = 'red';
})

document.getElementById('nextProfile').addEventListener('mouseout', (e) => {
  e.target.style.color = 'black';
})

//on dom load, add submit functionality to form || run f on input value
document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      newNote(e.target["newNote"].value)
      form.reset()
    });
  });
  
  //create notes list from input, if no input alert user || adds delete btn
  function newNote(userNote) {
    let li = document.createElement('li');
    let btn = document.createElement('button');
      btn.addEventListener('click', handleDelete);
      btn.textContent = 'X';
      btn.setAttribute('id', 'xBtn');
    li.textContent = `${userNote} `;
    if (`${userNote}` === '') {
        alert("That's not a very useful note!");
    } else {
        document.querySelector('#myNotes').appendChild(li);
    }
    li.appendChild(btn);
  }
  
  function handleDelete(e) {
      e.target.parentNode.remove();
    }
