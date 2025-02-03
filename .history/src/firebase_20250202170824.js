import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Импортируем аутентификацию

// Ваши данные конфигурации Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAd98ELl-rwJHH9V03smPR2ytW-SCmNMXA",
  authDomain: "rent-74a6b.firebaseapp.com",
  projectId: "rent-74a6b",
  storageBucket: "rent-74a6b.firebasestorage.app",
  messagingSenderId: "536713412031",
  appId: "1:536713412031:web:44ef722fb8cd6b9c16f50a"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Получаем объект аутентификации
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
