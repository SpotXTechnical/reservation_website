export default function handler(request, response) {
  if ((request.method = "GET")) {
    const { merchant_staff_tag: reservationId, success } = request.query;
    response.redirect(307, `/reservations/${reservationId}?success=${success}`);
  }
}
