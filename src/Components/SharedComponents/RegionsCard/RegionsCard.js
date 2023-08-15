const RegionsCard = ({ id, name, image, handleClick }) => {
  return (
    <div className="regions_card" key={id} onClick={handleClick}>
      <img src={image} alt="region" className="region_img" />
      <div className="region_title">{name}</div>
    </div>
  );
};

export default RegionsCard;
