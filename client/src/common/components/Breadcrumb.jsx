import { Link } from "react-router-dom";

const Breadcrumb = ({ breadcrumbs = [] }) => {
    const allBreadcrumbs = [
        {
            path: "/",
            name: (
                <>
                    <svg
                        className="w-3 h-3 me-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                </>
            ),
        },
        ...breadcrumbs,
    ];

    return (
        <nav
            className="flex px-5 py-3 text-gray-700 border border-gray-200 bg-white"
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {allBreadcrumbs.map((breadcrumb, index) => (
                    <li
                        key={breadcrumb.path}
                        className="inline-flex items-center"
                    >
                        <Link
                            to={breadcrumb.path}
                            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-blue-400"
                        >
                            {breadcrumb.name}
                        </Link>
                        {index < allBreadcrumbs.length - 1 && (
                            <svg
                                className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
