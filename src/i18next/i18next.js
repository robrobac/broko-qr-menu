import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({

    resources: {
        en: {
            translation: {
                //  NotFound.jsx
                "404 Page Not Found": "404 Page Not Found",
                Home: "Home",
                Admin: "Admin",
                "Login Required": "Login Required",

                //  Logout.jsx
                Login: "Login",
                Logout: "Logout",

                //  Login.jsx
                "Email Address": "Email Address",
                "Password": "Password",
                "Sign In": "Sign In",
                "Go Back To Home": "Go Back To Home",

                //  SearchBar.jsx
                "Search food and drink menu": "Search food and drink menu",
                "No results for": "No results for",

                //  NewItemModal.jsx
                "Add New Drink": "Add New Drink",
                "Add New Food": "Add New Food",

                //  NewItemModalForm.jsx, EditItemModalForm.jsx
                "Title": "Title",
                "Price": "Price",
                "Category": "Category",
                "Add New Drink Category": "Add New Drink Category",
                "Add New Food Category": "Add New Food Category",
                "Description": "Description",
                "Upload Image": "Upload Image",
                "Clear Image": "Clean Image",
                "Publish": "Publish",

                "Restart to original Image": "Restart to original Image",

                // NewCategoryModalForm.jsx
                "New Category Title": "New Category Title",
                "Save New Category": "Save New Category",
                "Back": "Back",

                //  EditCategoryModal.jsx
                "Edit Category": "Edit Category",
                "Save Changes": "Save Changes",

                //  EditItemModal.jsx
                "Edit Food": "Edit Food",
                "Edit Drink": "Edit Drink",

            }
        },
        hr: {
            translation: {
                //  NotFound.jsx
                "404 Page Not Found": "404 Stranica nije pronađena",
                Home: "Naslovna",
                Admin: "Administrator",
                "Login Required": "Prijava obavezna",

                //  Logout.jsx
                Login: "Prijava",
                Logout: "Odjava",

                //  Login.jsx
                "Email Address": "Email Adresa",
                "Password": "Lozinka",
                "Sign In": "Prijavi Se",
                "Go Back To Home": "Vrati Se Na Naslovnu",

                //  SearchBar.jsx
                "Search food and drink menu": "Pretražite meni hrane i pića",
                "No results for": "Nema rezultata za",

                //  NewItemModal.jsx
                "Add New Drink": "Dodaj Novo Piće",
                "Add New Food": "Dodaj Novu Hranu",

                //  NewItemModalForm.jsx, EditItemModalForm.jsx
                "Title": "Naziv",
                "Price": "Cijena",
                "Category": "Kategorija",
                "Add New Drink Category": "Dodaj Novu Kategoriju Pića",
                "Add New Food Category": "Dodaj Novu Kategoriju Hrane",
                "Description": "Opis",
                "Upload Image": "Učitaj Sliku",
                "Clear Image": "Ukloni Sliku",
                "Publish": "Objavi",

                "Restart to original Image": "Vrati na prvobitnu sliku",

                //  NewCategoryModalForm.jsx
                "New Category Title": "Naziv Nove Kategorije",
                "Save New Category": "Spremi Novu Kategoriju",
                "Back": "Nazad",

                //  EditCategoryModal.jsx
                "Edit Category": "Uredi Kategoriju",
                "Save Changes": "Spremi Promjene",

                //  EditItemModal.jsx
                "Edit Food": "Uredi Hranu",
                "Edit Drink": "Uredi Piće",
            }
        }
    },

    lng: "hr",

})

export default i18next