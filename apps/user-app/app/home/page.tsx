import Image from 'next/image';
import phoneImage from '../public/phoneImage.png';

export default function Home() {
  return (
    <div className="max-w-8xl mx-auto flex flex-col lg:flex-row items-center justify-between lg:px-24 px-4 bg-[#F6ECEA]">
      <div className='flex flex-col pl-4'>
        <div className='flex flex-row pt-16 lg:pt-0'>
          <p className='text-[40px] min-[450px]:text-5xl md:text-6xl font-bold text-[#470368] tracking-tight min-[450px]:tracking-wide pr-4'>Seamless</p>
          <p className='text-[40px] min-[450px]:text-5xl md:text-6xl font-bold text-[#AB2BF2] tracking-tight min-[450px]:tracking-wide'>money</p>
        </div>
        <p className='text-[40px] min-[450px]:text-5xl md:text-6xl font-bold text-[#AB2BF2] tracking-wide min-[450px]:pt-4'>Transfers</p>
        <p className='text-[15px] min-[450px]:text-md md:text-xl font-light pt-4 min-[450px]:pt-8 pl-2 w-96'>Send, Receive and manage your money with confidence</p>
      </div>

      <div>
        <Image src={phoneImage} alt="Phone Image" className='mr-24 lg:ml-24 size-auto ' />
      </div>

    </div>
  );
}
