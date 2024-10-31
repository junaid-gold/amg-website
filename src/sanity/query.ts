import { groq } from "next-sanity";

export const layoutDataQuery = groq`*[_type == "layout"][0]{
    email, 
    tiktokURL,
    instagramURL,
    xURL,
  }`;

export const homeDataQuery = groq`
    *[_type == "homePage"][0]{
        hero
    }
  `;

export const followAMGImagesDataQuery = groq`
*[_type == "homePage"][0]{
     "followAMGImageOne": followAMGImageOne.asset -> url,
     "followAMGImageTwo": followAMGImageTwo.asset -> url,
     "followAMGImageThree": followAMGImageThree.asset -> url,
     "followAMGImageFour": followAMGImageFour.asset -> url,
     followAMGImageOneInstaUrl,
     followAMGImageTwoInstaUrl,
     followAMGImageThreeInstaUrl,
     followAMGImageFourInstaUrl,
     followAmgInstaUrl,
}
`;

export const heroOneDataQuery = groq`
  *[_type == "heroSectionOne"][0]{
      heading,
      text,
     "backgroundImage": backgroundImage.asset -> url,
  }`;
export const heroTwoDataQuery = groq`
  *[_type == "heroSectionTwo"][0]{
      heading,
      text,
     "backgroundImage": backgroundImage.asset -> url,
  }`;

export const heroThreeDataQuery = groq`
*[_type == "heroSectionThree"][0]{
    heading,
    text,
   "backgroundImage": backgroundImage.asset -> url,
}`;

export const heroFourDataQuery = groq`
  *[_type == "heroSectionFour"][0]{
      heading,
      text,
     "backgroundImage": backgroundImage.asset -> url,
  }`;

export const whyGradeDataQuery = groq`
  *[_type == "whyGrade"] | order(_createdAt asc){
      heading,
      text,
     "image": image.asset -> url,
  }
  `;

export const howItWorksDataQuery = groq`
*[_type == "howItWork"]{
    heading,
    text,
}
`;

export const cassetteDataQuery = groq`
*[_type == "cassette"] | order(_createdAt asc){
    heading,
    text,
    buttonText,
    "backgroundColor":backgroundColor.hex,
   "image": image.asset -> url,
}
`;

export const signUpDataQuery = groq`
*[_type == "signUp"]{
  heading,
  text, 
  inputPlaceholderOne,
  inputPlaceholderTwo,
  inputPlaceholderThree,
}`;

export const questionOneDataQuery = groq`
*[_type == "questionOne"]{
  heading,
  text, 
  submissionItems[]{
    heading,
    text,
    sku,
    "image": image.asset->url
  }
}`;

export const questionTwoDataQuery = groq`
*[_type == "questionTwo"]{
  heading,
  text, 
  inputPlaceholderOne,
  inputPlaceholderTwo,
  inputPlaceholderThree,
  inputPlaceholderFour,
  inputPlaceholderFive,
  inputPlaceholderSix,
}`;

export const questionThreeDataQuery = groq`
*[_type == "questionThree"]{
  heading,
  text, 
  sizeItems[]{
    label,
    text,
    "image": image.asset->url
  }
}`;

export const questionFourDataQuery = groq`
*[_type == "questionFour"]{
  heading,
  text, 
  displayModes[]{
    label,
    heading,
    text,
    "image": image.asset->url
  }
}`;

export const questionFiveDataQuery = groq`
*[_type == "questionFive"]{
  heading,
  text, 
  minValue,
  maxValue,
  label
}`;

export const insuranceDisclaimerDataQuery = groq`
*[_type == "insuranceDisclaimer"]{
heading,
text,
inputPlaceholder,
radioButtonPlaceholder}`;

export const addOnsDataQuery = groq`
*[_type == "addOns"]{
heading,
text,
addOns[]{
heading,
label
},
}`;

export const shippingOptionsDataQuery = groq`
*[_type == "shippingOptions"]{
heading,
text,
shippingOptions[]{
heading,
label
},
}`;

export const aboutDataQuery = groq`
    *[_type == "aboutPage"][0]{
        heading,
        "aboutHero": aboutHero->{
        "backgroundImage": backgroundImage.asset -> url,
        "backgroundImageSm": backgroundImageSm.asset -> url,
        }
    }
  `;



export const aboutHighlightsDataQuery = groq`
*[_type == "aboutCard"]{
    heading,
    text,
    "image": image.asset -> url,
}
`;

export const whyUseAmgDataQuery = groq`
  *[_type == "whyUseAmg"]{
      heading,
      text,
     "image": image.asset -> url,
  }
  `;

export const careerDataQuery = groq`
*[_type == "careerPage"][0]{
    heading,
    text
}
`;

export const jobsDataQuery = groq`
*[_type == "job"]{
    heading,
    text,
    "color": color.hex,
    tags[]{
    label
    }
}
`;

export const archiveDataQuery = groq`
*[_type == "archivingPage"][0] {
  heading,
  text,
  inputPlaceholder,
  description,
  types[] {
    heading,
    "image": image.asset->url
  },
  variations[] {
    heading,
    "image": image.asset->url,
    color
  },
  descriptionOne,
  descriptionTwo
}
`


export const whatWeArchiveDataQuery = groq`
*[_type == "whatWeArchive"] {
  heading,
  text,
  "backgroundColor": backgroundColor.hex,
  description
}
`

export const contactDataQuery = groq`
  *[_type == "contactPage"][0] {
    text,
    inputPlaceHolderOne,
    inputPlaceHolderTwo,
    inputPlaceHolderThree,
    phone,
    email,
    address,
    iframeUrl,
    description,
    inputPlaceHolderFour
  }
`;


export const merchDataQuery = groq`
*[_type == "merch"]  | order(_createdAt asc) {
  title,
  price,
  "image": image.asset->url 
}
`;



export const helpDataQuery = groq`
    *[_type == "helpPage"][0]{
        heading,
        text,
        "backgroundImage": backgroundImage.asset -> url,
        "backgroundImageSm": backgroundImageSm.asset -> url,
    }
  `;



export const faqDataQuery = groq`
*[_type == "faq"] | order(_createdAt asc) {
    heading,
    text,
    questions[]{
    question,
    answer
    }
}
`;

export const tocDataQuery = groq`
    *[_type == "termsAndConditionPage"][0]{
        authenticity,
        rejectionOfSubmittals,
        lossOrDamagToItems,
        inspectionOfItem,
        servicesTimeOfCompletion,
        forfeitureOfItems,
        indemnificationReleaseAndLimitationOfDamages,
        useOfPhotographs,
        actsOfGod,
        acknowledgement,
        warranty
    }
  `;

export const privacyDataQuery = groq`
  *[_type == "privacyPolicyPage"][0]{
      privacyAndMarketingPolicy,
      informationWeMayCollect,
      reviewingAndUpdatingYourInformation,
      thirdPartyWebsite,
      cookies,
      security,
      useOfSubmissionsForMarketingPurposes,
      updatesToOurPrivacyPolicy
  }
`;

export const refusalDataQuery = groq`
      *[_type == "refusalPolicyPage"][0]{
          ourPolicy
      }
`;


export const returnDataQuery = groq`
      *[_type == "returnPage"][0]{
          repairPolicy,
          contactDescription
      }
`;