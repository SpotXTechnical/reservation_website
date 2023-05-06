import { useEffect, useState } from "react";
import styles from "./properties.module.css";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import Breadcrumb from "../../Components/BreadCrumb"
import { getPropertyDetails } from "../../app/Apis/PropertyApis"

export default function SignIn() {
  const intl = useIntl();
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState({})

  useEffect(function(){
    if(id) {
      getPropertyDetails(id)
      .then(res => {
        setData(res.data)
      })
    }
  }, [id])

  const items = [
    { label: 'Home', url: '/' },
    { label: 'Properties', url: '/properties' },
  ];

  return (
    <div className={styles.properties_details_container}>
      {/* Head */}
      <div className={`flex-center ${styles.head}`}>
        <div className={styles.bread_crumb}><Breadcrumb items={items}/></div>
        <div className={styles.actions}>
          <span className="cursor-pointer">
            <img src="/assets/green-heart.png" alt="favorite" />
            <span><FormattedMessage id="addToFav"/></span>
          </span>
          <span className="cursor-pointer">
            <img src="/assets/share.png" alt="share" />
            <span><FormattedMessage id="share"/></span>
          </span>
        </div>
      </div>

      {
        data &&
        <div className={`flex-center my-3`}>
          <h2 className={styles.title}>{data.title}</h2>
          <div>
            <img src={"/assets/star.png"} alt="star" />
            <img src={"/assets/star.png"} alt="star" />
            <img src={"/assets/star.png"} alt="star" />
            <img src={"/assets/star.png"} alt="star" />
            <img src={"/assets/star.png"} alt="star" />
          </div>
        </div>
      }

      {data?.images?.length > 0 && 
        <div className={styles.images}>
          <div className="flex-center mb-3">
            <img src={"/assets/unsplash_J9O3WcJ5N74.png"} alt="Feature image" />
          </div>
          <div className="flex-center mb-5">
            <div><img src={"/assets/unsplash_J9O3WcJ5N74.png"} alt="Feature image" /></div>
            <div><img src={"/assets/unsplash_J9O3WcJ5N74.png"} alt="Feature image" /></div>
            <div><img src={"/assets/unsplash_J9O3WcJ5N74.png"} alt="Feature image" /></div>
          </div>
        </div>
      }

      <div className="row">
        <div className="col-md-6">

        <div className="properties-details">
          <div className={styles.specs}>
            <div className="flex-center">
              <span><img src="/assets/bed.png" alt="bed" /></span>
              <span className={styles.flex_column}>
                <span><FormattedMessage id="bedroom"/></span>
                <span>2 <FormattedMessage id="rooms"/></span>
              </span>
            </div>
            <div className="flex-center">
              <span><img src="/assets/bath.png" alt="bed" /></span>
              <span className={styles.flex_column}>
                <span><FormattedMessage id="bathroom"/></span>
                <span>2 <FormattedMessage id="rooms"/></span>
              </span>
            </div>
            <div className="flex-center">
              <span><img src="/assets/area.png" alt="bed" /></span>
              <span className={styles.flex_column}>
                <span><FormattedMessage id="area"/></span>
                <span>450 <FormattedMessage id="ft"/></span>
              </span>
            </div>
          </div>
          <div className={styles.price}>
            <span>5000 <FormattedMessage id="le"/></span><span> / <FormattedMessage id="day"/></span>
          </div>
        
     
        </div>
        <div className={styles.over_view}>
          <div className={styles.title}>
          <FormattedMessage id="overview"/>
            </div>
            <div className={styles.description}>
            {data.title}
            </div>
            <div className={styles.about}>
{data.description}
            </div>

        </div>
      
        </div>
        <div className="col-md-6">

        </div>
      </div>
    </div>
  );
}