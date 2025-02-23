firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Check if user is logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        const userId = user.uid;

        // Get user data from Firebase Database
        database.ref("users/" + userId).once("value")
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    document.getElementById("welcomeMessage").innerText = `Hey, ${userData.username}`;
                    document.getElementById("pointsDisplay").innerText = `Points: ${userData.points}`;
                } else {
                    document.getElementById("welcomeMessage").innerText = "Hey, User";
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });

    } else {
        // Redirect to login page if not logged in
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