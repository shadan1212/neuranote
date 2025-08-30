const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="font-mono bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {currentYear} NeuraNote. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
