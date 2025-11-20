function getData() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    console.log("Email:", email, "Password:", password);

    let emailpattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let passwordpattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    
    if(email=="" || password==""){
        alert("Fields cannot be empty");
        return;
    }
    
    if (!email.includes("@")){
        alert("Invalid email format");
        return;
    }
    
    if(!email.match(emailpattern)){
        alert("Invalid email format");
        return;
    }
    
    if(!password.match(passwordpattern)){
        alert("Password must be 7-15 characters long and include at least one numeric digit and a special character");
        return;
    }
    
    // Validation successful - send to db.json using different methods
    // Uncomment the method you want to test:
    
    //loginWithXHR(email, password);        // Traditional XMLHttpRequest
    loginWithFetch(email, password);   // Modern Fetch API
    // loginWithJQuery(email, password);  // jQuery AJAX
}

// ============================================================
// METHOD 1: XMLHttpRequest (XHR) - Traditional approach
// ============================================================
// Pros: Works in all browsers, more control over request
// Cons: Verbose syntax, callback-based (callback hell risk)
// Use case: Legacy browser support needed
function loginWithXHR(email, password){
    let formData = {
        username: email.split('@')[0],
        email: email,
        password: password
    };

    console.log("=== METHOD 1: XMLHttpRequest (XHR) ===");
    console.log("Form Data:", formData);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/login", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    xhr.onload = function() {
        if(xhr.status === 200 || xhr.status === 201) {
            console.log("\n✓ XHR Response:");
            console.log(JSON.parse(xhr.responseText));
            console.log("==================\n");
            alert("✓ XHR: Login successful! Data saved to db.json");
        } else {
            console.error("✗ XHR Error: Status", xhr.status);
            alert("Error saving data to server");
        }
    };
    
    xhr.onerror = function() {
        console.error("✗ XHR Network error");
        alert("Network error - Check if JSON server is running");
    };
    
    xhr.send(JSON.stringify(formData));
}

// ============================================================
// METHOD 2: Fetch API - Modern JavaScript approach
// ============================================================
// Pros: Clean syntax, promise-based, native JavaScript
// Cons: Not supported in very old browsers (IE), requires polyfill
// Use case: Modern web applications, best for new projects
function loginWithFetch(email, password){
    let formData = {
        username: email.split('@')[0],
        email: email,
        password: password
    };

    console.log("=== METHOD 2: Fetch API (Modern) ===");
    console.log("Form Data:", formData);

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("\n✓ Fetch Response:");
        console.log(data);
        console.log("Response ID:", data.id);
        console.log("==================\n");
        alert("✓ Fetch: Login successful! Data saved to db.json");
    })
    .catch(error => {
        console.error("✗ Fetch Error:", error.message);
        alert("Error: " + error.message);
    });
}

// ============================================================
// METHOD 3: jQuery AJAX - Library-based approach
// ============================================================
// Pros: Simple syntax, handles browser differences automatically
// Cons: Requires jQuery library (extra KB), overkill for simple requests
// Use case: Projects already using jQuery, cross-browser compatibility
function loginWithJQuery(email, password){
    let formData = {
        username: email.split('@')[0],
        email: email,
        password: password
    };

    console.log("=== METHOD 3: jQuery AJAX ===");
    console.log("Form Data:", formData);

    // Check if jQuery is loaded
    if (typeof jQuery === 'undefined') {
        alert("jQuery is not loaded! Add jQuery CDN to HTML first.");
        console.error("✗ jQuery not found");
        return;
    }

    $.ajax({
        url: 'http://localhost:3000/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(data) {
            console.log("\n✓ jQuery Response:");
            console.log(data);
            console.log("Response ID:", data.id);
            console.log("==================\n");
            alert("✓ jQuery: Login successful! Data saved to db.json");
        },
        error: function(xhr, status, error) {
            console.error("✗ jQuery Error:", status, error);
            alert("Error: " + error);
        }
    });
}

// ============================================================
// COMPARISON SUMMARY (Check console for details):
// ============================================================
/*
┌─────────────┬──────────────┬─────────────────┬─────────────────┐
│   Method    │   Syntax     │  Browser Support│   Best For      │
├─────────────┼──────────────┼─────────────────┼─────────────────┤
│ XHR         │  Verbose     │  All browsers   │  Legacy support │
│ Fetch       │  Clean       │  Modern only    │  New projects   │
│ jQuery      │  Simple      │  All (with lib) │  jQuery apps    │
└─────────────┴──────────────┴─────────────────┴─────────────────┘

// To test different methods, uncomment in getData() function above
*/
