import Data from '../data.js'

const Card = () => {
  const data = Data

  return (
    <div className='card-list'>
      {data.map((item, index) => (
        <div className="card" key={index}>
          {(() => {
            if (item.openSpots === 0) {
              return (
                <div className='card-badge'>SOLD OUT</div>
              )
            } else if (item.location === "Online") {
              return (<div className='card-badge'>ONLINE</div>
              )
            }

            return null;
          })()}
          <img src={`../images/${item.coverImg}`} className="card-image" />
          <div className="card-stats">
            <img src="../images/star.png" className="card-star" />
            <span>{item.stats.rating}</span>
            <span className="gray">{item.stats.reviewCount} • </span>
            <span className="gray">{item.location}</span>
          </div>
          <p className='card-title'>{item.title}</p>
          <p><span className="bold">From ${item.price}</span> / person</p>
        </div >
      ))}
    </div>
  );
};

export default Card;
