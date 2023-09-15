"use client"
import React from "react"
import { Card, CardHeader, CardBody } from "@nextui-org/card"
import { Image } from "@nextui-org/image"
import { useRouter } from "next/navigation"

interface CardProps {
  headerTitle: string
  subtitle: string
  imageSrc: string
  altText: string
  linkUrl: string
}

export default function CustomCard({
  headerTitle,
  subtitle,
  imageSrc,
  altText,
  linkUrl,
}: CardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(linkUrl)
  }

  return (
    <Card isPressable isHoverable onClick={handleClick}>
      <CardHeader className="flex-col items-start px-4 pt-2 pb-0">
        <h4 className="font-bold text-large">{headerTitle}</h4>
        <p className="font-bold uppercase text-tiny">{subtitle}</p>
      </CardHeader>
      <CardBody className="py-2 overflow-visible">
        <Image
          alt={altText}
          className="object-cover rounded-xl"
          src={imageSrc}
          width={270}
        />
      </CardBody>
    </Card>
  )
}
