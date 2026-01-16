import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {

  return (
    <Link href="/">
      <Image
        src="/images/logo/Artopolis LOGOa transparentni.png"
        alt="logo"
        width={160}
        height={50}
        quality={100}
  className="h-28 w-auto dark:hidden"
      />
      <Image
        src="/images/logo/Artopolis LOGOa za watermark.png"
        alt="logo"
        width={160}
        height={50}
        quality={100}
        className=" h-28 w-auto  dark:block hidden"
      />
    </Link>
  );
};

export default Logo;