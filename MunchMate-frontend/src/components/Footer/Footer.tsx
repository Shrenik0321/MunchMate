import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div>
      <div className="bg-[#d1d5db] p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex justify-center">
            <div className="flex flex-col">
              <div>
                <p className="text-4xl font-semibold">MunchMate</p>
              </div>
              <div className="flex gap-2 mt-2">
                <div className="w-24">
                  <img
                    src="/src/assets/Group.png"
                    alt="PDF Image"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-24">
                  <img
                    src="/src/assets/Group.png"
                    alt="PDF Image"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm">
                  Company # 490039-445, Registered with House of companies.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center   ">
            <div className="flex flex-col">
              <div>
                <p className="text-md font-bold">
                  Get Exclusive Deals in your inbox
                </p>
              </div>

              <div className="my-2">
                <div className="flex w-4/5 items-center space-x-2">
                  <div className="relative w-full">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <Search size={20} color="#f97316" />
                    </span>
                    <Input
                      type="search"
                      placeholder="Search by Name, City or Town"
                      className="pl-10 border border-gray-700 w-full"
                    />
                  </div>
                  <Button type="submit" className="bg-orange-500">
                    Search
                  </Button>
                </div>

                <div className="my-2">
                  <p className="text-sm">We wont spam, read our email policy</p>
                </div>

                <div className="flex my-2 gap-3">
                  <div>
                    <img
                      src="/src/assets/facebook.png"
                      alt="PDF Image"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <img
                      src="/src/assets/instagram.png"
                      alt="PDF Image"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <img
                      src="/src/assets/twitter.png"
                      alt="PDF Image"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <img
                      src="/src/assets/snapchat.png"
                      alt="PDF Image"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <img
                      src="/src/assets/whatsapp.png"
                      alt="PDF Image"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <img
                      src="/src/assets/telegram.png"
                      alt="PDF Image"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-2 grid-flow-col gap-8">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold">Legal Pages</p>
                <p className="text-sm">
                  <a href="#">Terms and Conditions</a>
                </p>
                <p className="text-sm">
                  <a href="#">Privacy</a>
                </p>
                <p className="text-sm">
                  <a href="#">Cookies</a>
                </p>
                <p className="text-sm">
                  <a href="#">Modern Slavery Statement</a>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold">Important Links</p>
                <p className="text-sm">
                  <a href="#">Get Help</a>
                </p>
                <p className="text-sm">
                  <a href="#">Add Your Restaurant</a>
                </p>
                <p className="text-sm">
                  <a href="#">Sign up to deliver</a>
                </p>
                <p className="text-sm">
                  <a href="#">Create a business account</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#03081F] p-4">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-white font-semibold">
              MunchMate.LK Copyright 2024, All Rights Reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <p className="text-sm text-white">
              <a href="#">Privacy Policy</a>
            </p>
            <p className="text-sm text-white">
              <a href="#">Terms and Conditions</a>
            </p>
            <p className="text-sm text-white">
              <a href="#">Pricing</a>
            </p>
            <p className="text-sm text-white">
              <a href="#">Do not sell or share my personal information</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
