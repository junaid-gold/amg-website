import {
  CassetteIcon,
  CDIcon,
  HalfOpenedIcon,
  OpenedDiskIcon,
  OtherIcon,
  SealedIcon,
  TrackIcon,
  VinylIcon,
} from "@/components/icons"

export const mediaData = [
  {
    title: "Vinyl",
    icon: () => (
      <div>
        <VinylIcon size={"78"} />
      </div>
    ),
  },
  {
    title: "CD",
    icon: () => (
      <div>
        <CDIcon size={"78"} />
      </div>
    ),
  },
  {
    title: "Cassette",
    icon: () => (
      <div>
        <CassetteIcon />
      </div>
    ),
  },
  {
    title: "8-Track",
    icon: () => (
      <div>
        <TrackIcon />
      </div>
    ),
  },
]

export const sizeData = [
  {
    title: "7 inches",
    icon: () => (
      <div>
        <VinylIcon size={"26"} />
      </div>
    ),
  },
  {
    title: "10 inches",
    icon: () => (
      <div>
        <VinylIcon size={"49"} />
      </div>
    ),
  },
  {
    title: "12 inches",
    icon: () => (
      <div>
        <VinylIcon size={"78"} />
      </div>
    ),
  },
  {
    title: "Other",
    icon: () => (
      <div>
        <OtherIcon />
      </div>
    ),
  },
]

export const recordDisplayData = [
  {
    title: "Orignal",
    subTitle: "",
    icon: () => (
      <div>
        <SealedIcon size={"77"} />
      </div>
    ),
  },
  {
    title: "Opened",
    subTitle: "Half Exposed",

    icon: () => (
      <div>
        <HalfOpenedIcon />
      </div>
    ),
  },
  {
    title: "Opened",
    subTitle: "Full Exposed",

    icon: () => (
      <div>
        <OpenedDiskIcon />
      </div>
    ),
  },
  {
    title: "Custom",
    subTitle: "Create your own",

    icon: () => (
      <div>
        <OtherIcon />
      </div>
    ),
  },
]
