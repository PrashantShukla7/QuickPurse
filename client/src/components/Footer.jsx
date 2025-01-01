const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Logo and Description */}
                    <div className="w-[60%]">
                        <h2 className="text-2xl font-bold text-green-400">
                            QuickPurse
                        </h2>
                        <p className="mt-4 text-gray-400">
                            Your trusted partner for seamless digital payments.
                            Quick, secure, and hassle-free!
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-green-400 mb-4">
                            Contact Us
                        </h3>
                        <p className="text-gray-400 hover:text-green-400 transition">
                            <a href="mailto:pshukla3924@gmail.com">
                                <i className="ri-mail-fill"></i>{" "}
                                pshukla3924@gmail.com
                            </a>
                        </p>

                        <div className="flex mt-2 space-x-4">
                            <a
                                href="https://github.com/PrashantShukla7"
                                className="text-gray-400 hover:text-green-400 transition"
                                aria-label="Facebook"
                            >
                                <i className="ri-github-fill"></i>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/prashant-shukla7/"
                                className="text-gray-400 hover:text-green-400 transition"
                                aria-label="LinkedIn"
                            >
                                <i className="ri-linkedin-box-fill"></i>
                            </a>
                            <a
                                href="https://prashantshukla.vercel.app/"
                                className="text-gray-400 hover:text-green-400 transition"
                                aria-label="Twitter"
                            >
                                <i className="ri-global-fill"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} QuickPurse. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
