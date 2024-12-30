/**
* PHP Email Form Validation - v3.7
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission
    
      let thisForm = this;
      const name = thisForm.querySelector('[name="name"]').value.trim();
      const email = thisForm.querySelector('[name="email"]').value.trim();
      const password = thisForm.querySelector('[name="password"]').value.trim();
    
      // Input validation
      if (!name || !email || !password) {
        displayError(thisForm, "All fields are required.");
        return;
      }
      if (!validateEmail(email)) {
        displayError(thisForm, "Please enter a valid email address.");
        return;
      }
      if (password.length < 6) {
        displayError(thisForm, "Password must be at least 6 characters long.");
        return;
      }
    
      // Proceed with existing form handling
      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      ...
    

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });
// Helper function to validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function php_email_form_submit(thisForm, action, formData) {
  let jsonObject = {};
  formData.forEach((value, key) => {
    jsonObject[key] = value;
  });

  fetch(action, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonObject),
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`);
      }
    })
    .then((data) => {
      thisForm.querySelector(".loading").classList.remove("d-block");
      if (data.trim() === "OK") {
        thisForm.querySelector(".sent-message").classList.add("d-block");
        thisForm.reset();
      } else {
        throw new Error(data || "Form submission failed.");
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
}

  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
