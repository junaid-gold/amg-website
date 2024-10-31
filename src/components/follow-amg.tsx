import client from "@/sanity/client";
import { followAMGImagesDataQuery } from "@/sanity/query";
import { FollowAmGImage } from "@/types";
import Image from "next/image";
import React from "react";

const FollowAmg = async () => {
  const followAMGImageData: FollowAmGImage = await client.fetch(
    followAMGImagesDataQuery
  );
  return (
    <div
      className={
        "py-20 px-7 w-full lg:px-14 flex flex-col items-center justify-center bg-[#252422]"
      }
    >
      <div
        className={
          "flex flex-row gap-3 max-w-[90rem] overflow-auto pb-3 lg:pb-0"
        }
      >
        <a href={followAMGImageData?.followAMGImageOneInstaUrl} target="_blank" rel="noopener noreferrer">

          <Image
            src={followAMGImageData?.followAMGImageOne}
            alt={"footer"}
            width={319}
            height={344}
            className="rounded-l-3xl overflow-hidden"
          />
        </a>
        <a href={followAMGImageData?.followAMGImageTwoInstaUrl} target="_blank" rel="noopener noreferrer">
          <Image
            src={followAMGImageData?.followAMGImageTwo}
            alt={"footer"}
            width={319}
            height={344}
          />
        </a>
        <a href={followAMGImageData?.followAMGImageThreeInstaUrl} target="_blank" rel="noopener noreferrer">
          <Image
            src={followAMGImageData?.followAMGImageThree}
            alt={"footer"}
            width={319}
            height={344}
          />
        </a>
        <a href={followAMGImageData?.followAMGImageFourInstaUrl} target="_blank" rel="noopener noreferrer">
          <Image
            src={followAMGImageData?.followAMGImageFour}
            alt={"footer"}
            width={319}
            height={344}
            className="rounded-r-3xl overflow-hidden"
          />
        </a>
      </div>
      <a
        href={followAMGImageData?.followAmgInstaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={
          "w-full mt-16 lg:w-fit rounded-full border border-white text-white bg-transparent px-6 py-3"
        }
      >
        <p className={"font-theme-font-roman"}>Follow AMG</p>
      </a>
    </div>
  );
};

export default FollowAmg;
