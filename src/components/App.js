import { useState, useEffect } from "react";
import { api } from "../utils/Api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEnlargeImagePopupOpen, setIsEnlargeImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // api.getProfileInfo()
    // .then((result)=>{
    //   setUserName(result.name)
    //   setUserDescription(result.about)
    //   setUserAvatar(result.avatar)
    // })

    Promise.all([api.getInitialCards(), api.getProfileInfo()])
      .then(([resultInitial, resultInformation]) => {
        setCurrentUser(resultInformation);
        setCards(resultInitial);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, []);

  function handleCardDelete() {
    // console.log('CARDS1', cards)
    api
      .deleteCard(selectedCard._id)
      .then((deletedCard) => {
        const filteredCards = cards.filter((item) => {
          return selectedCard._id !== item._id;
        });

        setCards(filteredCards);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (isLiked) {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    } else {
      api.addLike(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    }
  }

  function handleUpdateAvatar(obj) {
    console.log(obj);
    api
      .editProfileAvatar(obj)
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateUser(obj) {
    api
      .editProfileInfo(obj)
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleAddImage(obj) {
    api
      .postCard(obj)
      .then((result) => {
        setCards([result, ...cards]);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEnlargeImagePopupOpen(false);
    setIsDeletePopupOpen(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEnlargeClick() {
    setIsEnlargeImagePopupOpen(true);
  }
  function handleDeleteClick() {
    setIsDeletePopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          selectedCard={setSelectedCard}
          onEnlarge={handleEnlargeClick}
          onDelete={handleDeleteClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <ImagePopup
          src={selectedCard.link}
          alt={selectedCard.name}
          isOpen={isEnlargeImagePopupOpen}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          onUpdateImage={handleAddImage}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />

        <DeleteCardPopup
          onDelete={handleCardDelete}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
