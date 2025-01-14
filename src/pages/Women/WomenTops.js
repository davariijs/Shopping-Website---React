import { Fragment} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectErrorState, selectLoadingState, selectwomenDresses } from '../../redux/womenProducts/womenProductSlice/womenTopsSlice';
import { getWomenDresses } from '../../redux/womenProducts/womenProductSlice/womenTopsSlice';
import loadingBar from "../../assets/images/loader.svg";
import useEffectAfterMount from '../../utils/useEffectAfterMount';
import CategoriesCard from '../../components/CategoriesCard/CategoriesCard';
import "./productCard.css";

export default function WomenTops({}) {
    const dispatch = useDispatch();
    const womenDresses = useSelector (selectwomenDresses);
    const loading = useSelector (selectLoadingState);
    const error = useSelector(selectErrorState);

    
    const handleWishlist = async (e, title, image, price) => {
      e.preventDefault();
      try {
        let result = await fetch('http://localhost:5000/add-wishlist', {
          method: 'post',
          body: JSON.stringify({ title, image, price }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        result = await result.json();
        console.warn(result);
        if (result) {
          console.log('Data saved successfully');
        }
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

    useEffectAfterMount(() => {
      if (loading === 'idle') {
        dispatch(getWomenDresses())
      }
    }, [loading,dispatch]);
    console.log(womenDresses);


    let contentToDisplay = '';
    if (loading === 'loading') {
      contentToDisplay = <div className='flex justify-center items-center h-fit w-full relative'><img className='w-36' src={loadingBar} alt='loading ...'/></div>;
    } else if (loading === 'succeeded') {
      
      contentToDisplay = <>
      <div className="lg:grid md:grid sm:grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 flex  justify-center flex-wrap  lg:gap-10 gap-5 h-fit w-full">
        {womenDresses?.payload?.products.filter(itemCategory => itemCategory.productTitle !== null  ).map(itemCategory => (
          <CategoriesCard
          onClick={(e) =>
            handleWishlist(
              e,
              itemCategory.productTitle,
              itemCategory.image.url,
              itemCategory.prices[0].regularPrice.minPrice
            )
          }
          key={itemCategory.webID}
          srcCategoriesCard={itemCategory.image.url} 
          textCategoriesCard={itemCategory.productTitle}
          categoriesFashionCard={false}
          linkCard={itemCategory.webID}
          brand=""
          price={itemCategory.prices[0].regularPrice.minPrice}
          />
    ))}
      </div>
      </>
    } else if (loading === 'failed') {
      contentToDisplay = <p>{error}</p>;
    }

  return (
    <Fragment>
       {contentToDisplay} 
    </Fragment>
  )
}
