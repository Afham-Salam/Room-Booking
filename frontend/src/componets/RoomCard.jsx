import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  return (
    <div className="room-card">
      <h3>{room.name}</h3>
      <p>{room.description}</p>
      <p>Price: ${room.price}</p>
      <Link to={`/rooms/${room._id}`}>Book Room</Link>
    </div>
  );
};

export default RoomCard;
