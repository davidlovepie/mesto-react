function Card({ likes,link,name,selectedCard, onEnlarge }) {
 
  function handleClick() {
    onEnlarge()
    selectedCard({link,name})
    
  }  
 
  return (
    <li className="elements__item">
      <button type="button" className="elements__delete"></button>
      <img className="elements__image" onClick={handleClick} src={link} alt={name} />
      <div className="elements__info">
        <h2 className="elements__title">{name}</h2>
        <div className="elements__like-counter">
          <button type="button"
            className="elements__like-button"
          ></button>
          <div className="elements__counter">{likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
