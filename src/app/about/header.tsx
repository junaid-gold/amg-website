import Image from "next/image"

const Header = ({
  heading,
  backgroundImage,
  backgroundImageSm,
}: {
  heading: string
  backgroundImage: string
  backgroundImageSm: string
}) => {
  return (
    <div
      className={
        "flex md:justify-end lg:items-center relative max-w-[90rem] about-container"
      }
    >
      <h1
        className={
          "md:w-1/2 w-full px-8 lg:px-6 p-6 relative z-10 text-white about-text font-theme-font-medium md:leading-[120%]"
        }
      >
        {heading}
      </h1>
      <Image
        fill
        src={backgroundImage}
        alt={heading}
        className="z-0 hiddem md:block object-cover object-center"
      />
      <Image
        fill
        src={backgroundImageSm}
        alt={heading}
        className="z-0 md:hidden object-cover object-bottom"
      />
    </div>
  )
}

export default Header
