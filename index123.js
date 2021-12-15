var form = document.getElementById("addForm");
var listItem = document.getElementById("items");

form.addEventListener("submit", addItem);

function addItem(e) {
  e.preventDefault();
  //----------taking values from th eusers--------------------//

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;

  //---------Creating li's Tag's------------------------------//

  // let li = document.createElement('li');
  // li.appendChild(document.createTextNode(name + "--"));
  // li.appendChild(document.createTextNode(email));

  //------Appending to UL Tag-----//

  // listItem.appendChild(li);

  //---------creating Objects--------------------------------//

  let users = {
    name,
    email,
  };

  //---------Storing Details in  the LocaStorage------------//

  // localStorage.setItem(users.email, JSON.stringify(users));

  //--------------calling function to the UserOnScreen--------------------//
  // usersOnScreen(users.email)
  axios
    .post(
      "https://crudcrud.com/api/d618d7a0b20d45f992ba3d2edd982677/bookingApp",
      users
    )
    .then((res) => {
      usersOnScreen(res.data);
      console.log(res);
    })
    .catch((err) => console.log(err));
}

//-----------userDetails on The screen---------//

window.addEventListener("DOMContentLoaded", () => {
  // axios.get is a network call --> asynchronous
  // what is mean by async is ,if I give input uotput will not instantly,there will be delay of few seconds for o/p.
  axios
    .get(
      "https://crudcrud.com/api/d618d7a0b20d45f992ba3d2edd982677/bookingApp"
    )
    .then((response) => {
      console.log(response);

      for (var i = 0; i < response.data.length; i++) {
        usersOnScreen(response.data[i]);
      }
    })
    .catch((err) => console.log(err));

  // const localStorageObj = localStorage;
  // const localStoragekeys = Object.keys(localStorageObj);

  // for (var i = 0; i < localStoragekeys.length; i++) {
  //   const key = localStoragekeys[i];
  //   const userDetailsString = localStorageObj[key];
  //   const userDetailsObj = JSON.parse(userDetailsString);
  // usersOnScreen(userDetailsObj);
  // }
});

function usersOnScreen(users) {
  //   ------------cretaed by sharpener ---------//

  var parentNode = document.getElementById("items");
  const childHTML = `<li id='${users.email}'> ${users.name} -${users.email} <button onclick = deleteUser('${users.email}')>delete</button> <button>edit</button> </li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;

  //-----cretaed by me------//
  //     let li = document.createElement('li');
  //     let btn = document.createElement('button');
  //     btn.appendChild(document.createTextNode('delete'))
  //     let btn2 = document.createElement("button");
  //     btn2.appendChild(document.createTextNode("edit"));
  //     li.appendChild(document.createTextNode(users1.name12 + "--"));
  //     li.appendChild(document.createTextNode(users1.email +" "));
  //     li.appendChild(btn);
  //     li.appendChild(btn2);
  //     listItem.appendChild(li);
}

function deleteUser(emailId) {
  console.log(emailId);
  localStorage.removeItem(emailId);

  deleteUserFromScreen(emailId);
}

function deleteUserFromScreen(emailId) {
  var parentNode = document.getElementById("items");

  const childNodeToBeDeleted = document.getElementById(emailId);

  parentNode.removeChild(childNodeToBeDeleted);
}
