// It could be written in separate functions but sometimes it makes code over-complex for something this simple.
// This is written procedurally to follow my thinking process.
import './style.css'
import './node_modules/bulma/css/bulma.min.css'
import { inArray } from 'jquery';

const userIdPostsLoaded = [];

// Init
document.addEventListener('DOMContentLoaded', () => {

  // Container for Data
  const divContainer = document.querySelector('#fetch-content');

  // Get Users, the Basis for Related Posts (Not Including Exception on Fetch Error)
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
      // Remove Loader
      divContainer.innerHTML = '';

      // Iterate Data
      for (const key in json) {

        // <div> - Row Record
        const divUserList = document.createElement('div');
        divUserList.classList = 'column is-12';

        // <a> - Anchor Link Triggers Post Records
        const a = document.createElement('a');
        a.href='#';
        a.innerHTML = json[key].username;
        a.dataset.userId = json[key].id;

        // <p> - Paragraph Will Contain Post
        // Doing a Second Fetch Rather than Pre-Populate Data to be a tad more realistic
        const divPostData=document.createElement('div');
        divPostData.dataset.userId = json[key].id;

        // <a> - Add Event Listener
        a.addEventListener('click', function (event) {
          event.preventDefault();
          // Dont Fetch Twice (Yeah, I could remove event listener)
          if (inArray(this.dataset.userId, userIdPostsLoaded)>=0) {
            return;
          }

          userIdPostsLoaded.push(this.dataset.userId);
          const userId = event.target.dataset.userId

          const divPostData=document.querySelector(`div[data-user-id='${userId}']`);

          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(json => {
              console.log(json)
              // Iterate Posts, Just List the Titles
              // divPostData.innerHTML = '' // Clear Previous Data
              console.log(divPostData)
              const ul = document.createElement('ul');
              for (const key in json) {
                console.log(json[key].title)
                // <li> Create Post Title
                const li = document.createElement('li');
                li.textContent=json[key].title;
                ul.appendChild(li);
              }
              divPostData.appendChild(ul)
            })
        })

        divUserList.appendChild(a)
        divUserList.appendChild(divPostData)

        divContainer.appendChild(divUserList)
      }

    }).catch(error => {
      console.log('Error with Fetch Request', error)
    });
})
