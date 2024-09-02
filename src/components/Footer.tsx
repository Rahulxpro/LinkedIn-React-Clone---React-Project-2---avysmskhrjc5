const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-1/2 ">
            <h2 className="text-lg font-bold mb-4">About</h2>
            <ul className="list-none flex items-center justify-center gap-4 flex-wrap">
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Accessibility
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Help Center
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Privacy & Terms
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Ad Choices
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Advertising
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/2 ">
            <h2 className="text-lg font-bold mb-4">Business Services</h2>
            <ul className="list-none flex items-center justify-center gap-4 flex-wrap ">
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Get the LinkedIn app
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  More
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>LinkedIn Corporation © 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
