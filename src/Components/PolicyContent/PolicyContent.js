import Head from "next/head";

export default function PolicyContent() {
  return (
    <>
      <Head>
        <title>Policy | SpotX</title>
        <meta name="description" content={"SpotX Policy"} />
      </Head>

      <main className="tw-min-h-screen tw-bg-gray-50 tw-py-8 tw-px-4">
        <div className="tw-max-w-4xl tw-mx-auto tw-space-y-12">
          {/* English Section */}
          <section className="tw-bg-white tw-rounded-xl tw-shadow-lg tw-p-6 md:tw-p-8">
            <div className="tw-mb-8">
              <h1 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-gray-900 tw-mb-2">
                Cancellation Policies
              </h1>
              <div className="tw-w-20 tw-h-1 tw-bg-blue-600 tw-rounded"></div>
            </div>

            <div className="tw-prose tw-prose-lg tw-max-w-none">
              <p className="tw-text-gray-700 tw-mb-8 tw-leading-relaxed">
                Our platform offers different types of cancellation policies
                depending on the unit you book. Each unit may have different
                conditions, so we strongly recommend reviewing the cancellation
                terms shown on the unit details screen before confirming your
                reservation.
              </p>

              <div className="tw-space-y-8">
                {/* Non-Refundable Policy */}
                <div className="tw-border-l-4 tw-border-red-500 tw-pl-6 tw-py-4 tw-bg-red-50 tw-rounded-r-lg">
                  <div className="tw-flex tw-items-center tw-mb-3">
                    <span className="tw-text-2xl tw-mr-3">❌</span>
                    <h3 className="tw-text-xl tw-font-semibold tw-text-gray-900">
                      Non-Refundable
                    </h3>
                  </div>
                  <p className="tw-text-gray-700 tw-mb-3">
                    You may cancel your reservation at any time; however, no
                    refund will be issued regardless of when the cancellation
                    occurs.
                  </p>
                  <div className="tw-bg-yellow-100 tw-p-3 tw-rounded-lg tw-border-l-4 tw-border-yellow-500">
                    <p className="tw-text-sm tw-text-yellow-800">
                      <strong>Note:</strong> This policy applies as-is, but
                      whether a unit follows this policy or not varies from one
                      unit to another.
                    </p>
                  </div>
                </div>

                {/* Free Cancellation Policy */}
                <div className="tw-border-l-4 tw-border-green-500 tw-pl-6 tw-py-4 tw-bg-green-50 tw-rounded-r-lg">
                  <div className="tw-flex tw-items-center tw-mb-3">
                    <span className="tw-text-2xl tw-mr-3">✅</span>
                    <h3 className="tw-text-xl tw-font-semibold tw-text-gray-900">
                      Free Cancellation
                    </h3>
                  </div>
                  <p className="tw-text-gray-700 tw-mb-3">
                    This policy allows you to cancel your reservation and
                    receive a full refund, if the cancellation is made a certain
                    number of days before check-in.
                  </p>
                  <div className="tw-bg-blue-100 tw-p-3 tw-rounded-lg tw-border-l-4 tw-border-blue-500 tw-mb-3">
                    <p className="tw-text-sm tw-text-blue-800">
                      <strong>Example:</strong> Cancel up to 2 days before
                      check-in for a full refund.
                    </p>
                  </div>
                  <div className="tw-bg-yellow-100 tw-p-3 tw-rounded-lg tw-border-l-4 tw-border-yellow-500">
                    <p className="tw-text-sm tw-text-yellow-800">
                      <strong>Note:</strong> The exact number of days allowed
                      for free cancellation varies depending on the unit.
                    </p>
                  </div>
                </div>

                {/* Flexible Cancellation Policy */}
                <div className="tw-border-l-4 tw-border-orange-500 tw-pl-6 tw-py-4 tw-bg-orange-50 tw-rounded-r-lg">
                  <div className="tw-flex tw-items-center tw-mb-3">
                    <span className="tw-text-2xl tw-mr-3">📅</span>
                    <h3 className="tw-text-xl tw-font-semibold tw-text-gray-900">
                      Flexible Cancellation
                    </h3>
                  </div>
                  <p className="tw-text-gray-700 tw-mb-4">
                    This policy offers partial or full refunds based on how far
                    in advance you cancel:
                  </p>
                  <ul className="tw-space-y-2 tw-mb-4">
                    <li className="tw-flex tw-items-center tw-text-gray-700">
                      <div className="tw-w-2 tw-h-2 tw-bg-green-500 tw-rounded-full tw-mr-3"></div>
                      Full refund if you cancel several days before check-in
                    </li>
                    <li className="tw-flex tw-items-center tw-text-gray-700">
                      <div className="tw-w-2 tw-h-2 tw-bg-yellow-500 tw-rounded-full tw-mr-3"></div>
                      Partial refund (e.g., 40%) if you cancel closer to the
                      check-in date
                    </li>
                    <li className="tw-flex tw-items-center tw-text-gray-700">
                      <div className="tw-w-2 tw-h-2 tw-bg-red-500 tw-rounded-full tw-mr-3"></div>
                      No refund if you cancel within a short window before
                      arrival
                    </li>
                  </ul>
                  <div className="tw-bg-yellow-100 tw-p-3 tw-rounded-lg tw-border-l-4 tw-border-yellow-500">
                    <p className="tw-text-sm tw-text-yellow-800">
                      <strong>Note:</strong> The time periods and refund
                      percentages differ between units. Always review the
                      cancellation details for each specific unit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Arabic Section */}
          <section
            className="tw-bg-white tw-rounded-xl tw-shadow-lg tw-p-6 md:tw-p-8"
            dir="rtl"
          >
            <div className="tw-mb-8">
              <h1 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-gray-900 tw-mb-2">
                سياسات الإلغاء
              </h1>
              <div className="tw-w-20 tw-h-1 tw-bg-blue-600 tw-rounded"></div>
            </div>

            <div className="tw-prose tw-prose-lg tw-max-w-none">
              <p className="tw-text-gray-700 tw-mb-8 tw-leading-relaxed">
                نحن نوفر أنواعًا مختلفة من سياسات الإلغاء حسب كل وحدة حجز. تختلف
                الشروط من وحدة إلى أخرى، لذلك نوصي بمراجعة سياسة الإلغاء
                المعروضة في صفحة تفاصيل الوحدة قبل تأكيد الحجز.
              </p>

              <div className="tw-space-y-8">
                {/* Non-Refundable Policy - Arabic */}
                <div className="tw-border-r-4 tw-border-red-500 tw-pr-6 tw-py-4 tw-bg-red-50 tw-rounded-l-lg">
                  <div className="tw-flex tw-items-center tw-mb-3 tw-flex-row">
                    <span className="tw-text-2xl tw-ml-3">❌</span>
                    <h3 className="tw-text-xl tw-font-semibold tw-text-gray-900">
                      غير قابلة للاسترداد
                    </h3>
                  </div>
                  <p className="tw-text-gray-700 tw-mb-3">
                    يمكنك إلغاء الحجز في أي وقت، ولكن لن يتم استرداد أي مبلغ بغض
                    النظر عن موعد الإلغاء.
                  </p>
                  <div className="tw-bg-yellow-100 tw-p-3 tw-rounded-lg tw-border-r-4 tw-border-yellow-500">
                    <p className="tw-text-sm tw-text-yellow-800">
                      <strong>ملاحظة:</strong> هذه السياسة ثابتة، ولكن تطبيقها
                      يختلف من وحدة إلى أخرى.
                    </p>
                  </div>
                </div>

                {/* Free Cancellation Policy - Arabic */}
                <div className="tw-border-r-4 tw-border-green-500 tw-pr-6 tw-py-4 tw-bg-green-50 tw-rounded-l-lg">
                  <div className="tw-flex tw-items-center tw-mb-3">
                    <span className="tw-text-2xl tw-ml-3">✅</span>
                    <h3 className="tw-text-xl tw-font-semibold tw-text-gray-900">
                      إلغاء مجاني
                    </h3>
                  </div>
                  <p className="tw-text-gray-700 tw-mb-3">
                    تمنحك هذه السياسة إمكانية إلغاء الحجز واسترداد كامل المبلغ،
                    إذا تم الإلغاء قبل عدد معين من الأيام من موعد تسجيل الوصول.
                  </p>
                  <div className="tw-bg-blue-100 tw-p-3 tw-rounded-lg tw-border-r-4 tw-border-blue-500 tw-mb-3">
                    <p className="tw-text-sm tw-text-blue-800">
                      <strong>مثال:</strong> يمكن الإلغاء حتى يومين قبل تسجيل
                      الوصول مع استرداد كامل للمبلغ.
                    </p>
                  </div>
                  <div className="tw-bg-yellow-100 tw-p-3 tw-rounded-lg tw-border-r-4 tw-border-yellow-500">
                    <p className="tw-text-sm tw-text-yellow-800">
                      <strong>ملاحظة:</strong> عدد الأيام المسموح بها للإلغاء
                      المجاني يختلف حسب كل وحدة.
                    </p>
                  </div>
                </div>

                {/* Flexible Cancellation Policy - Arabic */}
                <div className="tw-border-r-4 tw-border-orange-500 tw-pr-6 tw-py-4 tw-bg-orange-50 tw-rounded-l-lg">
                  <div className="tw-flex tw-items-center tw-mb-3">
                    <span className="tw-text-2xl tw-ml-3">📅</span>
                    <h3 className="tw-text-xl tw-font-semibold tw-text-gray-900">
                      إلغاء مرن
                    </h3>
                  </div>
                  <p className="tw-text-gray-700 tw-mb-4">
                    تتيح هذه السياسة استردادًا كليًا أو جزئيًا حسب توقيت
                    الإلغاء:
                  </p>
                  <ul className="tw-space-y-2 tw-mb-4">
                    <li className="tw-flex tw-items-center tw-text-gray-700">
                      <div className="tw-w-2 tw-h-2 tw-bg-green-500 tw-rounded-full tw-ml-3"></div>
                      استرداد كامل عند الإلغاء قبل عدد معين من الأيام من تسجيل
                      الوصول
                    </li>
                    <li className="tw-flex tw-items-center tw-text-gray-700">
                      <div className="tw-w-2 tw-h-2 tw-bg-yellow-500 tw-rounded-full tw-ml-3"></div>
                      استرداد جزئي (مثل 40٪) عند الإلغاء في فترة أقرب من موعد
                      الوصول
                    </li>
                    <li className="tw-flex tw-items-center tw-text-gray-700">
                      <div className="tw-w-2 tw-h-2 tw-bg-red-500 tw-rounded-full tw-ml-3"></div>
                      غير قابل للاسترداد عند الإلغاء في الأيام الأخيرة قبل تسجيل
                      الوصول
                    </li>
                  </ul>
                  <div className="tw-bg-yellow-100 tw-p-3 tw-rounded-lg tw-border-r-4 tw-border-yellow-500">
                    <p className="tw-text-sm tw-text-yellow-800">
                      <strong>ملاحظة:</strong> الفترات الزمنية ونسبة الاسترداد
                      تختلف من وحدة إلى أخرى. يرجى دائمًا مراجعة سياسة الإلغاء
                      الخاصة بكل وحدة على حدة.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
