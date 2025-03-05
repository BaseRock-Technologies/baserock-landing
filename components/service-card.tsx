import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ElementType
}

export function ServiceCard({ title, description, icon: Icon }: ServiceCardProps) {
  return (
    <Card className="service-card h-full">
      <CardContent className="flex h-full flex-col items-center p-6 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

