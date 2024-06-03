import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {
  DocumentIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import logo from "../../public/assets/images/logo.jpg";
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

const navigation = [
  {
    name: 'FaceSDK',
    icon: UsersIcon,
    current: false,
    children: [
      { name: 'Face Recognition', href: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/face-recognition` },
      { name: 'Face Liveness Detection', href: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/face-liveness-detection` },
      { name: 'Face Mask Detection', href: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/face-mask-detection` },
      { name: 'Face Emotional Detection', href: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/face-emotional-detection` }
    ]
  },
  {
    name: 'IDSDK',
    icon: DocumentIcon,
    current: false,
    children: [
      { name: 'ID Card Recognition', href: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/id-card-recognition` },
      { name: 'Credit Card Recognition', href: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/` },
      { name: 'MRZ/Barcode Recognition', href: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/` }
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SideBarNavigation() {
    const router = useRouter();
    const goHome = () =>{
        router.push({
            pathname:process.env.NEXT_PUBLIC_FRONTEND_URL
        })
    }
  return (
    <div className="fixed  top-0 left-0 bottom-0 h-screen flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
      <div className="flex shrink-0 m-auto items-center">
        <Link href="/"><Image
          className="h-24 m-auto mt-2 w-auto cursor-pointer"
          src={logo}
        //   onClick={goHome}
          alt="Your Company"
        /></Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <a
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700'
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                      {item.name}
                    </a>
                  ) : (
                    <div>
                      <div
                        className={classNames(
                          item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                          'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700'
                        )}
                      >
                        <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                        {item.name}
                    
                      </div>
                      <ul className="mt-1 px-2">
                        {item.children.map((subItem) => (
                          <li key={subItem.name}>
                            <a
                              href={subItem.href}
                              className={classNames(
                                subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700'
                              )}
                            >
                              {subItem.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
