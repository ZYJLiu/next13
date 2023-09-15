import CustomCard from "@/components/home/CustomCard"
export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center mt-5 space-x-10 ">
      <CustomCard
        headerTitle="Counter"
        subtitle="Increment a counter"
        imageSrc="https://raw.githubusercontent.com/solana-developers/opos-asset/main/assets/DeveloperPortal/image.png"
        altText=""
        linkUrl="/counter"
      />
      <CustomCard
        headerTitle="Minter"
        subtitle="Mint an NFT"
        imageSrc="https://raw.githubusercontent.com/solana-developers/opos-asset/main/assets/DeveloperToolkit/image.png"
        altText=""
        linkUrl="/mint"
      />
    </div>
  )
}
