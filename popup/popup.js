// creating a div to store our image
// const imgDiv = document.createElement("div");
// document.querySelector("body").appendChild(imgDiv);

// const randomPhoto = fetch("https://picsum.photos/list")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`Server response: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//     // now we randomize the image object from the data set
//     const randomNum = Math.floor(Math.random(993));
//     const randomObj = data[randomNum];
//     console.log(`this is the random object from the data set ${randomObj}`);
//     // we access the post url key and append that child
//     const image = document.createElement("img");
//     image.setAttribute("src", "https://picsum.photos/1200/800") //the numbers after the URL specify the dimensions of the image
//     console.log("this is our image", image);

//     imgDiv.appendChild(image);
//   });

// window.onload = function (){
//   console.log(`THIS IS A TEST OF THE ONLOAD FUNCTION.`)
// }

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleButton');
  const blockStatus = document.getElementById('blockStatus');

  // Check the current blocking status when the popup opens
  chrome.storage.local.get('blockingEnabled', (data) => {
      if (data.blockingEnabled) {
          blockStatus.textContent = 'Active';
          toggleButton.textContent = 'Disable Blocking';
          toggleButton.classList.add('active');
          toggleButton.classList.remove('inactive');
      } else {
          blockStatus.textContent = 'Inactive';
          toggleButton.textContent = 'Enable Blocking';
          toggleButton.classList.add('inactive');
          toggleButton.classList.remove('active');
      }
  });

  // Toggle blocking status when the button is clicked
  toggleButton.addEventListener('click', () => {
      chrome.storage.local.get('blockingEnabled', (data) => {
          const newStatus = !data.blockingEnabled; // Toggle the status
          chrome.storage.local.set({ blockingEnabled: newStatus }, () => {
              // Update UI based on new status
              if (newStatus) {
                  blockStatus.textContent = 'Active';
                  toggleButton.textContent = 'Disable Blocking';
                  toggleButton.classList.add('active');
                  toggleButton.classList.remove('inactive');
              } else {
                  blockStatus.textContent = 'Inactive';
                  toggleButton.textContent = 'Enable Blocking';
                  toggleButton.classList.add('inactive');
                  toggleButton.classList.remove('active');
              }
          });
      });
  });
});