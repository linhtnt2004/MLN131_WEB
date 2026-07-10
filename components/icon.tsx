import {
  Home,
  Utensils,
  Users,
  Heart,
  TrendingUp,
  Building2,
  Globe,
  Sprout,
  Infinity,
  HandHeart,
  Link2,
  Scale,
  Vote,
  Handshake,
  UserCheck,
  Smartphone,
  type LucideIcon,
} from "lucide-react"

const icons: Record<string, LucideIcon> = {
  Home,
  Utensils,
  Users,
  Heart,
  TrendingUp,
  Building2,
  Globe,
  Sprout,
  Infinity,
  HandHeart,
  Link2,
  Scale,
  Vote,
  Handshake,
  UserCheck,
  Smartphone,
}

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = icons[name] ?? Home
  return <Cmp className={className} aria-hidden="true" />
}
