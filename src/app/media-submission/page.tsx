// import TypeMediaView from "@/app/media-submission/views/type-media.view";
// import AlbumDetailsView from "@/app/media-submission/views/album-details.view";
// import SizeRecordView from "@/app/media-submission/views/size-record.view";
// import RecordDisplayView from "@/app/media-submission/views/record-display.view";
// import EstimateValueView from "@/app/media-submission/views/estimate-value.view";
// import InsuranceView from "@/app/media-submission/views/insurance.view";
// import AdOnsView from "@/app/media-submission/views/add-ons.view";
// import ExpeditedView from "@/app/media-submission/views/expedited.view";
// import { getProductType } from "./actions";
// import { ProductItem } from "@/types";
// import CaseType from "./views/case-type";
// import KeyholeMount from "./views/keyhole-mount";
// import ExtraNote from "./views/extra-note";
// import CustomLayoutNote from "./views/custom-layout-note";
// import getServerAuthSession from "@/lib/auth";
// import { redirect } from "next/navigation";
// import View from "./views/view";
// import StepsWrapper from "./views/steps-wrapper";

export const revalidate = 0;

const MediaSubmission = async ({
  params,
  searchParams,
}: {
  params: {};
  searchParams: { currentPage: string };
}) => {
  // const session = await getServerAuthSession();
  // if (!session?.user) {
  //   redirect("/sign-in");
  // }
  // const [productType] = await Promise.all([getProductType()]);
  return (
    <div className={"flex flex-col items-center justify-center min-h-screen"}>
      {/* <View data={productType} /> */}
      {/* Number(currentPage) === 0 ? (
        <BasicInfoView data={signUpData[0]} />
      ) : // <BasicInfoView data={a} />
      Number(currentPage) === 1 ? (
        <OtpView />
      ) :  */}
      {/* <StepsWrapper data={productType} /> */}

      {/* {Number(currentPage) === 0 ? (
        <TypeMediaView
          data={productType?.items?.map((item: ProductItem) => ({
            id: item?.id,
            sku: item?.sku,
            name: item?.name,
            price: item?.price,
            imageUrl: item?.media_gallery_entries?.[0]?.file,
          }))}
        />
      ) : Number(currentPage) === 1 ? (
        // Not in 2
        <AlbumDetailsView
          data={productType?.items?.map((item: ProductItem) => ({
            sku: item?.sku,
            options: item?.options?.filter(
              (optionItem) =>
                optionItem?.title === "Artist" ||
                optionItem?.title === "Album Name" ||
                optionItem?.title === "Record Label" ||
                optionItem?.title === "Catalog Number (If Known)" ||
                optionItem?.title === "Release Year (If Known)" ||
                optionItem?.title === "Discogs ID (If Known)" ||
                optionItem?.title === "Release Year (If Unknown)" // In 3, and 5
            ),
          }))}
        />
      ) : Number(currentPage) === 2 ? (
        // Not in 2,3,4 and 5
        <SizeRecordView
          data={productType?.items?.map((item: ProductItem) => ({
            sku: item?.sku,
            option_id: item?.options?.find(
              (optionItem) => optionItem?.title === "Size"
            )?.option_id,
            options: item?.options?.find(
              (optionItem) => optionItem?.title === "Size"
            )?.values,

            isRequired: item?.options?.find(
              (optionItem) => optionItem?.title === "Size"
            )?.is_require,
          }))}
        />
      ) : Number(currentPage) === 3 ? (
        // Not in 2
        <RecordDisplayView
          data={productType?.items?.map((item: ProductItem) => ({
            sku: item?.sku,
            option_id: item?.options?.find(
              (optionItem) => optionItem?.title === "Type"
            )?.option_id,
            options: item?.options?.find(
              (optionItem) => optionItem?.title === "Type"
            )?.values,
            isRequired: item?.options?.find(
              (optionItem) => optionItem?.title === "Type"
            )?.is_require,
          }))}
        />
      ) : Number(currentPage) === 4 ? (
        // Not in 2
        <EstimateValueView
          data={productType?.items?.map((item: ProductItem) => ({
            sku: item?.sku,
            option_id: item?.options?.find(
              (optionItem) => optionItem?.title === "Declared Value" || optionItem?.title === "48 Hour Express"
            )?.option_id,
            options: item?.options?.find(
              (optionItem) => optionItem?.title === "Declared Value" || optionItem?.title === "48 Hour Express"
            )?.values,
            isRequired: item?.options?.find(
              (optionItem) => optionItem?.title === "Declared Value" || optionItem?.title === "48 Hour Express"
            )?.is_require,
          }))}
        />
      ) : Number(currentPage) === 5 ? (
        // Not in 2
        <InsuranceView
          data={productType?.items?.map((item: ProductItem) => ({
            sku: item?.sku,
            option_id: item?.options?.find(
              (optionItem) =>
                optionItem?.title === "Return Shipping Insurance Amount (EA)"
            )?.option_id,
            options: item?.options?.find(
              (optionItem) =>
                optionItem?.title === "Return Shipping Insurance Amount (EA)"
            )?.values,
            isRequired: item?.options?.find(
              (optionItem) =>
                optionItem?.title === "Return Shipping Insurance Amount (EA)"
            )?.is_require,
          }))}
        />
      ) : Number(currentPage) === 6 ? (
        // Not in 2
        <AdOnsView
          data={productType?.items?.map((item: ProductItem) => ({
            sku: item?.sku,
            option_id: item?.options?.find(
              (optionItem) => optionItem?.title === "Type of Service"
            )?.option_id,
            options: item?.options?.find(
              (optionItem) => optionItem?.title === "Type of Service"
            )?.values,
            isRequired: item?.options?.find(
              (optionItem) => optionItem?.title === "Type of Service"
            )?.is_require,
          }))}
        />
      ) : Number(currentPage) === 7 ? (
        // Not in 2
        <ExpeditedView
          data={productType?.items?.map((item: ProductItem) => ({
            sku: item?.sku,
            option_id: item?.options?.find(
              (optionItem) => optionItem?.title === "Expedited Turnaround"
            )?.option_id,
            options: item?.options?.find(
              (optionItem) => optionItem?.title === "Expedited Turnaround"
            )?.values,
            isRequired: item?.options?.find(
              (optionItem) => optionItem?.title === "Expedited Turnaround"
            )?.is_require,
          }))}
        />
      ) : Number(currentPage) === 8 ? (
        // Not in 2,3,4,5
        <KeyholeMount
          data={productType?.items?.map((item: ProductItem) => ({
            sku: item?.sku,
            option_id: item?.options?.find(
              (optionItem) =>
                optionItem?.title ===
                "Keyhole Mounts (To hang record on a wall)"
            )?.option_id,
            options: item?.options?.find(
              (optionItem) =>
                optionItem?.title ===
                "Keyhole Mounts (To hang record on a wall)"
            )?.values,
            isRequired: item?.options?.find(
              (optionItem) =>
                optionItem?.title ===
                "Keyhole Mounts (To hang record on a wall)"
            )?.is_require,
          }))}
        />
      ) : Number(currentPage) === 9 ? (
        // Not in 2
        <CaseType
          data={productType?.items?.map((item: ProductItem) => ({
            sku: item?.sku,
            option_id: item?.options?.find(
              (optionItem) => optionItem?.title === "Case Type"
            )?.option_id,
            options: item?.options?.find(
              (optionItem) => optionItem?.title === "Case Type"
            )?.values,
            isRequired: item?.options?.find(
              (optionItem) => optionItem?.title === "Case Type"
            )?.is_require,
          }))}
        />
      ) : Number(currentPage) === 10 ? (
        // Not in 2
        <CustomLayoutNote
          data={productType?.items?.map((item: ProductItem) => ({
            sku: item?.sku,
            option_id: item?.options?.find(
              (optionItem) => optionItem?.title === "Custom Layout Note"
            )?.option_id,
            options: item?.options?.find(
              (optionItem) => optionItem?.title === "Custom Layout Note"
            )?.values,
            isRequired: item?.options?.find(
              (optionItem) => optionItem?.title === "Custom Layout Note"
            )?.is_require,
          }))}
        />
      ) : (
        Number(currentPage) === 11 && (
          <ExtraNote
            data={productType?.items?.map((item: ProductItem) => ({
              sku: item?.sku,
              option_id: item?.options?.find(
                (optionItem) =>
                  optionItem?.title ===
                  "Any Special Notes About This Submission? Please add any details that will assist in grading your item. Such as variations, exclusives, give-aways, limited edition numbers, signature names, etc." ||
                  optionItem?.title ===
                  "Describe your custom request (artist info, album, number of additional pieces, special requests, etc...)" ||
                  optionItem?.title === "test"
              )?.option_id,
              options: item?.options?.find(
                (optionItem) =>
                  optionItem?.title ===
                  "Any Special Notes About This Submission? Please add any details that will assist in grading your item. Such as variations, exclusives, give-aways, limited edition numbers, signature names, etc." ||
                  optionItem?.title ===
                  "Describe your custom request (artist info, album, number of additional pieces, special requests, etc...)" ||
                  optionItem?.title ===
                  "test"
              )?.values,

              isRequired: item?.options?.find(
                (optionItem) =>
                  optionItem?.title ===
                  "Any Special Notes About This Submission? Please add any details that will assist in grading your item. Such as variations, exclusives, give-aways, limited edition numbers, signature names, etc." ||
                  optionItem?.title ===
                  "Describe your custom request (artist info, album, number of additional pieces, special requests, etc...)" ||
                  optionItem?.title === "test"
              )?.is_require,
            }))}
          />
        )
      )} */}
    </div>
  );
};

export default MediaSubmission;
