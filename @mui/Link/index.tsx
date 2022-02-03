import { forwardRef, Ref } from "react";
import Link, { LinkProps } from "next/link";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";

type LinkRef = HTMLAnchorElement;
type NextLinkProps = Omit<MuiLinkProps, "href" | "classes"> &
  Pick<LinkProps, "href" | "as" | "prefetch" | "locale">;

export const NextLink = forwardRef<LinkRef, NextLinkProps>(
  ({ href, as, prefetch, locale, ...props }: LinkProps, ref: Ref<LinkRef>) => (
    <Link href={href} as={as} prefetch={prefetch} passHref locale={locale}>
      <MuiLink ref={ref} {...props} />
    </Link>
  )
);
