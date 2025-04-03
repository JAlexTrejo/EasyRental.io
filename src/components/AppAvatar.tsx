/**
 * Proyecto: EasyRental.io
 * Desarrollado por: Jose Alejandro Trejo
 * Año: 2025
 */


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppAvatarProps {
  src?: string;
  fallback: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const AppAvatar = ({ src, fallback, size = "md" }: AppAvatarProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  // Create initials from fallback text
  const initials = fallback
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <Avatar className={sizeClasses[size]}>
      {src && <AvatarImage src={src} alt={fallback} />}
      <AvatarFallback className="bg-primary text-primary-foreground">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default AppAvatar;
