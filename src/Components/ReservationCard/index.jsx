import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import Like from "../../../public/assets/like.svg";
import Image from "next/image";
import { getIcon } from "../../app/utils";
const ReservationCard = ({ data }) => {
  const router = useRouter();
  const getDayMonth = (fullDatetime) => {
    const month = fullDatetime.slice(5, 7);
    const day = fullDatetime.slice(8, 10);
    return `${month}-${day}`;
  };
  const icon = getIcon(data.status);
  const handleNavigateToDetails = (id) => {
    router.push(`/reservations/${id}`);
  };

  return (
    <div className="reservation_card d-flex flex-column">
      <div
        className={` d-flex cursor-pointer`}
        onClick={() => handleNavigateToDetails(data.id)}
      >
        <div className="main_image">
          <img src={data.unit.main_image?.url} alt="main image" />
        </div>
        <div className="info">
          <div>
            <p className="unit_type">{data.unit.type}</p>
          </div>
          <h3 className={`mb-3 title`}>{data.unit.title}</h3>
          <p className={`mb-5 details`}>
            <span className="me-3">
              {data.days} <FormattedMessage id="nights" />
            </span>
            <span>
              ( <FormattedMessage id="from" /> &nbsp;
              <span className="date">{getDayMonth(data.from)}</span> &nbsp;
              <FormattedMessage id="to" /> &nbsp;
              <span className="date">{getDayMonth(data.to)}</span> )
            </span>
          </p>
          <p className={`d-flex total_cost`}>
            <span>
              <FormattedMessage id="totalCost" />
            </span>
            <span>
              {data.total_price} <FormattedMessage id="LE" />
            </span>
          </p>
        </div>
        <div className={`d-flex flex-column justify-content-between`}>
          {data.is_reviewed ? (
            <p className={`review cursor-pointer icon-text-alignment`}>
              <span>
                <FormattedMessage id="reviewYourRent" />
              </span>
              <Image {...Like} alt="like" />
            </p>
          ) : (
            <p></p>
          )}
          <p className={`align-self-end status ${data.status}`}>
            {" "}
            <Image {...icon} alt="pending" />
            {data.status}
          </p>
        </div>
      </div>
      {data.status === "negotiation" && (
        <p className="negotiation-msg">
          The owner has sent you suggestions, check them now.{" "}
        </p>
      )}
    </div>
  );
};

export default ReservationCard;
