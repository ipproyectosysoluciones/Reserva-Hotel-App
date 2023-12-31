import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBedroom } from '../../redux/actions/bedroomsActions';
import CardBedroom from "../CardBedroom/CardBedroom";

const CardsBedroom = () => {
  const dispatch = useDispatch();

  const { bedrooms } = useSelector(state => state.bedrooms);


  useEffect(() => {
    dispatch(getBedroom());
  }, [dispatch]);




 if (!Array.isArray(bedrooms)) {
    return <p>No bedrooms found</p>;
  }

  return (
    <div className="container flex flex-row p-4 mx-auto space-x-4" id="bedroom">
      {bedrooms && bedrooms.map(bedroom => (
        <CardBedroom
          key={bedroom.id}
          id={bedroom.id}
          gallery0={bedroom.gallery[0]}
          kind_h={bedroom.kind_h}
        />
      ))}
    </div>
  );
};

export default CardsBedroom;
