import { MosqueMetadataType } from "@/types/MosqueDataType";

export default function MosqueMetadata({
  metadata,
}: {
  metadata: MosqueMetadataType;
}) {
  return (
    <div className="flex flex-col items-center text-center text-white">
      {/* Larger logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="m-2 max-w-full max-h-40"
        src={metadata.logo_url}
        alt="Mosque Logo"
      />

      {/* Address and website (no title, since it's in the logo) */}
      {/* <p className="mt-1 text-base md:text-xl">{metadata.address}</p> */}
      {/* <p className="text-base md:text-xl">{metadata.website}</p> */}
    </div>
  );
}



