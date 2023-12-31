import { Link } from 'react-router-dom';
import "tw-elements";
import PropTypes from 'prop-types';


const CardBedroom = ({id, gallery0, kind_h }) =>{

  
   

    return ( 
      <div>
      <figure className="relative transition-all duration-300 cursor-pointer max-w-fit filter grayscale hover:grayscale-0">
         <a>
           <img className="rounded-lg" src={gallery0} alt={kind_h}/>
         </a>
           <figcaption className="absolute px-4 text-lg text-white bottom-6">
             <p>{kind_h}</p>
             <Link to={`/detail/${id}`}>
             <button 
             type="button" 
             className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
             >Reservar</button>
             </Link>
           </figcaption>
           
     </figure>
   </div>


      

    )
}

CardBedroom.propTypes = {
  id: PropTypes.string.isRequired,
  gallery0: PropTypes.string.isRequired,
  kind_h: PropTypes.string.isRequired,
};


export default CardBedroom;