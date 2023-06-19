import {useState} from 'react'

import Header from './Header'
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';



function App() {
 const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
 const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
 const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
 const [isEnlargeImagePopupOpen, setIsEnlargeImagePopupOpen] = useState(false);
 const [selectedCard, setSelectedCard] = useState({})

 function closeAllPopups() {

  setIsEditAvatarPopupOpen(false)
  setIsEditProfilePopupOpen(false)
  setIsAddPlacePopupOpen(false)
  setIsEnlargeImagePopupOpen(false)

 }


 function handleEditAvatarClick(){

  setIsEditAvatarPopupOpen(true)

}

function handleEditProfileClick(){
  setIsEditProfilePopupOpen(true)

}

function handleAddPlaceClick(){

  setIsAddPlacePopupOpen(true)

}

function handleEnlargeClick(){

  setIsEnlargeImagePopupOpen(true)

}

  return (
  
    <div className="page">
      <Header/>
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} selectedCard={setSelectedCard} onEnlarge={handleEnlargeClick}/>
      <Footer/>
      <ImagePopup src={selectedCard.link} alt={selectedCard.name} isOpen={isEnlargeImagePopupOpen} onClose={closeAllPopups}/>
      <PopupWithForm name={'profile'} title={'Редактировать профиль'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>

      <fieldset className="popup__info">
              <input className="popup__input" name="name" type="text" placeholder="Ваше имя" required minLength="2" maxLength="40"/>
              <span className="popup__input-error name-error"></span>
              <input className="popup__input" name="about" type="text" placeholder="О себе" required minLength="2" maxLength="200"/>
              <span className="popup__input-error about-error" ></span>
              <button className="popup__submit" type="submit">Сохранить</button>
            </fieldset>

      </PopupWithForm>

      <PopupWithForm name={'update-avatar'} title={'Обновить аватар'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>

      <fieldset className="popup__info">
              <input className="popup__input" name="avatar" type="url" placeholder="Ссылка на картинку" required/>
              <span className="popup__input-error avatar-error" ></span>
              <button className="popup__submit popup__submit_disabled" disabled type="submit">Сохранить</button>
            </fieldset>

</PopupWithForm>
    
<PopupWithForm name={'images'} title={'Новое место'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>

<fieldset className="popup__info">
              <input className="popup__input" name="name" type="text" placeholder="Название" required minLength="2" maxLength="30"/>
              <span className="popup__input-error name-error" >Вы пропустили это поле.</span>
              <input className="popup__input" name="link" type="url" placeholder="Ссылка на картинку" required/>
              <span className="popup__input-error link-error" ></span>
              <button className="popup__submit popup__submit_disabled" disabled type="submit">Создать</button>
            </fieldset>

</PopupWithForm>


      <template className="element-template">
        <li className="elements__item">
          <button type="button" className="elements__delete"></button>
          <img className="elements__image" src="#" alt=""/>
          <div className="elements__info">
            <h2 className="elements__title"></h2>
    <div className="elements__like-counter">
            <button type="button" className="elements__like-button"></button>
            <div className="elements__counter">0</div>
          </div>
        </div>
        </li>
      </template>
    
      {/* <div className="popup popup_type_profile">
        <div className="popup__container">
          <button type="button" className="popup__close-button popup__close-button_type_profile"></button>
          <h2 className="popup__title"></h2>
          <form className="popup__form" name="editProfile">

          </form>
        </div>
      </div> */}
    
      {/* <div className="popup popup_type_images">
        <div className="popup__container">
          <button type="button" className="popup__close-button popup__close-button_type_images"></button>
          <h2 className="popup__title">Новое место</h2>
          <form className="popup__form" name="imageProfile">

          </form>
        </div>
      </div> */}

    
      <div className="popup popup_type_delete">
        <div className="popup__container popup__container_type_delete">
          <button type="button" className="popup__close-button popup__close-button_type_delete"></button>
          <h2 className="popup__title popup__title_type_delete">Вы уверены?</h2>
          <form className="popup__form" name="imageDelete">
              <button className="popup__submit popup__submit_type_delete" type="submit">Да</button>
          </form>
        </div>
      </div>
    
      {/* <div className="popup popup_type_update-avatar">
        <div className="popup__container popup__container_type_update-avatar">
          <button type="button" className="popup__close-button popup__close-button_type_delete"></button>
          <h2 className="popup__title popup__title_type_update-avatar">Обновить аватар</h2>
          <form className="popup__form" name="avatarUpdate">

          </form>
        </div>
      </div> */}
    
    </div>

  );
}

export default App;

