import { FaLinkedin } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="font-mono bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 pt-8 ">
          <div className="flex flex-col gap-2 items-center justify-center">
            <p className="text-center text-sm text-gray-500">
              &copy; {currentYear} Shadan | NeuraNote. All Rights Reserved.
            </p>
            <div className="inline-flex items-center  gap-3">
              <a
                href="https://www.linkedin.com/in/mohammad-shadan-"
                target="_blank"
              >
                <FaLinkedin className="h-6 w-6 cursor-pointer" />
              </a>
              <a href="https://www.github.com/shadan1212" target="_blank">
                <FaGithubSquare className="h-6 w-6 cursor-pointer" />
              </a>
              <a href="https://x.com/mshadan_" target="_blank">
                <FaSquareXTwitter className="h-6 w-6 cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
