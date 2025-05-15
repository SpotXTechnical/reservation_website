const Title = ({ text }) => {
  return (
    <div className="tw-group">
      <h2 className="tw-text-2xl sm:tw-text-3xl tw-font-bold tw-text-gray-800 tw-relative tw-inline-block">
        {text}
        <span className="tw-absolute tw-bottom-0 tw-left-0 tw-w-1/3 tw-h-1 tw-bg-gradient-to-r tw-from-[#44bcb7] tw-to-[#338e89] tw-transform tw-translate-y-1 group-hover:tw-w-full tw-transition-all tw-duration-300 tw-ease-in-out"></span>
      </h2>
    </div>
  );
};

export default Title;
