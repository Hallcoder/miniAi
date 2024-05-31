// src/components/Layout.js
import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../css/custom.css";
import logo from "../../public/assets/images/logo.jpg";
const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col w-64 bg-white border-r">
        <div className="p-4 border-b">
          {/* Section 2: Company Logo Image */}
          <Image src={logo} alt="Company Logo" width={150} height={50} />
        </div>
        <div className="p-4">
          {/* Section 3: Sidebar */}
          <nav>
            <ul>
              <li>
                <Link href="/face-recognition" className="mx-1 font-semibold">
                  <p>FaceSDK</p>
                </Link>
                <ul className="p-1">
                  <li className="m-1 hover:bg-orange-100 p-1">
                    <Link href="/face-recognition">
                      <p>Face Recognition</p>
                    </Link>
                  </li>
                  <li className="m-1 hover:bg-orange-100 p-1">
                    <Link href="/face-liveness-detection">
                      <p>Face Liveness Detection</p>
                    </Link>
                  </li>
                  <li className="m-1 hover:bg-orange-100 p-1">
                    <Link href="/face-mask-detection">
                      <p>Face Mask Detection</p>
                    </Link>
                  </li>
                  <li className="m-1 hover:bg-orange-100 p-1">
                    <Link href="/face-emotion-detection">
                      <p>Face Emotional Detection</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/id-recognition" className="mx-1 font-semibold">
                  <p>IDSDK</p>
                </Link>
                <ul className="p-1">
                  <li className="m-1 hover:bg-orange-100 p-1">
                    <Link href="/id-card-recognition">
                      <p>ID Card Recognition</p>
                    </Link>
                  </li>
                  <li className="m-1 hover:bg-orange-100 p-1">
                    <Link href="/credit-card-recognition">
                      <p>Credit Card Recognition</p>
                    </Link>
                  </li>
                  <li className="m-1 hover:bg-orange-100 p-1">
                    <Link href="/mrz-barcode-recognition">
                      <p>MRZ/Barcode Recognition</p>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">{children}</div>
    </div>
  );
};

export default Layout;
