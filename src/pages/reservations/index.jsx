import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { FormattedMessage } from "react-intl";
import { getReservations } from "../../app/Apis/ReservationApis";
import ReservationCard from "../../Components//ReservationCard";
import { useSelector } from "react-redux";
import store, { langAction } from "../../store";

const Reservations = () => {
	let { lang } = useSelector((state) => state.language);
	if (typeof window !== "undefined") {
	  const storedLanguage = localStorage.getItem("language");
	  const language = storedLanguage ? storedLanguage : "en";
	  store.dispatch(
		language === "ar" ? langAction.langAr() : langAction.langEn()
	  );
	}
  const [data, setData] = useState({})
  const [filterState, setFilterState] = useState('upcoming')

	useEffect(function () {
		getReservations('upcoming')
			.then(res => {
				setData(res.data)
				console.log(res.data)
			})
  }, [lang])

	const handleFilterChange = (val) => {
		setFilterState(val)
		getReservations(val)
			.then(res => {
				setData(res.data)
			})
	}

	return (
		<div className={styles.container}  dir={lang === "ar" ? "rtl" : "ltr"}>
			<h2 className="mb-3"><FormattedMessage id="reservations" /></h2>

			<div className={`d-flex ${styles.filter_btns} mb-3`}>
				<p className={`m-0 text-center cursor-pointer ${filterState == 'upcoming' && 'active'}`} onClick={() => handleFilterChange('upcoming')}>
					<FormattedMessage id="current" /></p>
				<p className={`m-0 text-center cursor-pointer ${filterState == 'past' && 'active'}`} onClick={() => handleFilterChange('past')}>
					<FormattedMessage id="past" /></p>
			</div>

			<div className={styles.reservations}>
			{ data?.length >0 ? 
					data.map((item, i) => {
						return <ReservationCard data={item}/>
					}) 
					: 
					<p className="m-0 text-center"><FormattedMessage id="noDataFound"/></p>
			}
			</div>
		</div>
	);
};

export default Reservations;