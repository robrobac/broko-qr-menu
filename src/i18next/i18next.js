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
                Manage: "Manage",

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
                "English Title": "English Title",
                "Price": "Price",
                "Category": "Category",
                "Add New Drink Category": "Add New Drink Category",
                "Add New Food Category": "Add New Food Category",
                "Description": "Description",
                "English Description": "English Description",
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

                //  ProductCard.jsx
                "Published": "Created",
                "Edited": "Edited",

                //  AdminItems.jsx
                "Item Delete Confirmation": "Are you sure you want to delete this product? You won't be able to restore it once deleted",

                //  TabContent.jsx
                "Category Delete Confirmation": "Deleting this category will also delete all items within it. Are you sure you want to proceed?",

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
                Manage: "Upravljaj",

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
                "English Title": "Engleski Naziv",
                "Price": "Cijena",
                "Category": "Kategorija",
                "Add New Drink Category": "Dodaj Novu Kategoriju Pića",
                "Add New Food Category": "Dodaj Novu Kategoriju Hrane",
                "Description": "Opis",
                "English Description": "Engleski Opis",
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

                //  ProductCard.jsx
                "Published": "Objavljeno",
                "Edited": "Uređeno",

                //  AdminItems.jsx
                "Item Delete Confirmation": "Jeste li sigurni da želite izbrisati ovaj proizvod? Nakon brisanja nećete ga moći vratiti",

                //  TabContent.jsx
                "Category Delete Confirmation": "Brisanje ove kategorije također će izbrisati sve stavke unutar nje. Jeste li sigurni da želite nastaviti?",
            }
        }
    },

    lng: "hr",

})

export default i18next