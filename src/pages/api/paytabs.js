export default function handler(request, response) {
  if (request.method === "POST") {
    // const { merchant_staff_tag: reservationId, success } = request.query;
    const { q: reservationId } = request.query;
    const { respStatus: success } = request.body;
    if (success !== "A") {
      response.redirect(302, `/reservations/${reservationId}?success=false`);
    } else {
      response.redirect(302, `/reservations/${reservationId}?success=true`);
    }
  }
}
