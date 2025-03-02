import { MosqueMetadataType } from "@/types/MosqueDataType"

export default function MosqueMetadata({
  metadata,
}: {
  metadata: MosqueMetadataType
}) {
  return (
    <div className="flex flex-col md:flex-row text-white text-center md:text-left">
      <div className="mr-2 flex-shrink-0 self-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="m-1 max-w-full lg:max-w-md max-h-12 mx-auto"
          src={metadata.logo_url}
          alt=""
        />
      </div>
      <div>
        <h2 className="mt-1 md:mt-2 font-bold text-xl md:text-2xl">
          {metadata.name}
        </h2>
        <p className="mt-1 text-base mx-3 md:mx-0">{metadata.address}</p>
        <p className="text-base">{metadata.website}</p>
      </div>
    </div>
  )
}

