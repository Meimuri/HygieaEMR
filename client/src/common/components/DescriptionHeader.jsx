const DescriptionHeader = ({ header, subheader }) => {
    return (
        <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
                {header}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                {subheader}
            </p>
        </div>
    );
};

export default DescriptionHeader;
