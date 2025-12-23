import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCNWOjZ-1-wnHxGM6sHPLgRzAERVdMLPsI",
  authDomain: "sobake6767.firebaseapp.com",
  databaseURL: "https://sobake6767-default-rtdb.firebaseio.com",
  projectId: "sobake6767",
  storageBucket: "sobake6767.firebasestorage.app",
  messagingSenderId: "623982708190",
  appId: "1:623982708190:web:263123873707c2edf9494f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    const guestZone = document.getElementById('guest-zone');
    const userZone = document.getElementById('user-zone');
    const emailDisplay = document.getElementById('user-email-display');
    const initialDisplay = document.getElementById('user-initial');

    if (user) {
        if (guestZone) guestZone.classList.add('hidden');
        if (userZone) userZone.classList.remove('hidden');

        // Отображение почты
        if (emailDisplay) emailDisplay.textContent = user.email;

        // Первая буква почты для аватарки
        if (initialDisplay && user.email) {
            initialDisplay.textContent = user.email.charAt(0).toUpperCase();
        }
    } else {
        if (guestZone) guestZone.classList.remove('hidden');
        if (userZone) userZone.classList.add('hidden');
    }
});

// Логика выхода
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            window.location.reload();
        });
    });
}