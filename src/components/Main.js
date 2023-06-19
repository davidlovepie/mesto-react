import { useState, useEffect } from 'react'
import { api } from '../utils/Api';
import Card from './Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, selectedCard, onEnlarge}) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);


  useEffect(()=>{
    // api.getProfileInfo()
    // .then((result)=>{
    //   setUserName(result.name)
    //   setUserDescription(result.about)
    //   setUserAvatar(result.avatar)
    // }) 

    Promise.all([
      api.getInitialCards(),
      api.getProfileInfo(),
    ])
    .then(([resultInitial, resultInformation]) => {

      setUserName(resultInformation.name)
      setUserDescription(resultInformation.about)
      setUserAvatar(resultInformation.avatar)
      setCards(resultInitial)
      console.log(resultInitial)
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
    

  }, [])

  return (
   
    <main className="content">
    <section className="profile">
      <button className="profile__avatar" onClick={onEditAvatar}>
        <img className="profile__avatar-update" src={userAvatar} alt="Аватар профиля"/>
      </button>
      <div className="profile__information">
        <div className="profile__container">  
          <h1 className="profile__author">{userName}</h1>
          <button type="button" className="profile__edit" onClick={onEditProfile}></button>
        </div>
        <p className="profile__about">{userDescription}</p>
      </div>
      <button type="button" className="profile__add" onClick={onAddPlace}></button>
    </section>
    <section className="elements" aria-label="Фотогалерея">
      <ul className="elements__list">
        {cards.map((card, index)=>{
          return (
            <Card key={index} likes={card.likes} link={card.link} name={card.name} selectedCard={selectedCard} onEnlarge={onEnlarge}/>
          ) 
        })}
      </ul>
    </section>
  </main>

  );
}

export default Main;

