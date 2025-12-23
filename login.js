import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
const db = getDatabase(app);

const handleAuth = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassInput = document.getElementById('confirm-password');

    try {
        if (confirmPassInput) {
            // --- РЕГИСТРАЦИЯ ---
            if (password !== confirmPassInput.value) {
                alert("Пароли не совпадают!");
                return;
            }

            await createUserWithEmailAndPassword(auth, email, password);

            const dbRef = ref(db);
            const snapshot = await get(child(dbRef, `Authorization`));
            let nextId = 1;
            
            if (snapshot.exists()) {
                const data = snapshot.val();
                const ids = Object.keys(data).map(Number).filter(n => !isNaN(n));
                if (ids.length > 0) {
                    nextId = Math.max(...ids) + 1;
                }
            }

            // Записываем только в Authorization
            await set(ref(db, 'Authorization/' + nextId), {
                ID_Authorization: nextId,
                Login: email,
                Password: password
            });

            alert(`Регистрация успешна! Ваш ID: ${nextId}`);
        } else {
            // --- ВХОД ---
            await signInWithEmailAndPassword(auth, email, password);
        }

        window.location.href = "index.html";
    } catch (error) {
        alert("Ошибка: " + error.message);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.querySelector('form');
    if (authForm) authForm.addEventListener('submit', handleAuth);
});