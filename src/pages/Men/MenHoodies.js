import { Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import loadingBar from "../../assets/images/loader.svg";
import useEffectAfterMount from '../../utils/useEffectAfterMount';
import CategoriesCard from '../../components/CategoriesCard/CategoriesCard';
import "./productCard.css"
import { selectFilterPrices } from '../../redux/filterProducts/filterProductsSlice';
import { getMenHoodies, selectErrorState, selectLoadingState,selectMenHoodies } from '../../redux/menProducts/menHoodiesSlice/menHoodiesSlice';

export default function MenHoodies() {

    const dispatch = useDispatch();
    const menHoodies = useSelector (selectMenHoodies);
    const loading = useSelector (selectLoadingState);
    const error = useSelector(selectErrorState);
    const values = useSelector (selectFilterPrices);

    useEffectAfterMount(() => {
      if (loading === 'idle') {
        dispatch(getMenHoodies())
      }
    }, [loading,dispatch]);

    console.log(menHoodies);
    console.log(values);

    let contentToDisplay = '';
    if (loading === 'loading') {
      contentToDisplay = <div className='flex justify-center items-center h-fit w-full relative'><img className='w-36' src={loadingBar} alt='loading ...'/></div>;
    } else if (loading === 'succeeded') {
      contentToDisplay = <>
      <div className="lg:grid md:grid sm:grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 flex  justify-center flex-wrap  lg:gap-10 gap-5 h-fit w-full">
        {menHoodies?.data?.products.filter(itemCategory => itemCategory.product_title !== null && itemCategory.offer?.price > `$${values[0].toFixed(2).toString()}` && itemCategory.offer?.price < `$${values[1].toFixed(2).toString()}` ).map(itemCategory => (
          <CategoriesCard
          key={itemCategory.product_id}
          srcCategoriesCard={itemCategory.product_photos[0]} 
          textCategoriesCard={itemCategory.product_title}
          categoriesFashionCard={false}
          linkCard="/"
          brand=""
          price={itemCategory.offer?.price}
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