"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-800",
        active: "bg-green-100 text-green-800",
        completed: "bg-blue-100 text-blue-800",
        draft: "bg-gray-100 text-gray-800",
        closed: "bg-red-100 text-red-800",
        paused: "bg-yellow-100 text-yellow-800",
        featured: "bg-yellow-100 text-yellow-800",
        pending: "bg-yellow-100 text-yellow-800",
        accepted: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800",
        CDI: "bg-blue-100 text-blue-800",
        CDD: "bg-orange-100 text-orange-800",
        Freelance: "bg-purple-100 text-purple-800",
        Stage: "bg-green-100 text-green-800",
        published: "bg-green-100 text-green-800",
        scheduled: "bg-blue-100 text-blue-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };