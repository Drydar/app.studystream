auth.onAuthStateChanged((user) => {
    if (user) {
        const userId = user.uid;
        console.log("User logged in with UID:", userId);

        // Listen for real-time updates
        database.ref("users/" + userId).on("value", (snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                console.log("Live user data:", userData);
                document.getElementById("welcomeMessage").innerText = `Hey, ${userData.username}`;
                document.getElementById("pointsDisplay").innerText = `Points: ${userData.points}`;
            } else {
                console.log("User data not found in database.");
                document.getElementById("welcomeMessage").innerText = "Hey, User";
            }
        });
    } else {
        console.log("No user logged in. Redirecting to login...");
        window.location.href = "login.html";
    }
});

// Logout function
function logout() {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("Logout error:", error);
    });
}