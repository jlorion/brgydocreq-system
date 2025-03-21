
import { Button } from "@/components/ui/button";

const CustomFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="flex flex-col lg:flex-row bg-[#1E453E] justify-between px-10 lg:px-40 py-10 lg:py-20 text-[#F5F7FA] gap-10">
        {/* First Col */}
        <div className="flex-1 space-y-10">
          <div className="text-[#4BAD4E]">
            <h1 className="font-bold text-2xl">Balagunan</h1>
            <p className="text-[#F5F7FA]">SANTO TOMAS</p>
          </div>
          <div className="text-[#F5F7FA] text-sm">
            <p>
              Copyright © {currentYear} Barangay Balagunan <br />
              All rights reserved
            </p>
          </div>
          <div>
            <Button
              className="w-60 flex flex-row items-center justify-center gap-4"
              variant="customizedWithBG"
            >
              Tell us about your project
              <img src="src/assets/Vector.svg" alt="" />
            </Button>
          </div>
        </div>
        {/* Second Col */}
        <div className="flex-1 text-[#F5F7FA] space-y-8">
          <div>
            <h1 className="font-bold text-2xl">Quick Links</h1>
          </div>
          <div>
            <ul className="space-y-5 text-sm">
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of service</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Third Col */}
        <div className="flex-1 space-y-10 text-[#F5F7FA]">
          <div>
            <h1 className="font-bold text-2xl">Visit Us</h1>
          </div>
          <div className="space-y-5 text-sm">
            <div className="flex flex-row space-x-5 items-center">
              <img src="src/assets/Location.png" className="h-7" alt="Icon" />
              <p className="leading-tight">
                Purok 1, Balagunan, Santo Tomas, <br />
                Davao del Norte
              </p>
            </div>
            <div className="flex flex-row space-x-7 items-center">
              <img src="src/assets/Internet.png" className="h-7" alt="Icon" />
              <p>santotomasdavnor.gov.ph</p>
            </div>
          </div>
        </div>
        {/* Fourth Col */}
        <div className="flex-1 space-y-10 text-[#F5F7FA]">
          <div>
            <h1 className="font-bold text-2xl">Contact</h1>
          </div>
          <div className="space-y-8 text-sm">
            <div className="flex flex-row space-x-5 items-center">
              <img src="src/assets/Phone.png" alt="Icon" />
              <p>+63 9211 522 4632</p>
            </div>
            <div className="flex flex-row space-x-5 items-center">
              <img src="src/assets/Email.png" alt="Icon" />
              <p>balagunan@gmail.com</p>
            </div>
          </div>
          <div className="space-y-8 text-sm">
            <h1 className="font-bold text-2xl">Social Media</h1>
            <div className="flex flex-row space-x-5 items-center">
              <img src="src/assets/Facebook.svg" alt="Icon" />
              <p>Barangay Balagunan</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
